# Empirical hazard ---------------------------------------------------------

#' Empirical hazard estimate in time intervals
#'
#' Estimates the hazard function by a piecewise constant function: the number
#' of events in each interval divided by the total person-time at risk in that
#' interval. This is the estimator used in the lectures to show how a
#' heterogeneity (frailty) model produces a decreasing population hazard even
#' when every individual has a constant hazard.
#'
#' @param time Numeric vector of observed times.
#' @param breaks Numeric vector of interval boundaries, sorted in increasing
#'   order and of length at least two. The first boundary is included in the
#'   first interval.
#' @param status Vector of event indicators: 1 = event, 0 = right-censored. If
#'   `NULL` (the default) every observation is treated as an event.
#'
#' @return A data frame with one row per interval and columns:
#'   \describe{
#'     \item{bin}{Interval as a factor, `(lower, upper]`.}
#'     \item{lower, upper}{Interval boundaries.}
#'     \item{midpoint}{Midpoint of the interval, useful for plotting.}
#'     \item{n_events}{Number of events in the interval.}
#'     \item{person_time}{Total time at risk within the interval.}
#'     \item{hazard}{`n_events` divided by `person_time`.}
#'   }
#'
#' @details
#' An individual who is still under observation at the upper boundary of an
#' interval contributes the full width of the interval. An individual whose
#' observed time falls inside the interval contributes only the part of the
#' interval up to that time; censored observations therefore contribute
#' person-time but no event. Because the total person-time is accumulated
#' within each interval, the estimate is the Nelson-Aalen style
#' events-per-person-time estimator on a coarse grid, not the kernel-smoothed
#' hazard used by, for example, `muhaz` or `bshazard`.
#'
#' @examples
#' # Hazard of IUD discontinuation in six-month intervals
#' emp_hazard(iud$time, breaks = seq(0, 120, by = 26), status = iud$status)
#' @export
emp_hazard <- function(time, breaks, status = NULL) {
  if (!is.numeric(time) || length(time) == 0L || anyNA(time)) {
    stop(
      "`time` must be a non-empty numeric vector without missing values.",
      call. = FALSE
    )
  }
  if (any(time < 0)) {
    stop("`time` must be non-negative.", call. = FALSE)
  }
  if (!is.numeric(breaks) || length(breaks) < 2L || anyNA(breaks)) {
    stop(
      "`breaks` must be a numeric vector with at least two values.",
      call. = FALSE
    )
  }
  if (is.unsorted(breaks, strictly = TRUE)) {
    stop("`breaks` must be sorted in strictly increasing order.", call. = FALSE)
  }
  if (is.null(status)) {
    status <- rep(1L, length(time))
  }
  if (length(status) != length(time)) {
    stop("`status` must have the same length as `time`.", call. = FALSE)
  }
  status <- as.integer(status)
  if (!all(status %in% c(0L, 1L))) {
    stop("`status` must be 0 (censored) or 1 (event).", call. = FALSE)
  }

  lower <- breaks[-length(breaks)]
  upper <- breaks[-1]
  width <- upper - lower
  n_bins <- length(width)

  n_events <- vapply(
    seq_len(n_bins),
    function(k) sum(status == 1L & time > lower[k] & time <= upper[k]),
    numeric(1)
  )
  n_events[1] <- n_events[1] + sum(status == 1L & time == lower[1])

  person_time <- vapply(
    seq_len(n_bins),
    function(k) sum(pmin(pmax(time - lower[k], 0), width[k])),
    numeric(1)
  )

  labels <- levels(cut(
    time,
    breaks = breaks,
    right = TRUE,
    include.lowest = TRUE
  ))
  hazard <- ifelse(person_time > 0, n_events / person_time, NA_real_)

  data.frame(
    bin = factor(labels, levels = labels),
    lower = lower,
    upper = upper,
    midpoint = lower + width / 2,
    n_events = n_events,
    person_time = person_time,
    hazard = hazard,
    row.names = NULL
  )
}
