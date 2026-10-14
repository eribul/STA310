cause_specific_fits <- function() {
  list(
    thrombosis = survival::coxph(
      survival::Surv(time, cof == 2) ~ age,
      data = liver
    ),
    other = survival::coxph(
      survival::Surv(time, cof == 4) ~ age,
      data = liver
    )
  )
}

test_that("the cumulative incidences are monotone and sum to less than one", {
  cif <- cif_cause_specific(
    cause_specific_fits(),
    newdata = data.frame(age = 60),
    times = seq(0, 3000, by = 10)
  )

  expect_identical(colnames(cif), c("thrombosis", "other"))
  expect_identical(dim(cif), c(301L, 2L))
  expect_gte(min(cif), 0)
  expect_lte(max(rowSums(cif)), 1)
  expect_gte(min(diff(cif[, "thrombosis"])), 0)
  expect_gte(min(diff(cif[, "other"])), 0)
})

test_that("a single cause gives the complement of the overall survival", {
  fits <- cause_specific_fits()[1]
  cif <- cif_cause_specific(
    fits,
    newdata = data.frame(age = 60),
    times = seq(0, 3000, by = 5)
  )

  expect_equal(cif[, 1], 1 - attr(cif, "survival"), tolerance = 1e-3)
})

test_that("the event-free survival is attached, bounded and decreasing", {
  cif <- cif_cause_specific(
    cause_specific_fits(),
    newdata = data.frame(age = 60),
    times = seq(0, 3000, by = 10)
  )
  overall <- attr(cif, "survival")

  expect_length(overall, nrow(cif))
  expect_lte(max(overall), 1)
  expect_gte(min(overall), 0)
  expect_lte(max(diff(overall)), 0)
})

test_that("a higher covariate value moves the cumulative incidence in the fitted direction", {
  fits <- cause_specific_fits()
  young <- cif_cause_specific(fits, data.frame(age = 40), times = 2000)
  older <- cif_cause_specific(fits, data.frame(age = 70), times = 2000)

  direction <- sign(unname(coef(fits$thrombosis)[["age"]]))

  expect_equal(sign(unname(older[, 1] - young[, 1])), direction)
})

test_that("the time grid is sorted and de-duplicated", {
  cif <- cif_cause_specific(
    cause_specific_fits(),
    newdata = data.frame(age = 60),
    times = c(365, 100, 365)
  )

  expect_identical(dim(cif), c(2L, 2L))
})

test_that("cif_cause_specific() validates its input", {
  fits <- cause_specific_fits()

  expect_snapshot(
    error = TRUE,
    cif_cause_specific(unname(fits), data.frame(age = 60), 1)
  )
  expect_snapshot(
    error = TRUE,
    cif_cause_specific(list(a = 1, 2), data.frame(age = 60), 1)
  )
  expect_snapshot(
    error = TRUE,
    cif_cause_specific(fits, data.frame(age = c(60, 70)), 1)
  )
  expect_snapshot(
    error = TRUE,
    cif_cause_specific(fits, data.frame(age = 60), -1)
  )
  expect_snapshot(
    error = TRUE,
    cif_cause_specific(fits, data.frame(age = 60), numeric(0))
  )
  expect_snapshot(
    error = TRUE,
    cif_cause_specific(
      list(a = survival::survfit(survival::Surv(time, status) ~ 1, data = iud)),
      data.frame(age = 60),
      1
    )
  )
  expect_snapshot(
    error = TRUE,
    cif_cause_specific(
      list(
        a = survival::coxph(
          survival::Surv(time, status) ~ age + survival::strata(cof),
          data = liver
        )
      ),
      data.frame(age = 60),
      1
    )
  )
})
