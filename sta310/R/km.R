# Kaplan-Meier estimator ---------------------------------------------------

#' Kaplan-Meier estimate of the survivor function
#'
#' Estimates the survivor function S(t) from right-censored survival data using
#' the Kaplan-Meier, or product-limit, estimator. The function is written from
#' first principles and returns the risk sets, the number of events and the
#' Greenwood standard error at each event time, so that the steps in the course
#' can be inspected. It mirrors the `km()` and `km_ci()` functions used in the
#' computer exercises and agrees with [survival::survfit()] for the point
#' estimate and the confidence limits.
#'
#' @param time Numeric vector of observed times.
#' @param status Vector of event indicators: 1 = event, 0 = right-censored.
#' @param conf_level Confidence level of the interval, a single number strictly
#'   between 0 and 1.
#' @param conf_type Scale on which the confidence interval is formed, matching
#'   the options of [survival::survfit()]: `"plain"` gives the Wald interval
#'   `S(t) +/- z * SE`, while `"log"` and `"log-log"` give transformed
#'   intervals that behave better near the extremes.
#' @param truncate Logical; if `TRUE` (the default, and what
#'   [survival::survfit()] does) the limits are constrained to `[0, 1]`. Set to
#'   `FALSE` to see the raw interval, which for `conf_type = "plain"` may leave
#'   `[0, 1]` (this is the point made in the computer exercise).
#'
#' @return A data frame with one row per distinct event time, preceded by a row
#'   at time 0 where S(0) = 1:
#'   \describe{
#'     \item{time}{Event time.}
#'     \item{n_risk}{Number of subjects at risk at the event time.}
#'     \item{n_event}{Number of events at the event time.}
#'     \item{n_censor}{Number of subjects censored at the event time.}
#'     \item{survival}{Estimated survivor function.}
#'     \item{std_error}{Greenwood standard error of `survival`.}
#'     \item{lower, upper}{Confidence limits.}
#'   }
#'
#' @details
#' At each distinct event time t_j the estimator is
#' `S(t) = prod_j (1 - d_j / n_j)`, where `n_j` is the number at risk just
#' before `t_j` and `d_j` the number of events, and the variance is estimated
#' by Greenwood's formula
#' `Var(S(t)) = S(t)^2 * sum_j d_j / (n_j (n_j - d_j))`
#' (Collett, 2023, Equations 2.1 and 2.12). When every subject at risk
#' experiences the event, `n_j - d_j` is zero and the standard error is not
#' defined, exactly as for [survival::survfit()].
#'
#' The `std_error` column is the standard error of S(t). The `std.err` element
#' of a [survival::survfit()] object is instead the standard error of
#' `-log(S(t))`, which equals `std_error / survival`.
#'
#' @seealso [plot_km()] to draw the estimate, and [survival::survfit()] for the
#'   production implementation used in the lectures.
#'
#' @references
#' Collett, D. (2023) *Modelling Survival Data in Medical Research*, 4th ed.
#' Chapman & Hall/CRC, Chapter 2.
#'
#' @examples
#' km <- km_estimate(iud$time, iud$status)
#' km
#'
#' # Agrees with survfit at the event times
#' sf <- survival::survfit(survival::Surv(time, status) ~ 1, data = iud)
#' all.equal(km$survival[-1], unname(sf$surv[sf$n.event > 0]))
#'
#' # Without truncation the plain Wald interval leaves [0, 1]
#' km_estimate(iud$time, iud$status, conf_type = "plain", truncate = FALSE)
#' @export
km_estimate <- function(
  time,
  status,
  conf_level = 0.95,
  conf_type = c("plain", "log", "log-log"),
  truncate = TRUE
) {
  conf_type <- match.arg(conf_type)

  if (!is.numeric(time)) {
    stop("`time` must be a numeric vector.", call. = FALSE)
  }
  if (length(time) != length(status)) {
    stop("`time` and `status` must have the same length.", call. = FALSE)
  }
  if (length(time) == 0L) {
    stop("`time` must not be empty.", call. = FALSE)
  }
  if (anyNA(time) || anyNA(status)) {
    stop("`time` and `status` must not contain missing values.", call. = FALSE)
  }
  if (any(time < 0)) {
    stop("`time` must be non-negative.", call. = FALSE)
  }
  status <- as.integer(status)
  if (!all(status %in% c(0L, 1L))) {
    stop("`status` must be 0 (censored) or 1 (event).", call. = FALSE)
  }
  if (
    !is.numeric(conf_level) ||
      length(conf_level) != 1L ||
      conf_level <= 0 ||
      conf_level >= 1
  ) {
    stop("`conf_level` must be a single number between 0 and 1.", call. = FALSE)
  }

  n <- length(time)
  event_times <- sort(unique(time[status == 1L]))
  n_risk <- vapply(event_times, function(t) sum(time >= t), numeric(1))
  n_event <- vapply(
    event_times,
    function(t) sum(time == t & status == 1L),
    numeric(1)
  )
  n_censor <- vapply(
    event_times,
    function(t) sum(time == t & status == 0L),
    numeric(1)
  )

  survival <- cumprod(1 - n_event / n_risk)
  greenwood <- cumsum(n_event / (n_risk * (n_risk - n_event)))
  std_error <- survival * sqrt(greenwood)

  z <- stats::qnorm(1 - (1 - conf_level) / 2)
  interval <- switch(
    conf_type,
    plain = cbind(survival - z * std_error, survival + z * std_error),
    log = {
      factor <- z * std_error / survival
      cbind(survival * exp(-factor), survival * exp(factor))
    },
    `log-log` = {
      factor <- z * std_error / (survival * log(survival))
      cbind(survival^exp(-factor), survival^exp(factor))
    }
  )
  if (isTRUE(truncate)) {
    interval[, 1] <- pmax(interval[, 1], 0)
    interval[, 2] <- pmin(interval[, 2], 1)
  }

  data.frame(
    time = c(0, event_times),
    n_risk = c(n, n_risk),
    n_event = c(0, n_event),
    n_censor = c(0, n_censor),
    survival = c(1, survival),
    std_error = c(0, std_error),
    lower = c(1, interval[, 1]),
    upper = c(1, interval[, 2]),
    row.names = NULL
  )
}

#' Plot a Kaplan-Meier estimate
#'
#' Draws a [km_estimate()] result as a step function with ggplot2, optionally
#' with a pointwise confidence band. This is the plotting helper used in the
#' computer exercises, with the two corrections discussed there: the curve
#' starts at (0, 1) and the last value is extended to the largest observed
#' time.
#'
#' @param x A data frame returned by [km_estimate()].
#' @param conf_int Logical; draw the confidence band from the `lower` and
#'   `upper` columns.
#' @param xlab,ylab Axis labels.
#'
#' @return A `ggplot` object.
#'
#' @details
#' The function requires the ggplot2 package, which is a suggested (not an
#' imported) dependency. The default `theme_minimal()` matches the theme used
#' in the lecture slides. The confidence band is drawn on the same grid as the
#' estimate, so that it follows the horizontal segments of the step function.
#'
#' @seealso [km_estimate()]
#'
#' @examples
#' if (requireNamespace("ggplot2", quietly = TRUE)) {
#'   plot_km(km_estimate(iud$time, iud$status))
#' }
#' @export
plot_km <- function(
  x,
  conf_int = TRUE,
  xlab = "Time",
  ylab = "Survival probability"
) {
  if (!requireNamespace("ggplot2", quietly = TRUE)) {
    stop(
      "`plot_km()` requires the ggplot2 package to be installed.",
      call. = FALSE
    )
  }
  if (!is.data.frame(x) || !all(c("time", "survival") %in% names(x))) {
    stop("`x` must be a data frame returned by `km_estimate()`.", call. = FALSE)
  }

  p <- ggplot2::ggplot(x, ggplot2::aes(x = time, y = survival)) +
    ggplot2::geom_step(linewidth = 1)

  if (isTRUE(conf_int) && all(c("lower", "upper") %in% names(x))) {
    band <- stats::na.omit(
      data.frame(
        xmin = x$time,
        xmax = c(x$time[-1], x$time[length(x$time)]),
        ymin = x$lower,
        ymax = x$upper
      )
    )
    p <- p +
      ggplot2::geom_rect(
        data = band,
        ggplot2::aes(xmin = xmin, xmax = xmax, ymin = ymin, ymax = ymax),
        inherit.aes = FALSE,
        alpha = 0.2
      )
  }

  p +
    ggplot2::coord_cartesian(ylim = c(0, 1)) +
    ggplot2::labs(x = xlab, y = ylab) +
    ggplot2::theme_minimal()
}
