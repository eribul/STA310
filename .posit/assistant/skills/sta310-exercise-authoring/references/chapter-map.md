# Kapitelkarta — frågetyper per kapitel

Frågetyperna följer Colletts metodologiska progression. Tabellen ger per kapitel
fokus och betonade frågetyper (tyngdpunkt — typerna kan alltid blandas).

**Avgränsning:** Övningarna för kapitel N får endast bygga på kapitel 1–N. Blanda
kapitellokala frågor med kumulativa (som bygger på tidigare kapitel); kumulativa
markeras med `*Builds on: Chapters X–Y*`. Läs alltid hela kapitlets text, inte bara
innehållsförteckningen.

## Innehåll

- Kapitel 1–7 (bokens kärna)
- Kapitel 8–17 (fördjupning)

## Kapitel 1–7 (kärnan)

| Kap | Titel | Fokus | Betonade frågetyper |
|---|---|---|---|
| 1 | Survival analysis | Censurering, S(t)/h(t)/H(t), studietid vs patienttid, oberoende censurering | Concept & notation; True/false; Assumptions; Interpret figure; Mini-lab |
| 2 | Some non-parametric procedures | KM, Nelson–Aalen, log-rank, Wilcoxon | Interpret figure; Interpret R output; Method selection; Risk set; Assumptions |
| 3 | The Cox regression model | Cox PH, HR-skattning och tolkning | Method selection; Assumptions (PH); Interpret R output; From research question to model; Model comparison |
| 4 | Model checking in the Cox regression model | Residualer, PH-antagande, inflytelserika obs | Diagnostics & model critique; Assumptions; Interpret figure; What's wrong; Interpret R output |
| 5 | Parametric regression models | Exponential, Weibull, log-logistisk, log-normal | Model comparison; Assumptions (fördelning); Interpret R output; Time scale & estimand |
| 6 | Flexible parametric models | Splines, piecewise | Model comparison; Diagnostics; Interpret figure; Concept & notation |
| 7 | Model checking in parametric models | Residualanalys för parametriska modeller | Diagnostics & model critique; Interpret figure; What's wrong |

## Kapitel 8–17 (fördjupning)

| Kap | Titel | Fokus | Betonade frågetyper |
|---|---|---|---|
| 8 | Time-dependent variables | Tidsberoende kovariater | Assumptions; From research question to model; Model comparison; Code completion |
| 9 | Interval-censored survival data | Intervallcensurering | Concept & notation; Assumptions; Method selection; What's wrong |
| 10 | Frailty models | Frailty / klustrade data | Concept & notation; Assumptions; From research question to model; Interpret R output |
| 11 | Non-proportional hazards | Icke-proportionella hazarder | Diagnostics & model critique; What's wrong; Model comparison; Assumptions |
| 12 | Competing risks | Konkurrerande risker | Concept & notation (CIF vs 1−KM); Interpret figure; Time scale & estimand; What's wrong; Method selection |
| 13 | Multiple events / event history | Upprepade händelser | From research question to model; Assumptions; Method selection; Risk set |
| 14 | Dependent censoring | Beroende censurering | Concept & notation; Assumptions; What's wrong; Method selection |
| 15 | Sample size requirements | Power / sample size | From research question to model; Time scale & estimand; What if; Simulation-based intuition |
| 16 | Bayesian survival analysis | Bayesianska metoder | Concept & notation; Interpret R output; Model comparison; Assumptions (priors) |
| 17 | Survival analysis with R | R-implementering | Code reading; Code completion; Mini-lab; Interpret R output (tvärgående) |
