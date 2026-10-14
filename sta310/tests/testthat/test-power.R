test_that("n_events_logrank() implements Schoenfeld's formula", {
  hr <- log(0.60) / log(0.41)

  expect_equal(n_events_logrank(hr), 135.5, tolerance = 1e-3)
  expect_gt(
    n_events_logrank(hr, alpha = 0.01),
    n_events_logrank(hr, alpha = 0.05)
  )
  expect_gt(n_events_logrank(hr, power = 0.8), 0)
  expect_lt(
    n_events_logrank(hr, power = 0.8),
    n_events_logrank(hr, power = 0.9)
  )
  expect_gt(n_events_logrank(hr, p1 = 0.3), n_events_logrank(hr, p1 = 0.5))
})

test_that("the number of events scales with the inverse squared log hazard ratio", {
  expect_equal(
    n_events_logrank(0.5) / n_events_logrank(0.5^2),
    (log(0.5^2) / log(0.5))^2
  )
  expect_equal(n_events_logrank(hr = 2), n_events_logrank(hr = 0.5))
})

test_that("power_logrank() inverts n_events_logrank()", {
  expect_equal(power_logrank(n_events_logrank(0.57), 0.57), 0.9)
  expect_equal(
    power_logrank(n_events_logrank(0.57, alpha = 0.01), 0.57, alpha = 0.01),
    0.9
  )
  expect_lt(power_logrank(d = 50, hr = 0.57), power_logrank(d = 140, hr = 0.57))
})

test_that("power_logrank() returns values between zero and one", {
  power <- vapply(
    c(10, 100, 1000),
    function(d) power_logrank(d = d, hr = 0.7),
    numeric(1)
  )

  expect_gte(min(power), 0)
  expect_lte(max(power), 1)
  expect_gt(power[2], power[1])
  expect_equal(power_logrank(d = 1e6, hr = 0.7), 1)
})

test_that("power_logrank_sim() is reproducible and close to the formula", {
  sim <- power_logrank_sim(
    n = 400,
    hr = 0.57,
    lambda0 = -log(0.41) / 60,
    accrual = 18,
    followup = 24,
    nsim = 500,
    seed = 7
  )
  again <- power_logrank_sim(
    n = 400,
    hr = 0.57,
    lambda0 = -log(0.41) / 60,
    accrual = 18,
    followup = 24,
    nsim = 500,
    seed = 7
  )

  expect_identical(sim, again)
  expect_equal(attr(sim, "nsim"), 500L)
  expect_lt(abs(sim - 0.9), 0.08)
})

test_that("power_logrank_sim() loses power with a delay or with dropout", {
  base <- list(
    n = 300,
    hr = 0.65,
    lambda0 = 0.05,
    accrual = 12,
    followup = 12,
    nsim = 500,
    seed = 11
  )
  reference <- do.call(power_logrank_sim, base)
  larger <- base
  larger$n <- 600

  expect_lt(do.call(power_logrank_sim, c(base, list(delay = 6))), reference)
  expect_lt(do.call(power_logrank_sim, c(base, list(dropout = 0.1))), reference)
  expect_gt(do.call(power_logrank_sim, larger), reference)
})

test_that("the seed argument makes the simulation independent of the global stream", {
  set.seed(1)
  first <- power_logrank_sim(
    n = 200,
    hr = 0.7,
    lambda0 = 0.05,
    accrual = 12,
    followup = 12,
    nsim = 200,
    seed = 3
  )
  set.seed(999)
  second <- power_logrank_sim(
    n = 200,
    hr = 0.7,
    lambda0 = 0.05,
    accrual = 12,
    followup = 12,
    nsim = 200,
    seed = 3
  )

  expect_identical(first, second)
})

test_that("the log-rank functions validate their input", {
  expect_snapshot(error = TRUE, n_events_logrank(1))
  expect_snapshot(error = TRUE, n_events_logrank(0.5, alpha = 0))
  expect_snapshot(error = TRUE, n_events_logrank(0.5, power = 1))
  expect_snapshot(error = TRUE, n_events_logrank(0.5, p1 = 0))
  expect_snapshot(error = TRUE, n_events_logrank("a"))
  expect_snapshot(error = TRUE, power_logrank(d = 0, hr = 0.5))
  expect_snapshot(error = TRUE, power_logrank(d = 10, hr = -1))
  expect_snapshot(
    error = TRUE,
    power_logrank_sim(n = 0, hr = 0.5, lambda0 = 0.1, accrual = 1, followup = 1)
  )
  expect_snapshot(
    error = TRUE,
    power_logrank_sim(
      n = 10,
      hr = 0.5,
      lambda0 = 0.1,
      accrual = 1,
      followup = 1,
      nsim = 0
    )
  )
  expect_snapshot(
    error = TRUE,
    power_logrank_sim(
      n = 10,
      hr = 0.5,
      lambda0 = 0.1,
      accrual = 1,
      followup = 1,
      dropout = -1
    )
  )
  expect_snapshot(
    error = TRUE,
    power_logrank_sim(
      n = 10,
      hr = 0.5,
      lambda0 = 0.1,
      accrual = 1,
      followup = 1,
      delay = -1
    )
  )
})
