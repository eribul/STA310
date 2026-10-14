test_that("cox_fit() reproduces survival::coxph() with the Efron approximation", {
  fit <- cox_fit(myeloma$time, myeloma$status, myeloma[, c("age", "bun")])
  ref <- survival::coxph(
    survival::Surv(time, status) ~ age + bun,
    data = myeloma
  )

  expect_equal(coef(fit), coef(ref), tolerance = 1e-8)
  expect_equal(
    fit$std_error,
    unname(summary(ref)$coefficients[, "se(coef)"]),
    tolerance = 1e-8
  )
  expect_equal(unname(vcov(fit)), unname(vcov(ref)), tolerance = 1e-8)
  expect_equal(
    as.numeric(logLik(fit)),
    as.numeric(logLik(ref)),
    tolerance = 1e-8
  )
  expect_equal(nobs(fit), nrow(myeloma))
  expect_identical(fit$term, c("age", "bun"))
  expect_identical(attr(fit, "converged"), TRUE)
  expect_identical(attr(fit, "n_events"), sum(myeloma$status == 1))
})

test_that("cox_fit() handles tied event times with the Breslow approximation", {
  fit <- cox_fit(
    myeloma$time,
    myeloma$status,
    myeloma[, c("age", "bun")],
    tie = "breslow"
  )
  ref <- survival::coxph(
    survival::Surv(time, status) ~ age + bun,
    data = myeloma,
    ties = "breslow"
  )

  expect_equal(coef(fit), coef(ref), tolerance = 1e-8)
  expect_equal(
    as.numeric(logLik(fit)),
    as.numeric(logLik(ref)),
    tolerance = 1e-8
  )
  expect_identical(attr(fit, "tie"), "breslow")
})

test_that("cox_fit() takes covariates expanded with model.matrix()", {
  x <- stats::model.matrix(~ factor(group), data = bmt_leukaemia)[,
    -1,
    drop = FALSE
  ]
  fit <- cox_fit(bmt_leukaemia$time, bmt_leukaemia$status, x)
  ref <- survival::coxph(
    survival::Surv(time, status) ~ factor(group),
    data = bmt_leukaemia
  )

  expect_identical(fit$term, colnames(x))
  expect_equal(coef(fit), coef(ref), tolerance = 1e-8)
})

test_that("cox_fit() accepts a single covariate supplied as a one-column data frame", {
  fit <- cox_fit(myeloma$time, myeloma$status, myeloma[, "bun", drop = FALSE])
  ref <- survival::coxph(survival::Surv(time, status) ~ bun, data = myeloma)

  expect_identical(fit$term, "bun")
  expect_equal(coef(fit), coef(ref), tolerance = 1e-8)
})

test_that("a bare covariate vector without column names is labelled x1", {
  fit <- cox_fit(myeloma$time, myeloma$status, myeloma[, "bun"])
  ref <- survival::coxph(survival::Surv(time, status) ~ bun, data = myeloma)

  expect_identical(fit$term, "x1")
  expect_equal(unname(coef(fit)), unname(coef(ref)), tolerance = 1e-8)
})

test_that("a cox_fit() object behaves like a model fit", {
  fit <- cox_fit(myeloma$time, myeloma$status, myeloma[, c("age", "bun")])

  expect_named(coef(fit), c("age", "bun"))
  expect_identical(is.matrix(vcov(fit)), TRUE)
  expect_identical(dim(vcov(fit)), c(2L, 2L))
  expect_s3_class(logLik(fit), "logLik")
  expect_equal(attr(logLik(fit), "df"), 2L)
  expect_equal(attr(logLik(fit), "nobs"), nrow(myeloma))
})

test_that("the approximate z test is two-sided and uses the normal distribution", {
  fit <- cox_fit(myeloma$time, myeloma$status, myeloma[, c("age", "bun")])

  expect_equal(fit$z, fit$estimate / fit$std_error)
  expect_equal(fit$p_value, 2 * stats::pnorm(-abs(fit$z)))
})

test_that("print() summarises the fit", {
  fit <- cox_fit(myeloma$time, myeloma$status, myeloma[, c("age", "bun")])

  expect_snapshot(print(fit))
})

test_that("cox_fit() validates its input", {
  expect_snapshot(error = TRUE, cox_fit("a", 1, 1))
  expect_snapshot(
    error = TRUE,
    cox_fit(myeloma$time, rep(0L, nrow(myeloma)), myeloma[, c("age", "bun")])
  )
  expect_snapshot(
    error = TRUE,
    cox_fit(myeloma$time, myeloma$status, as.character(myeloma$age))
  )
  expect_snapshot(
    error = TRUE,
    cox_fit(myeloma$time, myeloma$status, myeloma[-1, c("age", "bun")])
  )
  expect_snapshot(
    error = TRUE,
    cox_fit(
      bmt_leukaemia$time,
      bmt_leukaemia$status,
      stats::model.matrix(~ factor(group), data = bmt_leukaemia)
    )
  )
})
