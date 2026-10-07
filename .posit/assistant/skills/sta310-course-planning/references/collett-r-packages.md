# R-paket i Collett kap 17 (R-implementering)

Kärnpaket: **`survival`** (ingår i bas-R-distributionen). Innehåller de funktioner som
används genom hela kapitlet: `Surv`, `survfit`, `survdiff`, `coxph`, `survreg`, `cox.zph`.

| Paket | Används för | Koppling till tema |
|---|---|---|
| `survival` | Kärnpaket: KM (`survfit`), log-rank (`survdiff`), Cox (`coxph`), parametriska modeller (`survreg`), modellkontroll (`cox.zph`), tidsberoende kovariater, frailty | Kap 2–5, 8, 10 |
| `PHInfiniteEstimates` | Gehan–Wilcoxon-test (`gehan.wilcoxon.test`) | Kap 2 (icke-parametriskt) |
| `CPE` | Concordance probability estimate (`phcpe`, Gönen–Heller) | Kap 3 (modellutvärdering) |
| `penalized` | Ridge/lasso-straffad Cox (`penalized`) | Kap 3 |
| `lattice` | `xyplot` (alternativ plot) | Visualisering |
| `survivalROC` | Tidsberoende ROC-kurvor | Prediktiv förmåga |
| `flexsurv` | Flexibla parametriska modeller (`flexsurvspline`) | Kap 6 |
| `interval` | Intervallcensurering, NPMLE/Turnbull (`icfit`, `getsurv`) | Kap 9 |
| `icenReg` | Intervallcensurering (`ic_np`) | Kap 9 |
| `parfm` | Parametriska frailty-modeller (`parfm`) | Kap 10 |
| `cmprsk` | Competing risks (`cuminc`, `crr`) | Kap 12 |
| `joineR`, `nlme` | Joint models / longitudinella data | Kap 13 |
| `rstanarm` | Bayesiansk överlevnadsanalys | Kap 16 |

## Vidare läsning (nämns i kap 17.16, ej använt i kapitlets kod)

- `JM` — joint modelling av longitudinella och tid-till-händelse-data (Rizopoulos).
- `eha` — Broström (2022), introduktion till överlevnads-/event history-analys med samhällsvetenskapliga exempel. Används inte som kursverktyg.

## Anmärkningar

- `flexsurv` har även `flexsurvreg` för allmänna parametriska modeller, men kap 17
  illustrerar främst `flexsurvspline`.
- Frailty i `survival` skattas via `coxph(..., frailty(...))`; `parfm` används för
  parametriska frailty-modeller.
- Tidsberoende kovariater och competing risks hanteras i `survival` (`Surv`, `tt`,
  `survfit`) respektive `cmprsk`.
