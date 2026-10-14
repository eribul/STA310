# emp_hazard() validates its input

    Code
      emp_hazard("a", breaks = c(0, 1))
    Condition
      Error:
      ! `time` must be a non-empty numeric vector without missing values.

---

    Code
      emp_hazard(c(1, NA), breaks = c(0, 1))
    Condition
      Error:
      ! `time` must be a non-empty numeric vector without missing values.

---

    Code
      emp_hazard(c(1, -1), breaks = c(0, 1))
    Condition
      Error:
      ! `time` must be non-negative.

---

    Code
      emp_hazard(c(1, 2), breaks = 1)
    Condition
      Error:
      ! `breaks` must be a numeric vector with at least two values.

---

    Code
      emp_hazard(c(1, 2), breaks = c(0, 2, 1))
    Condition
      Error:
      ! `breaks` must be sorted in strictly increasing order.

---

    Code
      emp_hazard(c(1, 2), breaks = c(0, 2), status = c(1, 1, 1))
    Condition
      Error:
      ! `status` must have the same length as `time`.

---

    Code
      emp_hazard(c(1, 2), breaks = c(0, 2), status = c(1, 2))
    Condition
      Error:
      ! `status` must be 0 (censored) or 1 (event).

