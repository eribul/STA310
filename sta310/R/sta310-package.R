# Package-level documentation and shared declarations ---------------------

#' sta310: Data sets and teaching functions for the survival analysis course
#'
#' The `sta310` package collects the data sets that accompany Collett (2023),
#' *Modelling Survival Data in Medical Research* (4th edition), and a small set
#' of teaching functions used in the STA310 lectures and computer exercises.
#'
#' @section Data sets:
#' All 33 data sets distributed with the book are available with their original
#' column names and the short object names used in the course material (for
#' example [iud], [breast], [myeloma], [ovarian], [liver] and [rats]). Use
#' `data(package = "sta310")` or the package index for a complete list. Each
#' data set is documented with the background of the study, the coded variables
#' and the relevant examples in Collett (2023).
#'
#' In addition, [scottish_mbc_cohort] holds the synthetic Scottish metastatic
#' breast cancer cohort used in the computer exercise on survival analysis. It
#' does not come from the book and is documented with its own source.
#'
#' @section Teaching functions:
#' The functions below implement estimators from first principles so that the
#' steps in the lectures can be reproduced and inspected, rather than to
#' replace the established implementations in `survival` and related packages.
#'
#' * [km_estimate()] and [plot_km()]: the Kaplan-Meier estimator with
#'   Greenwood standard errors.
#' * [cox_fit()]: Cox regression fitted by Newton-Raphson.
#' * [emp_hazard()]: empirical (piecewise constant) hazard estimates.
#' * [n_events_logrank()], [power_logrank()] and [power_logrank_sim()]:
#'   sample size, power and simulation for the log-rank test.
#' * [cif_cause_specific()]: cumulative incidence functions from cause-specific
#'   Cox models.
#'
#' @references
#' Collett, D. (2023) *Modelling Survival Data in Medical Research*, 4th ed.
#' Chapman & Hall/CRC.
#'
#' @importFrom utils globalVariables
#' @keywords internal
"_PACKAGE"

globalVariables(c(
  "time",
  "survival",
  "lower",
  "upper",
  "xmin",
  "xmax",
  "ymin",
  "ymax"
))
