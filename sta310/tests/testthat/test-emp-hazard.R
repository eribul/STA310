test_that("emp_hazard() splits events and person-time over the intervals", {
  h <- emp_hazard(c(1, 2, 3, 4), breaks = c(0, 2, 4))

  expect_equal(h$n_events, c(2, 2))
  expect_equal(h$person_time, c(7, 3))
  expect_equal(h$hazard, c(2 / 7, 2 / 3))
})

test_that("censored observations contribute person-time but no event", {
  h <- emp_hazard(c(1, 2, 3, 4), breaks = c(0, 2, 4), status = c(1, 0, 1, 0))

  expect_equal(h$n_events, c(1, 1))
  expect_equal(h$person_time, c(7, 3))
  expect_equal(h$hazard, c(1 / 7, 1 / 3))
})

test_that("every observation is an event when status is NULL", {
  default <- emp_hazard(c(1, 2, 3, 4), breaks = c(0, 2, 4))
  explicit <- emp_hazard(c(1, 2, 3, 4), breaks = c(0, 2, 4), status = rep(1, 4))

  expect_equal(default, explicit)
})

test_that("the first boundary belongs to the first interval", {
  h <- emp_hazard(c(0, 1, 5), breaks = c(0, 2, 4, 6))

  expect_equal(h$n_events, c(2, 0, 1))
  expect_equal(h$person_time, c(3, 2, 1))
  expect_equal(h$hazard, c(2 / 3, 0, 1))
  expect_identical(
    h$bin,
    factor(c("[0,2]", "(2,4]", "(4,6]"), levels = c("[0,2]", "(2,4]", "(4,6]"))
  )
  expect_equal(h$midpoint, c(1, 3, 5))
  expect_equal(h$lower, c(0, 2, 4))
  expect_equal(h$upper, c(2, 4, 6))
})

test_that("intervals with no person-time have no hazard", {
  h <- emp_hazard(c(1, 2), breaks = c(0, 2, 10, 20))

  expect_equal(h$person_time, c(3, 0, 0))
  expect_identical(h$hazard, c(2 / 3, NA_real_, NA_real_))
})

test_that("emp_hazard() works on a data set from the package", {
  h <- emp_hazard(iud$time, breaks = seq(0, 130, by = 26), status = iud$status)

  expect_equal(nrow(h), 5L)
  expect_equal(sum(h$n_events), sum(iud$status == 1))
  expect_equal(sum(h$person_time), sum(iud$time))
  expect_equal(h$hazard, h$n_events / h$person_time)
})

test_that("emp_hazard() validates its input", {
  expect_snapshot(error = TRUE, emp_hazard("a", breaks = c(0, 1)))
  expect_snapshot(error = TRUE, emp_hazard(c(1, NA), breaks = c(0, 1)))
  expect_snapshot(error = TRUE, emp_hazard(c(1, -1), breaks = c(0, 1)))
  expect_snapshot(error = TRUE, emp_hazard(c(1, 2), breaks = 1))
  expect_snapshot(error = TRUE, emp_hazard(c(1, 2), breaks = c(0, 2, 1)))
  expect_snapshot(
    error = TRUE,
    emp_hazard(c(1, 2), breaks = c(0, 2), status = c(1, 1, 1))
  )
  expect_snapshot(
    error = TRUE,
    emp_hazard(c(1, 2), breaks = c(0, 2), status = c(1, 2))
  )
})
