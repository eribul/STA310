# Cox proportional hazards model by Newton-Raphson --------------------------

#' Cox proportional hazards model fitted by Newton-Raphson
#'
#' Fits a Cox proportional hazards model to right-censored survival data by
#' maximising the partial likelihood with the Newton-Raphson algorithm. The
#' function generalises the single-covariate `cox()` used in the computer
#' exercises to any number of numeric covariates and handles tied event times
#' with the Breslow or Efron approximation. Results agree with
#' [survival::coxph()] to within numerical tolerance.
#'
#' @param time Numeric vector of observed times.
#' @param status Vector of event indicators: 1 = event, 0 = right-censored.
#' @param x A numeric matrix or data frame of covariates, one row per subject.
#'   Factors must be expanded before the call, for example with
#'   [stats::model.matrix()]; drop the intercept column, because a Cox model
#'   has no intercept (see the examples).
#' @param tie Handling of tied event times: `"efron"` (the default, and the
#'   default of [survival::coxph()]) or `"breslow"`.
#' @param tol Convergence tolerance on the change in the coefficients.
#' @param maxit Maximum number of Newton-Raphson iterations.
#'
#' @return A data frame of class `sta310_cox` with one row per covariate and
#'   columns `term`, `estimate`, `std_error`, `z` and `p_value`. The following
#'   attributes are also set: `loglik` (maximised partial log-likelihood), `n`,
#'   `n_events`, `tie`, `iterations`, `converged` and `vcov` (the estimated
#'   covariance matrix of the coefficients).
#'
#' @details
#' Writing `eta_i = beta' x_i` for the linear predictor, the partial likelihood
#' (Collett, 2023, Section 3.3) is maximised by repeatedly updating
#' `beta <- beta + I(beta)^{-1} U(beta)`, where `U` is the score vector and `I`
#' the observed information. With `S0`, `S1` and `S2` the zeroth, first and
#' second risk-set weighted moments of the covariates, the Breslow
#' contributions at an event time with `d` events are `U = sum x_i - d S1/S0`
#' and `I = d (S2/S0 - (S1/S0)(S1/S0)')`; the Efron approximation replaces the
#' `d` tied events by `d` terms that remove the tied individuals one at a time.
#' The standard error of a coefficient is the square root of the corresponding
#' diagonal element of `I(beta)^{-1}`.
#'
#' @seealso [survival::coxph()] for the production implementation used in the
#'   lectures.
#'
#' @references
#' Collett, D. (2023) *Modelling Survival Data in Medical Research*, 4th ed.
#' Chapman & Hall/CRC, Section 3.3.
#'
#' @examples
#' # Two numeric covariates
#' fit <- cox_fit(myeloma$time, myeloma$status, myeloma[, c("age", "bun")])
#' fit
#'
#' # Compare with survival::coxph
#' ref <- survival::coxph(
#'   survival::Surv(time, status) ~ age + bun,
#'   data = myeloma
#' )
#' cbind(cox_fit = coef(fit), coxph = coef(ref))
#'
#' # Factors must be expanded first, without an intercept column
#' x <- stats::model.matrix(~ factor(group), data = bmt_leukaemia)[, -1, drop = FALSE]
#' cox_fit(bmt_leukaemia$time, bmt_leukaemia$status, x)
#' @export
cox_fit <- function(
  time,
  status,
  x,
  tie = c("efron", "breslow"),
  tol = 1e-8,
  maxit = 25L
) {
  tie <- match.arg(tie)

  if (!is.numeric(time) || length(time) != length(status)) {
    stop(
      "`time` must be numeric and have the same length as `status`.",
      call. = FALSE
    )
  }
  if (length(time) == 0L || anyNA(time) || anyNA(status)) {
    stop("`time` and `status` must not be missing or empty.", call. = FALSE)
  }
  status <- as.integer(status)
  if (!all(status %in% c(0L, 1L))) {
    stop("`status` must be 0 (censored) or 1 (event).", call. = FALSE)
  }
  if (sum(status) == 0L) {
    stop("At least one event is required to fit the model.", call. = FALSE)
  }

  if (is.data.frame(x)) {
    x <- as.matrix(x)
  }
  if (is.null(dim(x))) {
    x <- matrix(x, ncol = 1L)
  }
  if (!is.numeric(x)) {
    stop(
      "`x` must be numeric. Expand factors with `model.matrix()` first.",
      call. = FALSE
    )
  }
  if (nrow(x) != length(time)) {
    stop("`x` must have one row per subject in `time`.", call. = FALSE)
  }
  if (anyNA(x)) {
    stop("`x` must not contain missing values.", call. = FALSE)
  }
  storage.mode(x) <- "double"
  if (is.null(colnames(x))) {
    colnames(x) <- paste0("x", seq_len(ncol(x)))
  }
  constant <- vapply(
    seq_len(ncol(x)),
    function(j) length(unique(x[, j])) == 1L,
    logical(1)
  )
  if (any(constant)) {
    stop(
      "Covariate(s) ",
      paste(colnames(x)[constant], collapse = ", "),
      " are constant. A Cox model has no intercept; drop it, for example ",
      "with `model.matrix(~ f - 1)`.",
      call. = FALSE
    )
  }

  n <- length(time)
  p <- ncol(x)
  event_times <- sort(unique(time[status == 1L]))
  beta <- rep(0, p)
  converged <- FALSE

  score_and_information <- function(beta) {
    eta <- as.vector(x %*% beta)
    w <- exp(eta)
    score <- numeric(p)
    info <- matrix(0, p, p)
    ll <- 0
    for (t in event_times) {
      at_risk <- time >= t
      event <- time == t & status == 1L
      d <- sum(event)
      xr <- x[at_risk, , drop = FALSE]
      wr <- w[at_risk]
      s0 <- sum(wr)
      s1 <- colSums(wr * xr)
      s2 <- crossprod(xr * wr, xr)
      xd <- x[event, , drop = FALSE]
      wd <- w[event]
      if (tie == "breslow") {
        score <- score + colSums(xd) - d * (s1 / s0)
        info <- info + d * (s2 / s0 - tcrossprod(s1 / s0))
        ll <- ll + sum(eta[event]) - d * log(s0)
      } else {
        d0 <- sum(wd)
        d1 <- colSums(wd * xd)
        d2 <- crossprod(xd * wd, xd)
        score <- score + colSums(xd)
        ll <- ll + sum(eta[event])
        for (l in seq_len(d) - 1L) {
          f <- l / d
          m0 <- s0 - f * d0
          m1 <- s1 - f * d1
          mean_x <- m1 / m0
          score <- score - mean_x
          info <- info + (s2 - f * d2) / m0 - tcrossprod(mean_x)
          ll <- ll - log(m0)
        }
      }
    }
    list(score = score, info = info, loglik = ll)
  }

  for (iteration in seq_len(maxit)) {
    step <- score_and_information(beta)
    delta <- tryCatch(
      solve(step$info, step$score),
      error = function(e) {
        stop(
          "The information matrix is singular. Check that `x` has no ",
          "intercept and no collinear columns.",
          call. = FALSE
        )
      }
    )
    beta <- beta + delta
    if (max(abs(delta)) < tol) {
      converged <- TRUE
      break
    }
  }

  final <- score_and_information(beta)
  vcov <- solve(final$info)
  std_error <- sqrt(diag(vcov))
  z_value <- beta / std_error
  p_value <- 2 * stats::pnorm(-abs(z_value))

  out <- data.frame(
    term = colnames(x),
    estimate = beta,
    std_error = std_error,
    z = z_value,
    p_value = p_value,
    row.names = NULL,
    stringsAsFactors = FALSE
  )
  attr(out, "loglik") <- final$loglik
  attr(out, "n") <- n
  attr(out, "n_events") <- sum(status == 1L)
  attr(out, "tie") <- tie
  attr(out, "iterations") <- iteration
  attr(out, "converged") <- converged
  attr(out, "vcov") <- vcov
  class(out) <- c("sta310_cox", "data.frame")
  out
}

#' Print a fitted Cox model
#'
#' @param x An object returned by [cox_fit()].
#' @param digits Number of significant digits to print.
#' @param ... Passed on to [print()].
#'
#' @return `x`, invisibly.
#'
#' @export
print.sta310_cox <- function(x, digits = 4, ...) {
  cat(
    "Cox proportional hazards model (Newton-Raphson, ",
    attr(x, "tie"),
    " ties)\n",
    sep = ""
  )
  cat(
    "n = ",
    attr(x, "n"),
    ", events = ",
    attr(x, "n_events"),
    ", iterations = ",
    attr(x, "iterations"),
    if (!isTRUE(attr(x, "converged"))) " (not converged)" else "",
    "\n",
    sep = ""
  )
  cat(
    "partial log-likelihood = ",
    format(attr(x, "loglik"), digits = digits),
    "\n\n",
    sep = ""
  )

  out <- as.data.frame(x)
  for (nm in c("estimate", "std_error", "z", "p_value")) {
    out[[nm]] <- signif(out[[nm]], digits)
  }
  print(out, row.names = FALSE, ...)
  invisible(x)
}

#' Methods for a Cox model fitted with cox_fit()
#'
#' Small methods that make a [cox_fit()] object behave like a model fit:
#' `coef()` returns the named coefficient vector, `vcov()` the covariance
#' matrix, `logLik()` the maximised partial log-likelihood and `nobs()` the
#' number of observations.
#'
#' @param object An object returned by [cox_fit()].
#' @param ... Unused.
#'
#' @return See the descriptions above.
#'
#' @name cox_fit-methods
#' @aliases coef.sta310_cox vcov.sta310_cox logLik.sta310_cox nobs.sta310_cox
#' @importFrom stats coef logLik nobs vcov
NULL

#' @rdname cox_fit-methods
#' @export
coef.sta310_cox <- function(object, ...) {
  stats::setNames(object$estimate, object$term)
}

#' @rdname cox_fit-methods
#' @export
vcov.sta310_cox <- function(object, ...) {
  attr(object, "vcov")
}

#' @rdname cox_fit-methods
#' @export
logLik.sta310_cox <- function(object, ...) {
  structure(
    attr(object, "loglik"),
    df = nrow(object),
    nobs = attr(object, "n"),
    class = "logLik"
  )
}

#' @rdname cox_fit-methods
#' @export
nobs.sta310_cox <- function(object, ...) {
  attr(object, "n")
}
