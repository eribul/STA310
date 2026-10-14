# Sample size and power for the log-rank test ------------------------------

check_probability <- function(x, name, open = TRUE) {
  if (!is.numeric(x) || length(x) != 1L || is.na(x)) {
    stop("`", name, "` must be a single number.", call. = FALSE)
  }
  if (open && (x <= 0 || x >= 1)) {
    stop("`", name, "` must be strictly between 0 and 1.", call. = FALSE)
  }
  if (!open && (x < 0 || x > 1)) {
    stop("`", name, "` must be between 0 and 1.", call. = FALSE)
  }
  invisible(x)
}

check_hazard_ratio <- function(hr) {
  if (!is.numeric(hr) || length(hr) != 1L || is.na(hr) || hr <= 0) {
    stop("`hr` must be a single positive number.", call. = FALSE)
  }
  if (hr == 1) {
    stop(
      "`hr` must differ from 1; there is no effect to detect.",
      call. = FALSE
    )
  }
  invisible(hr)
}

#' Required number of events for the log-rank test
#'
#' Computes the number of events required to detect a hazard ratio with a given
#' power using Schoenfeld's formula, which is the basis of the sample size
#' calculations in Chapter 15 of Collett (2023).
#'
#' @param hr Anticipated hazard ratio (new treatment relative to standard);
#'   must be positive and different from 1.
#' @param alpha Two-sided significance level.
#' @param power Desired power, 1 - beta.
#' @param p1 Proportion allocated to the first group. Equal allocation
#'   corresponds to `p1 = 0.5`.
#'
#' @return The required number of events, a single number.
#'
#' @details
#' Schoenfeld's formula is
#' `d = (z_{1-alpha/2} + z_{power})^2 / (p1 (1 - p1) (log(hr))^2)`.
#' With equal allocation `p1 (1 - p1) = 1/4`, which reproduces Equation 15.1 of
#' Collett (2023). The formula is an approximation and tends to understate the
#' number of events slightly.
#'
#' @seealso [power_logrank()] for the inverse calculation and
#'   [power_logrank_sim()] for a simulation-based check.
#'
#' @references
#' Collett, D. (2023) *Modelling Survival Data in Medical Research*, 4th ed.
#' Chapman & Hall/CRC, Chapter 15.
#'
#' @examples
#' # Collett's worked example: five-year survival 0.41 versus 0.60
#' hr <- log(0.60) / log(0.41)
#' n_events_logrank(hr)
#' ceiling(n_events_logrank(hr))
#' @export
n_events_logrank <- function(hr, alpha = 0.05, power = 0.9, p1 = 0.5) {
  check_hazard_ratio(hr)
  check_probability(alpha, "alpha")
  check_probability(power, "power")
  check_probability(p1, "p1")
  (stats::qnorm(1 - alpha / 2) + stats::qnorm(power))^2 /
    (p1 * (1 - p1) * log(hr)^2)
}

#' Power of the log-rank test for a given number of events
#'
#' The inverse of [n_events_logrank()]: given the number of events that a study
#' will produce, returns the power to detect a hazard ratio.
#'
#' @param d Number of events.
#' @param hr Anticipated hazard ratio; must be positive and different from 1.
#' @param alpha Two-sided significance level.
#' @param p1 Proportion allocated to the first group.
#'
#' @return The power, a single number between 0 and 1.
#'
#' @details
#' The power is `Phi(sqrt(d p1 (1 - p1)) |log(hr)| - z_{1-alpha/2})`, where
#' `Phi` is the standard normal distribution function.
#'
#' @seealso [n_events_logrank()], [power_logrank_sim()]
#'
#' @examples
#' power_logrank(d = 140, hr = 0.57)
#' @export
power_logrank <- function(d, hr, alpha = 0.05, p1 = 0.5) {
  check_hazard_ratio(hr)
  check_probability(alpha, "alpha")
  check_probability(p1, "p1")
  if (!is.numeric(d) || length(d) != 1L || is.na(d) || d <= 0) {
    stop("`d` must be a single positive number.", call. = FALSE)
  }
  stats::pnorm(
    sqrt(d * p1 * (1 - p1)) * abs(log(hr)) - stats::qnorm(1 - alpha / 2)
  )
}

#' Power of the log-rank test by simulation
#'
#' Simulates a two-arm trial with exponential survival times and an optional
#' delay before the treatment effect, and estimates the power of the log-rank
#' test as the proportion of simulated trials that reject the null hypothesis.
#' This is the simulation-based check of the formula used in the lectures, and
#' is useful when the assumptions behind [n_events_logrank()] (proportional
#' hazards, no loss to follow-up, a fixed number of events) are not met.
#'
#' @param n Total number of patients, split as evenly as possible between the
#'   two arms.
#' @param hr Hazard ratio of the treated arm relative to the control arm.
#' @param lambda0 Hazard of the control arm (events per unit of time).
#' @param accrual Accrual period; entry times are uniform on
#'   `(0, accrual)`.
#' @param followup Additional follow-up after the end of accrual.
#' @param dropout Exponential dropout rate (per unit of time). Zero means no
#'   loss to follow-up.
#' @param delay Delay before the treatment effect starts. Zero means
#'   proportional hazards from time 0.
#' @param nsim Number of simulated trials.
#' @param alpha Significance level of the two-sided log-rank test.
#' @param seed Optional random seed. The default `NULL` does not change the
#'   state of the random number generator.
#'
#' @return The estimated power, a single number, with `nsim` as an attribute.
#'
#' @details
#' Survival times are generated from an exponential distribution and each
#' patient is censored administratively at `accrual + followup - entry`, or at
#' the dropout time if that comes first. The treated arm has hazard `hr *
#' lambda0` after `delay` and `lambda0` before it; because the exponential
#' distribution is memoryless, this is the same as adding `delay` to the
#' exponential time in the treated arm.
#'
#' @seealso [n_events_logrank()], [power_logrank()]
#'
#' @examples
#' power_logrank_sim(
#'   n = 400, hr = 0.57, lambda0 = -log(0.41) / 60,
#'   accrual = 18, followup = 24, nsim = 100, seed = 1
#' )
#' @export
power_logrank_sim <- function(
  n,
  hr,
  lambda0,
  accrual,
  followup,
  dropout = 0,
  delay = 0,
  nsim = 1000,
  alpha = 0.05,
  seed = NULL
) {
  check_hazard_ratio(hr)
  check_probability(alpha, "alpha")
  for (arg in c("n", "lambda0", "accrual", "followup", "nsim")) {
    value <- get(arg)
    if (
      !is.numeric(value) || length(value) != 1L || is.na(value) || value <= 0
    ) {
      stop("`", arg, "` must be a single positive number.", call. = FALSE)
    }
  }
  if (
    !is.numeric(dropout) ||
      length(dropout) != 1L ||
      is.na(dropout) ||
      dropout < 0
  ) {
    stop("`dropout` must be a single non-negative number.", call. = FALSE)
  }
  if (!is.numeric(delay) || length(delay) != 1L || is.na(delay) || delay < 0) {
    stop("`delay` must be a single non-negative number.", call. = FALSE)
  }
  n <- as.integer(n)
  nsim <- as.integer(nsim)
  if (!is.null(seed)) {
    set.seed(seed)
  }

  arm <- rep(0:1, length.out = n)
  admin <- accrual + followup

  reject <- replicate(nsim, {
    entry <- stats::runif(n, 0, accrual)
    t_event <- stats::rexp(n, lambda0)
    t_treated <- ifelse(
      t_event <= delay,
      t_event,
      delay + stats::rexp(n, hr * lambda0)
    )
    t_event <- ifelse(arm == 1L, t_treated, t_event)
    t_dropout <- if (dropout > 0) stats::rexp(n, dropout) else rep(Inf, n)
    t_censor <- pmin(t_dropout, admin - entry)
    t_observed <- pmin(t_event, t_censor)
    event <- as.numeric(t_event <= t_censor)
    test <- survival::survdiff(survival::Surv(t_observed, event) ~ arm)
    p_value <- stats::pchisq(
      test$chisq,
      df = length(test$n) - 1L,
      lower.tail = FALSE
    )
    p_value < alpha
  })

  out <- mean(reject)
  attr(out, "nsim") <- nsim
  out
}
