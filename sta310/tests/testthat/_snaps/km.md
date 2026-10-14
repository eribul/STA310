# km_estimate() validates its input

    Code
      km_estimate("a", 1)
    Condition
      Error:
      ! `time` must be a numeric vector.

---

    Code
      km_estimate(numeric(0), integer(0))
    Condition
      Error:
      ! `time` must not be empty.

---

    Code
      km_estimate(c(1, 2), 1)
    Condition
      Error:
      ! `time` and `status` must have the same length.

---

    Code
      km_estimate(c(1, NA), c(1, 0))
    Condition
      Error:
      ! `time` and `status` must not contain missing values.

---

    Code
      km_estimate(c(1, -1), c(1, 0))
    Condition
      Error:
      ! `time` must be non-negative.

---

    Code
      km_estimate(c(1, 2), c(1, 0, 1))
    Condition
      Error:
      ! `time` and `status` must have the same length.

---

    Code
      km_estimate(c(1, 2), c(1, 3))
    Condition
      Error:
      ! `status` must be 0 (censored) or 1 (event).

---

    Code
      km_estimate(c(1, 2), c(1, 0), conf_level = 1)
    Condition
      Error:
      ! `conf_level` must be a single number between 0 and 1.

---

    Code
      km_estimate(c(1, 2), c(1, 0), conf_type = "wald")
    Condition
      Error in `match.arg()`:
      ! 'arg' should be one of "plain", "log", "log-log"

# plot_km() validates its input

    Code
      plot_km(data.frame(t = 1, s = 1))
    Condition
      Error:
      ! `x` must be a data frame returned by `km_estimate()`.

