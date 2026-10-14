test_that("km_estimate() agrees with survival::survfit()", {
  km <- km_estimate(iud$time, iud$status, conf_type = "log")
  sf <- survival::survfit(survival::Surv(time, status) ~ 1, data = iud)
  at_event <- sf$n.event > 0

  expect_equal(km$survival[-1], unname(sf$surv[at_event]))
  expect_equal(km$n_risk[-1], unname(sf$n.risk[at_event]))
  expect_equal(km$n_event[-1], unname(sf$n.event[at_event]))
  expect_equal(
    km$std_error[-1],
    unname(sf$std.err[at_event] * sf$surv[at_event])
  )
  expect_equal(km$lower[-1], unname(sf$lower[at_event]))
  expect_equal(km$upper[-1], unname(sf$upper[at_event]))
})

test_that("the log-log interval also agrees with survival::survfit()", {
  km <- km_estimate(iud$time, iud$status, conf_type = "log-log")
  sf <- survival::survfit(
    survival::Surv(time, status) ~ 1,
    data = iud,
    conf.type = "log-log"
  )
  at_event <- sf$n.event > 0

  expect_equal(km$lower[-1], unname(sf$lower[at_event]))
  expect_equal(km$upper[-1], unname(sf$upper[at_event]))
})

test_that("km_estimate() returns the risk sets and starts at S(0) = 1", {
  km <- km_estimate(iud$time, iud$status)

  expect_named(
    km,
    c(
      "time",
      "n_risk",
      "n_event",
      "n_censor",
      "survival",
      "std_error",
      "lower",
      "upper"
    )
  )
  expect_equal(km$time[1], 0)
  expect_equal(km$survival[1], 1)
  expect_equal(km$n_risk[1], nrow(iud))
  expect_equal(km$n_event[1], 0)
  expect_equal(km$std_error[1], 0)
  expect_length(km$time, length(unique(iud$time[iud$status == 1])) + 1L)
  expect_lte(max(diff(km$survival)), 0)
})

test_that("censorings at an event time are counted but do not change the estimate", {
  km <- km_estimate(c(1, 2, 2, 3), c(1, 0, 1, 0))

  expect_equal(km$time, c(0, 1, 2))
  expect_equal(km$n_censor, c(0, 0, 1))
  expect_equal(km$n_risk, c(4, 4, 3))
  expect_equal(km$survival, c(1, 3 / 4, 1 / 2))
})

test_that("the plain Wald interval is only clamped to [0, 1] on request", {
  raw <- km_estimate(
    iud$time,
    iud$status,
    conf_type = "plain",
    truncate = FALSE
  )
  clamped <- km_estimate(iud$time, iud$status, conf_type = "plain")

  expect_lt(min(raw$lower), 0)
  expect_gt(max(raw$upper), 1)
  expect_gte(min(clamped$lower), 0)
  expect_lte(max(clamped$upper), 1)
})

test_that("the standard error is not defined once the risk set is exhausted", {
  km <- km_estimate(c(1, 2, 3), c(1, 1, 1))

  expect_equal(km$survival, c(1, 2 / 3, 1 / 3, 0))
  expect_identical(km$std_error[4], NaN)
})

test_that("km_estimate() validates its input", {
  expect_snapshot(error = TRUE, km_estimate("a", 1))
  expect_snapshot(error = TRUE, km_estimate(numeric(0), integer(0)))
  expect_snapshot(error = TRUE, km_estimate(c(1, 2), 1))
  expect_snapshot(error = TRUE, km_estimate(c(1, NA), c(1, 0)))
  expect_snapshot(error = TRUE, km_estimate(c(1, -1), c(1, 0)))
  expect_snapshot(error = TRUE, km_estimate(c(1, 2), c(1, 0, 1)))
  expect_snapshot(error = TRUE, km_estimate(c(1, 2), c(1, 3)))
  expect_snapshot(error = TRUE, km_estimate(c(1, 2), c(1, 0), conf_level = 1))
  expect_snapshot(
    error = TRUE,
    km_estimate(c(1, 2), c(1, 0), conf_type = "wald")
  )
})

test_that("plot_km() draws a step function with a confidence band", {
  skip_if_not_installed("ggplot2")

  km <- km_estimate(iud$time, iud$status)
  p <- plot_km(km)

  expect_s3_class(p, "ggplot")
  expect_length(p$layers, 2L)
  expect_length(plot_km(km, conf_int = FALSE)$layers, 1L)
  expect_equal(p$labels$x, "Time")
  expect_equal(p$labels$y, "Survival probability")
})

test_that("plot_km() builds the plot without warnings", {
  skip_if_not_installed("ggplot2")

  expect_no_warning(plot_km(km_estimate(iud$time, iud$status)))
})

test_that("plot_km() validates its input", {
  skip_if_not_installed("ggplot2")

  expect_snapshot(error = TRUE, plot_km(data.frame(t = 1, s = 1)))
})
