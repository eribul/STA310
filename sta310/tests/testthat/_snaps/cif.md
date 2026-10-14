# cif_cause_specific() validates its input

    Code
      cif_cause_specific(unname(fits), data.frame(age = 60), 1)
    Condition
      Error:
      ! `fits` must be a non-empty, named list of Cox models.

---

    Code
      cif_cause_specific(list(a = 1, 2), data.frame(age = 60), 1)
    Condition
      Error:
      ! Every element of `fits` must have a non-empty name.

---

    Code
      cif_cause_specific(fits, data.frame(age = c(60, 70)), 1)
    Condition
      Error:
      ! `newdata` must be a one-row data frame of covariate values.

---

    Code
      cif_cause_specific(fits, data.frame(age = 60), -1)
    Condition
      Error:
      ! `times` must be a non-empty numeric vector of non-negative times.

---

    Code
      cif_cause_specific(fits, data.frame(age = 60), numeric(0))
    Condition
      Error:
      ! `times` must be a non-empty numeric vector of non-negative times.

---

    Code
      cif_cause_specific(list(a = survival::survfit(survival::Surv(time, status) ~ 1,
      data = iud)), data.frame(age = 60), 1)
    Condition
      Error:
      ! Every element of `fits` must be a `coxph` object.

---

    Code
      cif_cause_specific(list(a = survival::coxph(survival::Surv(time, status) ~ age +
        survival::strata(cof), data = liver)), data.frame(age = 60), 1)
    Condition
      Error in `stats::stepfun()`:
      ! stepfun: 'x' must be ordered increasingly

