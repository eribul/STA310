# Cumulative incidence from cause-specific hazards -------------------------

#' Cumulative incidence functions from cause-specific Cox models
#'
#' Builds the cumulative incidence function (CIF) for each competing cause from
#' a set of cause-specific Cox proportional hazards models. For cause `j` the
#' CIF is `F_j(t) = integral_0^t S(u-) dH_j(u)`, where `H_j` is the
#' cause-specific cumulative hazard and `S(u) = exp(-sum_j H_j(u))` is the
#' overall event-free survival. The function reproduces the worked code used in
#' the competing risks lectures, where each cause is modelled by treating the
#' other causes as censored.
#'
#' @param fits A named list of fitted cause-specific Cox models, one per cause.
#'   Each element must be an object returned by [survival::coxph()], fitted to
#'   an indicator of that cause. The names of the list become the cause labels.
#'   Stratified models are not supported.
#' @param newdata A one-row data frame of covariate values at which the CIFs
#'   are evaluated. It must contain the covariates used in every model in
#'   `fits`.
#' @param times Numeric vector of time points at which to evaluate the CIFs.
#'
#' @return A matrix with one row per time in `times` and one column per cause,
#'   containing the cumulative incidence. The matrix has an attribute
#'   `survival` with the overall event-free survival `S(t)` at `times`.
#'
#' @details
#' The cumulative hazards are obtained from [survival::survfit()] evaluated at
#' `newdata`, and the integral is approximated on the grid `times` by
#' `sum S(u-) * (H_j(u) - H_j(u-))`. A fine grid therefore gives a more
#' accurate approximation; the estimates are exact at the event times of the
#' fitted models. The cause-specific hazards are the quantities estimated by
#' the Cox models, and the CIF is the probability of failing from cause `j`
#' before time `t` in the presence of the other causes.
#'
#' @seealso [survival::coxph()], [survival::survfit()]
#'
#' @references
#' Collett, D. (2023) *Modelling Survival Data in Medical Research*, 4th ed.
#' Chapman & Hall/CRC, Chapter 12.
#'
#' @examples
#' cs <- list(
#'   thrombosis = survival::coxph(
#'     survival::Surv(time, cof == 2) ~ age,
#'     data = liver
#'   ),
#'   other = survival::coxph(
#'     survival::Surv(time, cof == 4) ~ age,
#'     data = liver
#'   )
#' )
#' cif <- cif_cause_specific(
#'   fits = cs,
#'   newdata = data.frame(age = 60),
#'   times = c(365, 1825)
#' )
#' round(cif, 3)
#' @export
cif_cause_specific <- function(fits, newdata, times) {
  if (!is.list(fits) || length(fits) == 0L || is.null(names(fits))) {
    stop("`fits` must be a non-empty, named list of Cox models.", call. = FALSE)
  }
  if (any(!nzchar(names(fits)))) {
    stop("Every element of `fits` must have a non-empty name.", call. = FALSE)
  }
  if (!is.data.frame(newdata) || nrow(newdata) != 1L) {
    stop(
      "`newdata` must be a one-row data frame of covariate values.",
      call. = FALSE
    )
  }
  if (
    !is.numeric(times) || length(times) == 0L || anyNA(times) || any(times < 0)
  ) {
    stop(
      "`times` must be a non-empty numeric vector of non-negative times.",
      call. = FALSE
    )
  }

  times <- sort(unique(times))
  for (fit in fits) {
    if (!is.null(fit$strata)) {
      stop(
        "Stratified models are not supported by `cif_cause_specific()`.",
        call. = FALSE
      )
    }
    if (!inherits(fit, "coxph")) {
      stop("Every element of `fits` must be a `coxph` object.", call. = FALSE)
    }
  }

  cumulative_hazard <- function(fit) {
    sf <- survival::survfit(fit, newdata = newdata)
    step <- stats::stepfun(sf$time, c(0, sf$cumhaz))
    step(times)
  }

  H <- vapply(fits, cumulative_hazard, numeric(length(times)))
  H <- matrix(H, nrow = length(times), dimnames = list(NULL, names(fits)))

  overall_survival <- exp(-rowSums(H))
  survival_before <- c(1, overall_survival[-length(overall_survival)])

  cif <- matrix(
    NA_real_,
    nrow = length(times),
    ncol = length(fits),
    dimnames = list(NULL, names(fits))
  )
  for (j in seq_along(fits)) {
    increment <- diff(c(0, H[, j]))
    cif[, j] <- cumsum(survival_before * increment)
  }

  attr(cif, "survival") <- overall_survival
  cif
}
