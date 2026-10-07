# Kompletterande R-paket utöver Collett (beslutad verktygslåda)

Dessa paket nämns **inte** i Collett men är beslutade som standardverktyg i
datorövningarna. Eftersom boken inte dokumenterar dem behöver studenterna en
cheatsheet/mall per paket. Alla är på CRAN och underhållna (verifierat sep 2026).

## Standardverktyg — används i alla datorövningar

| Paket | Version | Används för |
|---|---|---|
| `survival` | 3.8-12 | Kärnpaket (från boken): `Surv`, `survfit`, `survdiff`, `coxph`, `survreg`, `cox.zph` |
| `ggsurvfit` | 1.2.1 | KM-kurvor + risktabeller i ggplot2-stil |
| `gtsummary` | 2.6.1 | Publiceringsklara tabeller: `tbl_survfit`, `tbl_regression`, `tbl_uvregression` |

## Avancerade ämnen — när temat nås

| Paket | Version | Tema |
|---|---|---|
| `tidycmprsk` | 1.1.2 | Competing risks (`cuminc`, `crr`), integrerat med gtsummary |
| `riskRegression` | 2026.03.11 | Tidsberoende ROC/AUC/Brier, även med konkurrerande risker |
| `mstate` | 0.3.3 | Multistate-/event history-modeller (upprepade händelser) |

## Situationsberoende — tillgängliga men ej standard

- `coxphf` (1.13.4) — Firth-straffad Cox vid separation/monoton likelihood.
- `finalfit` (1.1.0) — medstatistik-workflow (HR/OR-tabeller); överlappar gtsummary.
- `censored` (0.3.5, tidymodels) — enhetligt modelleringsworkflow; endast om programmet undervisar tidymodels.
- `survminer` (0.5.2) — etablerat alternativ till ggsurvfit (`ggsurvplot`, `ggforest`).

## Regler för övningsplanering

1. Standard i alla övningar: `survival` + `ggsurvfit` + `gtsummary`.
2. Avancerade teman: lägg till `tidycmprsk`/`riskRegression`/`mstate` när respektive ämne behandlas.
3. Introducera inte situationsberoende paket utan pedagogiskt behov.
4. Studenternas övningar och rapporter ska kunna reproduceras med enbart dessa paket (ej `eha`/Broström).
