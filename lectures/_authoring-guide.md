# Authoring guide for STA310 lecture slides (internal, not rendered)

Project: `/Users/xbuler/STA310/lectures/` (Quarto, revealjs). Config is in `_quarto.yml` and `styles.scss`
(do NOT change them; slides are already `scrollable: true` and `auto-stretch: false`). Reference
implementations to imitate in structure, tone and level: `01-intro/01-intro.qmd` and `02-kaplan-meier/02-kaplan-meier.qmd`.

## Figures on slides
- The project renders figures at **natural size** (`auto-stretch: false` + `fig-dpi: 150`), so a
  8-inch-wide plot is ~1200 px on a 1280 px slide. Slides scroll vertically (`scrollable: true`) when
  content overflows, instead of shrinking the plot. This is why a figure must not also be re-sized by
  hand (`out.width`/`out.height`): let the config do it.
- To put a plot (or any output) on its **own slide**, add `#| output-location: slide` to the chunk.
  Code stays on the first slide, the figure appears alone on the next slide at full size. Use this for
  the important figures; do not set it globally (it would also split printed numbers/tables).
- For a figure to be slightly bigger or smaller on one slide, override `#| fig-width`/`#| fig-height`
  (or `#| fig-dpi`) on that chunk rather than changing the global config.
- Reveal.js has no per-figure lightbox. Pressing **F** toggles fullscreen for the whole deck, and
  **Esc** opens the overview (thumbnails) — the closest built-in alternatives to a "view figure larger"
  button.

## Audience and format
- MSc students in applied biostatistics, course STA310 (Gothenburg), textbook Collett,
  *Modelling Survival Data in Medical Research*, 4th ed. Slides are in **English**.
- One lecture = 2 x 45 min -> roughly 35-45 slides including code slides. Do not exhaust every
  alternative in the book: focus on the most common method, mention alternatives in one slide at most.
- Pedagogical, with MANY examples: both R code and medical interpretation. Typical rhythm:
  motivation (medical question) -> idea/intuition -> formula -> R code -> interpretation of output ->
  pitfalls -> take-home. Include one quick in-class exercise slide and a "Take-home messages" slide
  with "Next lecture" and "Reading: Collett, Chapter X" lines. Quiz slide optional.
- Use `# Section title` for section slides, `##` for content slides. Use callouts (`::: {.callout-tip}`,
  `-warning`, `-important`, `-note`), `. . .` for incremental reveals, `::: {.columns}` for side by side.
- Math with `$...$` / `$$...$$`. Mermaid allowed for diagrams (` ```{mermaid} `).
- Write interpretations of output in prose, in the slide, using actual numbers from the output.
  Prefer inline R (`r round(x, 2)`) for numbers quoted in text so they cannot go stale.
- Slides are scrollable, but keep slides focused anyway: avoid dumping long outputs
  (use `head()`, `broom::tidy()`, `gtsummary::tbl_regression()`, `#| output-location: column` etc).

## Header and setup chunk (copy this pattern)
```
---
title: "Lecture N: <title>"
subtitle: "STA310 Survival Analysis · Collett Chapter X"

date: today
---

```{r}
#| include: false
library(survival); library(ggsurvfit); library(tidyverse)
theme_set(theme_minimal(base_size = 16))
data_dir <- "../../Data sets from Modelling Survival Data in Medical Research, 4th edition"
# read the data sets needed with read.table(file.path(data_dir, "<name>.dat"), header = TRUE)
```
```
File location: `lectures/NN-short-name/NN-short-name.qmd` (folder and file named identically, e.g.
`03-logrank/03-logrank.qmd`). Use the folder name given in your task.

## R conventions
- Base R pipe `|>`, tidyverse + ggplot2, `ggsurvfit` for KM plots (see lectures 1-2), `survival`,
  `gtsummary::tbl_regression()` / `broom::tidy()` for model tables. Namespaced calls for less common
  packages (`flexsurv::`, `cmprsk::`, `tidycmprsk::`, `rms::`, `icenReg::`, `mstate::`, ...).
- Installed: survival, ggsurvfit, gtsummary, tidyverse, broom, flexsurv, cmprsk, tidycmprsk, rms,
  survminer, icenReg, mstate, riskRegression, pec, gt. NOT installed: coxme, powerSurvEpi, timeR.
  Do not install anything; if a package is missing use base R or `survival`.
- Do not assign things to the global environment needlessly; do not use set.seed(123)/42 (use random seeds).
- Code echoing is on (`echo: true` in project config); use `#| echo: false` for pure figure code
  that is not pedagogically interesting (e.g. illustration plots).
- No `library()` of survminer unless necessary (it masks things); `ggsurvfit` is the standard.

## Data
Book data sets are in `"Data sets from Modelling Survival Data in Medical Research, 4th edition"/*.dat`
(whitespace-separated, header). The first rows of each file are shown below (verified codings).
`status` is 1 = event, 0 = censored in all of them unless noted. Always check by printing.

| File | Columns / notes |
|---|---|
| Time to discontinuation of the use of an IUD | time status (n=18) |
| Prognosis for women with breast cancer | stain(1/2 -> neg/pos) time status (n=45) |
| Survival of multiple myeloma patients | patient time status age sex bun ca hb pcells protein (n=48) |
| Chemotherapy in ovarian cancer patients | patient time status treat age rdisease perf (n=26; treat 1/2, rdisease 1/2, perf 1/2) |
| Treatment of hypernephroma | nephrectomy(0/1) age(group 1-3) time status (n=36) |
| Bone marrow transplantation | patient time status rage dage type preg index gvhd (n=37; type 1/2/3? check) |
| Comparison of two treatments for prostatic cancer | patient treatment time status age shb size index (n=38) |
| Survival of patients with gastric cancer | patient time status treat (n=89; treat 0/1; crossing hazards) |
| Survival times of patients with melanoma | age(1/2) treatment(1/2) time status (n=31) |
| Chronic active hepatitis | treatment(1/2) time status (n=44) |
| Survival following kidney transplantation | patient donor time status age diabetes cit (n=434, 270 donors -> clustered) |
| Comparisons between kidney transplant centres | patient centre tsurv tcens dage dtype rage diab cit (n=1439, 8 centres; tcens = event indicator? CHECK: tcens 1 = event (206 of 1439), tsurv = time) |
| Survival of liver transplant recipients | patient age gender disease(1-3) time status cof (n=1761; cof = cause of failure 0 cens, 1-4) |
| Survival of patients registered for a lung transplant | patient time status age gender bmi disease(1-4) (n=197) |
| Time to death while waiting for a liver transplant | patient time status age gender bmi ukeld (n=281) |
| Data from a cirrhosis study (in counting process format) | patient start stop status treat age lbrt (12 patients, 57 rows) |
| Recurrence of bladder cancer | patient time status treat init size (86 rows, first recurrence) |
| Recurrence of mammary tumours in female rats | rat treatment time status (258 rows, recurrent events, counting by gap?) check |
| Recurrence of an ulcer | patient age duration treatment time result (43 rows; result 1 = no ulcer recurrence?, 2 = recurrence; interval-censored study) check |
| Survival of laboratory mice | environment(1/2) causeofdeath(0-?) time (competing causes) |
| Survival following aortic valve replacement | id futime status time lvmi age sex redo emerg dm type (longitudinal, 989 rows) |
| Clinical trial of tamoxifen in breast cancer patients | id treat age size hist hr hb andis lsurv ls asurv as dsurv ds msurv ms tsurv ts (642 rows; several endpoints with times and indicators) |
| Recurrence free survival in breast cancer patients | id treat age men size grade nodes prog oest time status (690 rows) |
| Patient outcome following bone marrow transplantation | id leukaemia age match tcell ptime pcens rdtime rdcens (2205 rows; competing/intermediate events) |

Built-in `survival` data sets that are good for extra examples: `lung`, `veteran`, `colon`, `heart`
(Stanford transplant, counting-process form, time-dependent covariate), `jasa`, `pbc`, `pbcseq`,
`bladder`/`bladder1`, `cgd` (recurrent infections), `rats`, `mgus2` (competing risks),
`flchain`, `ovarian`, `diabetic`, `retinopathy`, `nafld1`. Mix book data sets and these. Check
column codings by printing, and **read the dataset's help page when unsure**.

Other useful references in the repository (read-only inspiration, do not edit):
- `/Users/xbuler/STA310/r-companion.qmd`: tested R code per Collett chapter. Reuse/adapt freely.
- Book chapters as PDF: `/Users/xbuler/STA310/book/<n>.pdf` (n = chapter number; extract text with
  `pdftotext -layout`). Use them to check the content, examples and notation of your chapter, and
  to choose which parts are core. Use the textbook's notation ($\beta$, $h_0(t)$, $\hat S$ ...).
- Exercises written for the course (what students practise): `/Users/xbuler/STA310/exercises/chapter-NN/`.
- Do NOT use anything from `bostrom/` or `eha/` (not student material); do not mention Broström.

## Quality bar
- Statistical correctness first. If you are unsure about a detail, check the book chapter PDF or the
  package help page. Do not invent numbers: every number quoted in text must come from code output.
- Honest language: do not claim "strong"/"clear" evidence unless output warrants it. Mention
  assumptions and limitations of methods (e.g. PH, independent censoring, small n).
- No emojis. Concise slides, not walls of text.
- Every code chunk must run. After writing, render with
  `cd /Users/xbuler/STA310/lectures && quarto render NN-name/NN-name.qmd` and fix every error and every
  warning that indicates a real problem. Then open the log output for suspicious messages.
  Re-render until clean. Also check that figures are sensible (axes labelled, nothing cropped) using the
  rendered HTML or by running the plot code and inspecting it if you can.
- Keep the generated `.html` next to the `.qmd` (that is how the project works). No other files.
- Do not edit other lectures, `_quarto.yml`, `styles.scss`, README.md.
- If a column coding is unclear, say so in your final report instead of guessing.

## Final report
Return a short report (max ~15 lines): file paths created, number of slides (approx), data sets used,
anything unresolved or suspicious (e.g. code you could not make work, codings you were unsure about).
