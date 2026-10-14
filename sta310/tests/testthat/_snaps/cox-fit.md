# print() summarises the fit

    Code
      print(fit)
    Output
      Cox proportional hazards model (Newton-Raphson, efron ties)
      n = 48, events = 36, iterations = 7
      partial log-likelihood = -102.7
      
       term   estimate std_error         z   p_value
        age -0.0001542  0.026230 -0.005879 0.9953000
        bun  0.0201500  0.005732  3.516000 0.0004386

# cox_fit() validates its input

    Code
      cox_fit("a", 1, 1)
    Condition
      Error:
      ! `time` must be numeric and have the same length as `status`.

---

    Code
      cox_fit(myeloma$time, rep(0L, nrow(myeloma)), myeloma[, c("age", "bun")])
    Condition
      Error:
      ! At least one event is required to fit the model.

---

    Code
      cox_fit(myeloma$time, myeloma$status, as.character(myeloma$age))
    Condition
      Error:
      ! `x` must be numeric. Expand factors with `model.matrix()` first.

---

    Code
      cox_fit(myeloma$time, myeloma$status, myeloma[-1, c("age", "bun")])
    Condition
      Error:
      ! `x` must have one row per subject in `time`.

---

    Code
      cox_fit(bmt_leukaemia$time, bmt_leukaemia$status, stats::model.matrix(~ factor(
        group), data = bmt_leukaemia))
    Condition
      Error:
      ! Covariate(s) (Intercept) are constant. A Cox model has no intercept; drop it, for example with `model.matrix(~ f - 1)`.

