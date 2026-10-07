# Kurslitteratur — Collett: "Modelling Survival Data in Medical Research", 4:e uppl. (2023)

Huvudbok. CRC Press / Chapman & Hall. ISBN 978-1-032-25285-8 (hbk), 978-1-032-25289-6 (pbk).
Finns som kapitel-PDF:er i `book/0.pdf … 17.pdf` (99.pdf = index), samt som samlad fil `book/modelling-survival-data-in-medical-research-4nbsped-..._compress.pdf`.

## Kapitelöversikt

| Kap | Titel | Kursanknytning |
|---|---|---|
| 1 | Survival analysis | Grundbegrepp: censurering, oberoende censurering, study time vs patient time, S(t)/h(t)/H(t), programvara |
| 2 | Some non-parametric procedures | KM, Nelson–Aalen, livstabell; SE och KI; median/percentiler; log-rank, Wilcoxon, Peto-Peto; stratifierade test |
| 3 | The Cox regression model | Cox PH, skattning och tolkning av hazardkvoter |
| 4 | Model checking in the Cox regression model | Residualer, PH-antagande, inflytelserika observationer |
| 5 | Parametric regression models | Exponential, Weibull, log-logistisk, log-normal m.fl. |
| 6 | Flexible parametric models | Splines, piecewise, generaliserade modeller |
| 7 | Model checking in parametric models | Residualanalys för parametriska modeller |
| 8 | Time-dependent variables | Tidsberoende kovariater |
| 9 | Interval-censored survival data | Intervallcensurering |
| 10 | Frailty models | Frailty / klustrade data |
| 11 | Non-proportional hazards and institutional comparisons | Icke-proportionella hazarder |
| 12 | Competing risks | Konkurrerande risker |
| 13 | Multiple events and event history modelling | Upprepade händelser, event history |
| 14 | Dependent censoring | Beroende censurering |
| 15 | Sample size requirements for a survival study | Power / sample size |
| 16 | Bayesian survival analysis | Bayesianska metoder |
| 17 | Survival analysis with R | R-implementering av metoderna |

## Koppling till lärandemål

- **Grundbegrepp** → Kap 1.
- **Icke-parametriska metoder + test** → Kap 2.
- **Semi-parametriska modeller (Cox)** → Kap 3–4.
- **Parametriska modeller** → Kap 5–7.
- **Modelluppbyggnad, hypotesprövning, relativa mått** → Kap 3–4, 17.
- **Visualisering** → Kap 1–2, 17.
- **Avancerade metoder (icke-PH, upprepade händelser, competing risks)** → Kap 11, 13, 12.
- **Rapportering/tolkning i medicinska tillämpningar** → löpande i samtliga kapitel.

## Anmärkningar

- Detaljerade avsnittslistor (t.ex. 2.1–2.8) finns i respektive kapitel-PDF; extrahera vid behov med `pdftotext`.
- Boken är icke-teknisk, praktikinriktad, med många biomedicinska exempel och R-guidning (framför allt Kap 17).

## Övningsuppgifter

- **Boken innehåller inga egna övningsuppgifter** — inga kapitelavslutande problem och inget facit. Varje kapitel avslutas enbart med "Further reading".
- Förordet skriver att extra dataset "may be used ... as student exercises", vilket syftar på **Appendix B** — alltså råmaterial att bygga egna övningar kring, inte färdiga uppgifter.
- **Appendix A** — *Maximum likelihood estimation* (teknisk bakgrund om ML-inferens, ej övningar).
- **Appendix B** — *Additional data sets*: fem dataset som inte överlappar med kapitlens löpande exempel.

| B.nr | Dataset |
|---|---|
| B.1 | Chronic active hepatitis |
| B.2 | Recurrence of bladder cancer |
| B.3 | Survival of black ducks |
| B.4 | Bone marrow transplantation |
| B.5 | Chronic granulomatous disease |
