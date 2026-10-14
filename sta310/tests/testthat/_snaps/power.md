# the log-rank functions validate their input

    Code
      n_events_logrank(1)
    Condition
      Error:
      ! `hr` must differ from 1; there is no effect to detect.

---

    Code
      n_events_logrank(0.5, alpha = 0)
    Condition
      Error:
      ! `alpha` must be strictly between 0 and 1.

---

    Code
      n_events_logrank(0.5, power = 1)
    Condition
      Error:
      ! `power` must be strictly between 0 and 1.

---

    Code
      n_events_logrank(0.5, p1 = 0)
    Condition
      Error:
      ! `p1` must be strictly between 0 and 1.

---

    Code
      n_events_logrank("a")
    Condition
      Error:
      ! `hr` must be a single positive number.

---

    Code
      power_logrank(d = 0, hr = 0.5)
    Condition
      Error:
      ! `d` must be a single positive number.

---

    Code
      power_logrank(d = 10, hr = -1)
    Condition
      Error:
      ! `hr` must be a single positive number.

---

    Code
      power_logrank_sim(n = 0, hr = 0.5, lambda0 = 0.1, accrual = 1, followup = 1)
    Condition
      Error:
      ! `n` must be a single positive number.

---

    Code
      power_logrank_sim(n = 10, hr = 0.5, lambda0 = 0.1, accrual = 1, followup = 1,
        nsim = 0)
    Condition
      Error:
      ! `nsim` must be a single positive number.

---

    Code
      power_logrank_sim(n = 10, hr = 0.5, lambda0 = 0.1, accrual = 1, followup = 1,
        dropout = -1)
    Condition
      Error:
      ! `dropout` must be a single non-negative number.

---

    Code
      power_logrank_sim(n = 10, hr = 0.5, lambda0 = 0.1, accrual = 1, followup = 1,
        delay = -1)
    Condition
      Error:
      ! `delay` must be a single non-negative number.

