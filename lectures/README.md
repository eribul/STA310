# STA310 lecture slides (Quarto, revealjs)

One folder per lecture, each with a single `.qmd` file. Slides are in English and scrollable
(`scrollable: true` in `_quarto.yml`). Data come from
`../Data sets from Modelling Survival Data in Medical Research, 4th edition/` and from the `survival` package.

Render one lecture:  `quarto render 01-intro/01-intro.qmd`
Render all:          `quarto render`
PDF (optional):      open the HTML in Chrome and append `?print-pdf`

`_authoring-guide.md` holds the conventions used when writing the slides (not rendered).

| # | Folder | Topic | Collett |
|---|---|---|---|
| 1 | 01-intro | Introduction, censoring, S(t), h(t), H(t) | 1 |
| 2 | 02-kaplan-meier | Kaplan-Meier, Nelson-Aalen, confidence intervals | 2 |
| 3 | 03-logrank | Log-rank and weighted tests, stratified tests | 2 |
| 4 | 04-cox-1 | Cox model, partial likelihood, hazard ratios | 3 |
| 5 | 05-cox-2 | Multivariable Cox, model building, stratification | 3 |
| 6 | 06-model-checking-1 | Residuals, proportional hazards | 4 |
| 7 | 07-model-checking-2 | Influence, functional form, worked analysis | 4 |
| 8 | 08-parametric | Weibull, AFT, parametric models | 5 |
| 9 | 09-flexible-parametric | Piecewise, splines, parametric checking | 6-7 |
| 10 | 10-time-dependent | Time-dependent covariates | 8 |
| 11 | 11-non-ph | Non-proportional hazards, RMST, institutions | 11 |
| 12 | 12-competing-risks-1 | Cause-specific hazards, cumulative incidence | 12 |
| 13 | 13-competing-risks-2 | Cause-specific Cox, Fine-Gray | 12 |
| 14 | 14-recurrent-events | Recurrent events, AG, PWP, multi-state | 13 |
| 15 | 15-overview-topics | Interval censoring, frailty, sample size | 9, 10, 15 |
| 16 | 16-repetition | Revision | - |
