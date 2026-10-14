# Data set documentation --------------------------------------------------
#
# All data sets that accompany Collett, D. (2023) *Modelling Survival Data in
# Medical Research*, 4th ed., Chapman & Hall/CRC. The objects keep the column
# names of the distributed `.dat` files; the object names are the short names
# used throughout the STA310 lecture notes and the R companion.
#
# Each entry documents the background of the study, the time origin and the
# event of interest, the censoring mechanism, the variable codings (as they
# appear in the data files and in the book) and, where relevant, the analyses
# suggested in the book. Chapter and example numbers refer to Collett (2023).

#' Time to discontinuation of an intrauterine device (IUD)
#'
#' Number of weeks from the start of use of a Multiload 250 intrauterine device
#' until discontinuation because of menstrual bleeding problems, for 18 women
#' (Collett, 2023, Example 1.1). The data come from a World Health Organization
#' study of contraceptive methods.
#'
#' @format A data frame with 18 rows and 2 variables:
#' \describe{
#'   \item{time}{Time from first use of the IUD to discontinuation, in weeks.}
#'   \item{status}{Event indicator: 1 = discontinuation due to menstrual
#'     bleeding problems, 0 = right-censored.}
#' }
#'
#' @details
#' The time origin is the first day of IUD use and the endpoint is
#' discontinuation because of bleeding problems. Women who stopped using the
#' device for other reasons (desire for pregnancy, no further need of
#' contraception, lost to follow-up) contribute censored observations, as do
#' three women whose follow-up extended beyond the two-year study protocol.
#' There are 9 events and 9 censored times among the 18 women, three of the
#' censored times being greater than 104 weeks.
#'
#' The data are small enough to illustrate the product-limit estimator by hand.
#' In the book they are used for the Kaplan-Meier estimate and the median
#' (Examples 2.3-2.10), for exponential, Weibull and log-logistic parametric
#' models (Examples 5.1-5.4) and for Bayesian analyses (Examples 16.1-16.3).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 1.1 (Table 1.1). Data from the World
#'   Health Organization (1987).
#'
#' @examples
#' str(iud)
#' survival::survfit(survival::Surv(time, status) ~ 1, data = iud)
"iud"

#' Prognosis for women with breast cancer
#'
#' Survival times, in months, of 45 women who received a mastectomy for a
#' Grade II, III or IV breast tumour, classified by whether the tumour stained
#' positively or negatively with the lectin HPA (Collett, 2023, Example 1.2).
#'
#' @format A data frame with 45 rows and 3 variables:
#' \describe{
#'   \item{stain}{Result of HPA staining: 1 = negative, 2 = positive. Positive
#'     staining indicates a tumour with the potential to metastasise.}
#'   \item{time}{Survival time in months from surgery.}
#'   \item{status}{Event indicator: 1 = death from breast cancer, 0 =
#'     right-censored.}
#' }
#'
#' @details
#' The women were treated between January 1969 and December 1971 and the study
#' was closed in July 1987. Women still alive at that date, as well as women who
#' died from causes other than breast cancer, contribute censored times. There
#' are 13 women in the negative-staining group and 32 in the positive-staining
#' group, with 26 deaths in total.
#'
#' This is the standard small example for comparing two survival curves: the
#' Kaplan-Meier estimate by group (Examples 2.11-2.14), the log-rank and
#' Wilcoxon tests (Section 2.4) and a Cox model with `stain` as the single
#' covariate (Examples 3.1 and 3.3).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 1.2 (Table 1.2). Data from Leathem and
#'   Brooks (1987).
#'
#' @examples
#' str(breast)
#' survival::survfit(survival::Surv(time, status) ~ stain, data = breast)
"breast"

#' Survival of multiple myeloma patients
#'
#' Survival times, in months, from diagnosis until death for 48 patients with
#' multiple myeloma, together with seven prognostic variables (Collett, 2023,
#' Example 1.3).
#'
#' @format A data frame with 48 rows and 10 variables:
#' \describe{
#'   \item{patient}{Patient number (1-48).}
#'   \item{time}{Survival time in months from diagnosis.}
#'   \item{status}{Event indicator: 1 = death from multiple myeloma, 0 =
#'     right-censored.}
#'   \item{age}{Age at diagnosis in years (50-80).}
#'   \item{sex}{Sex: 1 = male, 2 = female.}
#'   \item{bun}{Blood urea nitrogen level.}
#'   \item{ca}{Serum calcium level.}
#'   \item{hb}{Haemoglobin level.}
#'   \item{pcells}{Percentage of plasma cells in the bone marrow.}
#'   \item{protein}{Bence-Jones protein in the urine: 0 = absent, 1 = present.}
#' }
#'
#' @details
#' There are 36 deaths among the 48 patients. The time origin is the date of
#' diagnosis and the endpoint is death from multiple myeloma; patients alive at
#' the end of the study contribute censored times.
#'
#' The data are used throughout the book: life-table estimation (Examples
#' 2.2 and 2.6), Cox regression with several covariates, variable selection and
#' interaction (Examples 3.2-3.20), model checking and influence diagnostics
#' (Examples 4.5, 4.8 and 4.9) and a Weibull model for a prognostic index
#' (Example 5.16).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 1.3 (Table 1.3). Original data from
#'   Krall, Uthoff and Harley (1975); the study was carried out at the Medical
#'   Center of the University of West Virginia, USA.
#'
#' @examples
#' str(myeloma)
#' survival::coxph(
#'   survival::Surv(time, status) ~ age + sex + bun + ca + hb + pcells + protein,
#'   data = myeloma
#' )
"myeloma"

#' Comparison of two treatments for prostatic cancer
#'
#' Survival times, in months, of 38 men with Stage III prostatic cancer,
#' randomised to placebo or to diethylstilbestrol (DES) (Collett, 2023,
#' Example 1.4).
#'
#' @format A data frame with 38 rows and 8 variables:
#' \describe{
#'   \item{patient}{Patient number (1-38).}
#'   \item{treatment}{Treatment group: 1 = placebo, 2 = diethylstilbestrol
#'     (DES).}
#'   \item{time}{Survival time in months from randomisation.}
#'   \item{status}{Event indicator: 1 = death from prostatic cancer, 0 =
#'     right-censored.}
#'   \item{age}{Age at trial entry, in years.}
#'   \item{shb}{Serum haemoglobin level, in g/100 ml.}
#'   \item{size}{Size of the primary tumour, in cm squared.}
#'   \item{index}{Combined index of tumour stage and grade (the Gleason index);
#'     higher values indicate a more advanced tumour.}
#' }
#'
#' @details
#' The trial was run by the Veteran's Administration Cooperative Urological
#' Research Group and only patients with a local tumour extension but without
#' elevated serum prostatic acid phosphatase are included. Deaths from other
#' causes and losses to follow-up are censored. There are only 6 deaths in this
#' subset of 38 patients.
#'
#' With so few events the example is used to show the behaviour of the partial
#' likelihood and of the estimated hazard ratios (Examples 3.6, 3.12, 3.16 and
#' 5.15), and the fitted Cox model is re-used for an accelerated failure time
#' comparison (Example 5.15).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 1.4 (Table 1.4). The full trial is
#'   given in Andrews and Herzberg (1985).
#'
#' @examples
#' str(prostate)
#' survival::coxph(
#'   survival::Surv(time, status) ~ treatment + age + shb + size + index,
#'   data = prostate
#' )
"prostate"

#' Pulmonary metastasis in patients with osteosarcoma
#'
#' Survival times, in months, of eleven male patients with pulmonary metastasis
#' arising from osteosarcoma (Collett, 2023, Example 2.1).
#'
#' @format A data frame with 11 rows and 1 variable:
#' \describe{
#'   \item{time}{Survival time in months.}
#' }
#'
#' @details
#' There is no censoring in these data and all survival times are distinct, so
#' the survivor function can be estimated directly from the observed
#' proportions surviving. The estimated values of S(t) at 11, 13, 14, 15 and 17
#' months are 1.000, 0.909, 0.455, 0.273 and 0.091, and S(t) is zero after 17
#' months. The example is used in the book to introduce the empirical survivor
#' function before censoring is considered.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 2.1. Data from Burdette and Gehan
#'   (1970).
#'
#' @examples
#' str(pulmonary)
#' table(pulmonary$time)
"pulmonary"

#' Survival times of patients with melanoma
#'
#' Survival times, in months, of 30 patients with melanoma, from two
#' immunotherapy treatment groups and stratified by age group (Collett, 2023,
#' Example 2.15).
#'
#' @format A data frame with 30 rows and 4 variables:
#' \describe{
#'   \item{age}{Age group: 1 = 21-40 years, 2 = 41-60 years, 3 = 61 years and
#'     over.}
#'   \item{treatment}{Treatment: 1 = BCG vaccine, 2 = Corynebacterium parvum
#'     vaccine.}
#'   \item{time}{Survival time in months.}
#'   \item{status}{Event indicator: 1 = death, 0 = right-censored.}
#' }
#'
#' @details
#' The tumour was removed surgically before randomisation. The data are used to
#' illustrate the log-rank test for comparing two treatment groups within each
#' age stratum (Examples 2.15 and 2.16) and the log-rank test for trend.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Examples 2.15 and 2.16 (Table 2.9). Data from
#'   Lee and Wang (2013).
#'
#' @examples
#' str(melanoma)
#' survival::survdiff(
#'   survival::Surv(time, status) ~ treatment + survival::strata(age),
#'   data = melanoma
#' )
"melanoma"

#' Treatment of hypernephroma
#'
#' Survival times, in months, of 36 patients with hypernephroma (a malignant
#' tumour of the kidney) treated with chemotherapy and immunotherapy, with or
#' without a nephrectomy, and classified by age group (Collett, 2023,
#' Example 3.4).
#'
#' @format A data frame with 36 rows and 4 variables:
#' \describe{
#'   \item{nephrectomy}{Whether the kidney was surgically removed: 0 = no,
#'     1 = yes.}
#'   \item{age}{Age group at diagnosis: 1 = under 60 years, 2 = 60-70 years,
#'     3 = over 70 years.}
#'   \item{time}{Survival time in months.}
#'   \item{status}{Event indicator: 1 = death, 0 = right-censored.}
#' }
#'
#' @details
#' The age of each patient has been grouped for the analysis (the underlying age
#' in years is not included). The example is the running illustration of the
#' Cox regression model: indicator variables for a factor with three levels,
#' models with and without interaction, and the interpretation of the baseline
#' hazard (Examples 3.4, 3.10, 3.11, 3.13 and 3.14), followed by the
#' corresponding Weibull analysis (Examples 5.10, 6.1 and 6.4).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 3.4 (Table 3.6). Data from Lee and
#'   Wang (2013).
#'
#' @examples
#' str(hyper)
#' survival::coxph(
#'   survival::Surv(time, status) ~ factor(age) + nephrectomy,
#'   data = hyper
#' )
"hyper"

#' Infection in patients on dialysis
#'
#' Times from insertion of a catheter to its removal following infection, for
#' 13 kidney patients (Collett, 2023, Example 4.1).
#'
#' @format A data frame with 13 rows and 5 variables:
#' \describe{
#'   \item{patient}{Patient number (1-13).}
#'   \item{time}{Time from insertion of the catheter to its removal, in days.}
#'   \item{status}{Event indicator: 1 = catheter removed because of infection,
#'     0 = removed for another reason.}
#'   \item{age}{Age of the patient in years.}
#'   \item{sex}{Sex: 1 = male, 2 = female.}
#' }
#'
#' @details
#' The data relate to the 13 patients with kidney disease coded as type 3 by
#' McGilchrist and Aisbett (1991). In the original study each patient could
#' experience an infection of both the first and the second catheter, but only
#' the time to removal of the first catheter is given here. There is a single
#' censored observation (patient 6).
#'
#' With 13 observations and 12 events the data set is used to demonstrate
#' model-checking diagnostics for the Cox model: Cox-Snell, martingale and
#' deviance residuals and influence (Examples 4.1-4.4), a non-linear effect of
#' age and a time-dependent effect of sex (Examples 4.10-4.12).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 4.1 (Table 4.1). Data from McGilchrist
#'   and Aisbett (1991).
#'
#' @examples
#' str(dialysis)
#' survival::coxph(survival::Surv(time, status) ~ age + sex, data = dialysis)
"dialysis"

#' A numerical illustration of two factors
#'
#' Artificial survival times of 37 patients classified by the levels of two
#' two-level factors, A and B (Collett, 2023, Example 5.9).
#'
#' @format A data frame with 37 rows and 4 variables:
#' \describe{
#'   \item{a}{Level of factor A: 1 or 2.}
#'   \item{b}{Level of factor B: 1 or 2.}
#'   \item{time}{Survival time.}
#'   \item{status}{Event indicator: 1 = event, 0 = right-censored.}
#' }
#'
#' @details
#' The data are not real. They are constructed so that factor A has a
#' proportional effect while the effect of factor B, and the interaction
#' between A and B, are more complicated, and are used to compare Weibull
#' proportional hazards and accelerated failure time models fitted to the same
#' data (Example 5.9).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 5.9 (Table 5.1).
#'
#' @examples
#' str(numerical_illustration)
#' survival::survfit(
#'   survival::Surv(time, status) ~ factor(a),
#'   data = numerical_illustration
#' )
"numerical_illustration"

#' Chemotherapy in ovarian cancer patients
#'
#' Survival times, in days, of 26 women with ovarian cancer randomised to one
#' of two chemotherapy regimens (Collett, 2023, Example 5.11).
#'
#' @format A data frame with 26 rows and 7 variables:
#' \describe{
#'   \item{patient}{Patient number (1-26).}
#'   \item{time}{Survival time in days from randomisation.}
#'   \item{status}{Event indicator: 1 = death, 0 = right-censored.}
#'   \item{treat}{Treatment: 1 = cyclophosphamide alone (single), 2 =
#'     cyclophosphamide combined with adriamycin.}
#'   \item{age}{Age of the patient in years.}
#'   \item{rdisease}{Extent of residual disease: 1 = incomplete excision,
#'     2 = complete excision.}
#'   \item{perf}{Performance status: 1 = good, 2 = poor.}
#' }
#'
#' @details
#' All women had minimal residual disease after surgical excision of tumours
#' larger than 2 cm. There are 12 deaths among the 26 patients. The factors
#' `treat`, `rdisease` and `perf` each have two levels and are fitted as
#' indicator variables, so the baseline hazard does not correspond to a
#' patient with all covariates zero (see Example 5.11).
#'
#' The data are used for Weibull proportional hazards models and variable
#' selection (Examples 5.11 and 5.12), for model checking of parametric models
#' (Examples 7.1-7.4) and for a time-dependent covariate (Example 8.3).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 5.11 (Table 5.6). Data from Edmunson
#'   et al. (1979) via Therneau (1986).
#'
#' @examples
#' str(ovarian)
#' survival::survfit(survival::Surv(time, status) ~ treat, data = ovarian)
"ovarian"

#' Recurrence-free survival in breast cancer patients
#'
#' Recurrence-free survival times, in days, of 686 patients with node-positive
#' breast cancer from the German Breast Cancer Study Group (Collett, 2023,
#' Example 6.5).
#'
#' @format A data frame with 686 rows and 11 variables:
#' \describe{
#'   \item{id}{Patient number.}
#'   \item{treat}{Hormonal treatment: 0 = no tamoxifen, 1 = tamoxifen.}
#'   \item{age}{Age of the patient in years.}
#'   \item{men}{Menopausal status: 1 = premenopausal, 2 = postmenopausal.}
#'   \item{size}{Tumour size in mm.}
#'   \item{grade}{Tumour grade (1, 2 or 3).}
#'   \item{nodes}{Number of positive lymph nodes.}
#'   \item{prog}{Progesterone receptor status (femtomoles).}
#'   \item{oest}{Oestrogen receptor status (femtomoles).}
#'   \item{time}{Recurrence-free survival time in days.}
#'   \item{status}{Event indicator: 1 = relapse or death, 0 = right-censored.}
#' }
#'
#' @details
#' The patients had primary, histologically proven, non-metastatic
#' node-positive breast cancer treated with mastectomy; the study compared
#' three with six cycles of chemotherapy and investigated additional hormonal
#' treatment. Recurrence-free survival is the time from entry until a
#' recurrence of the cancer or death, and there are 299 events.
#'
#' The example introduces flexible parametric (Royston-Parmar) models with a
#' treatment effect and several prognostic variables (Examples 6.5 and 6.6).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 6.5 (Table 6.1). Data from Schumacher
#'   et al. (1994) and Sauerbrei and Royston (1999).
#'
#' @examples
#' str(breast_rfs)
#' survival::coxph(
#'   survival::Surv(time, status) ~ treat + age + men + size + grade + nodes,
#'   data = breast_rfs
#' )
"breast_rfs"

#' Bone marrow transplantation in the treatment of leukaemia
#'
#' Survival times, in days, of 23 leukaemia patients who received a bone
#' marrow transplant, with donor and recipient characteristics and an indicator
#' of platelet recovery (Collett, 2023, Example 8.2).
#'
#' @format A data frame with 23 rows and 8 variables:
#' \describe{
#'   \item{patient}{Patient number (1-23).}
#'   \item{time}{Survival time in days from transplantation.}
#'   \item{status}{Event indicator: 1 = death, 0 = alive at the end of
#'     follow-up.}
#'   \item{group}{Disease group: 1 = acute lymphoblastic leukaemia (ALL),
#'     2 = low-risk acute myeloid leukaemia (AML), 3 = high-risk AML.}
#'   \item{page}{Age of the patient in years.}
#'   \item{dage}{Age of the bone marrow donor in years.}
#'   \item{precovery}{Platelet recovery: 0 = no, 1 = platelet count returned to
#'     a normal level of 40 x 10^9 per litre.}
#'   \item{ptime}{Time in days until the platelet count returned to normal
#'     (`NA` when `precovery` is 0).}
#' }
#'
#' @details
#' This is the subset of the study from St Vincent's Hospital, Sydney, used by
#' Klein and Moeschberger (2005). There are 12 deaths. Patients 7 and 21 died
#' before their platelet count returned to normal, and so `ptime` is missing for
#' them; these missing values are stored as `NA` in the package.
#'
#' The data illustrate the use of a time-dependent covariate: the indicator of
#' platelet recovery changes from 0 to 1 at `ptime`, so the survival data are
#' expanded into the counting process format (Example 8.2, and Example 8.1
#' introduces the format itself).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 8.2 (Table 8.2). Data from Klein and
#'   Moeschberger (2005).
#'
#' @examples
#' str(bmt_leukaemia)
#' survival::coxph(
#'   survival::Surv(time, status) ~ factor(group) + page + dage,
#'   data = bmt_leukaemia
#' )
"bmt_leukaemia"

#' Data from a cirrhosis study (baseline)
#'
#' Survival times, in days, of 12 patients in an artificial study of the
#' treatment of cirrhosis of the liver, with baseline age and bilirubin level
#' (Collett, 2023, Example 8.4).
#'
#' @format A data frame with 12 rows and 6 variables:
#' \describe{
#'   \item{patient}{Patient number (1-12).}
#'   \item{time}{Survival time in days.}
#'   \item{status}{Event indicator: 1 = death, 0 = right-censored.}
#'   \item{age}{Age of the patient in years.}
#'   \item{treat}{Treatment: 0 = placebo, 1 = Liverol.}
#'   \item{lbr}{Logarithm of the baseline bilirubin level (in micromol/l).}
#' }
#'
#' @details
#' The data are artificial but are used to mimic a real liver study. Six
#' patients are allocated to Liverol and six to placebo. The baseline
#' log(bilirubin) value is analysed first, and the treatment effect is
#' estimated after adjustment for age and `lbr` (Example 8.4).
#'
#' The same patients appear in three files in this package. `cirrhosis` holds
#' the baseline values (one row per patient), `cirrhosis_lbr` holds the
#' repeated log(bilirubin) measurements in long format (one row per visit) and
#' `cirrhosis_cp` holds the survival data together with the time-dependent
#' log(bilirubin) value in counting process format (one row per interval).
#' See [cirrhosis_lbr] and [cirrhosis_cp].
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 8.4 (Table 8.4). The hypothetical
#'   study is loosely based on the primary biliary cirrhosis data of Therneau
#'   and Grambsch (2000).
#'
#' @examples
#' str(cirrhosis)
#' survival::coxph(
#'   survival::Surv(time, status) ~ age + lbr + treat,
#'   data = cirrhosis
#' )
"cirrhosis"

#' Data from a cirrhosis study (log-bilirubin data)
#'
#' Repeated measurements of log(bilirubin) for the 12 patients in the
#' cirrhosis study, in long format (Collett, 2023, Example 8.4).
#'
#' @format A data frame with 42 rows and 3 variables:
#' \describe{
#'   \item{patient}{Patient number (1-12).}
#'   \item{time}{Time of the measurement, in days from the start of treatment.}
#'   \item{lbr}{Logarithm of the bilirubin level (in micromol/l) measured at
#'     `time`.}
#' }
#'
#' @details
#' Patients return to the clinic three, six and twelve months after the start
#' of treatment and yearly thereafter. Values for a given patient form a step
#' function that is constant between two adjacent visits, with the new value
#' taking effect immediately after the reading. This file is the input to the
#' counting process version of the data, [cirrhosis_cp]; the baseline values are
#' in [cirrhosis].
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 8.4 (Table 8.5).
#'
#' @examples
#' str(cirrhosis_lbr)
#' head(cirrhosis_lbr)
"cirrhosis_lbr"

#' Data from a cirrhosis study (counting process format)
#'
#' Survival data for the 12 patients in the cirrhosis study, with the
#' log(bilirubin) level as a time-dependent covariate, in counting process
#' format (Collett, 2023, Example 8.4).
#'
#' @format A data frame with 54 rows and 7 variables:
#' \describe{
#'   \item{patient}{Patient number (1-12).}
#'   \item{start}{Start of the interval, in days.}
#'   \item{stop}{End of the interval, in days.}
#'   \item{status}{Event indicator for the interval: 1 = death at `stop`,
#'     0 = otherwise.}
#'   \item{treat}{Treatment: 0 = placebo, 1 = Liverol.}
#'   \item{age}{Age of the patient in years.}
#'   \item{lbrt}{Time-dependent log(bilirubin) value in effect during the
#'     interval, i.e. the most recent measurement after `start` and up to
#'     `stop`.}
#' }
#'
#' @details
#' Each row is a time interval during which all covariates are constant, so a
#' patient with many visits contributes several rows. Patient 1, for example,
#' has log(bilirubin) 3.2 for t <= 47, 3.8 for 47 < t <= 184, 4.9 for
#' 184 < t <= 251 and 5.0 for 251 < t <= 281. The data are used to fit a Cox
#' model with a time-dependent covariate (`start`, `stop` and `status` form the
#' response).
#'
#' The baseline values are in [cirrhosis] and the repeated measurements in
#' [cirrhosis_lbr].
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 8.4 (Tables 8.4 and 8.5).
#'
#' @examples
#' str(cirrhosis_cp)
#' survival::coxph(
#'   survival::Surv(start, stop, status) ~ lbrt + age,
#'   data = cirrhosis_cp
#' )
"cirrhosis_cp"

#' Survival following aortic valve replacement
#'
#' Longitudinal measurements of the left ventricular mass index (LVMI) and
#' survival times for 256 patients who received an aortic valve replacement
#' (Collett, 2023, Example 8.5).
#'
#' @format A data frame with 988 rows and 11 variables:
#' \describe{
#'   \item{id}{Patient number (1-256).}
#'   \item{futime}{Total follow-up time from the date of surgery, in years.}
#'   \item{status}{Event indicator: 1 = death, 0 = right-censored.}
#'   \item{time}{Time of the LVMI measurement after surgery, in years.}
#'   \item{lvmi}{Standardised left ventricular mass index.}
#'   \item{age}{Age of the patient in years.}
#'   \item{sex}{Sex: 0 = male, 1 = female.}
#'   \item{redo}{Previous cardiac surgery: 0 = no, 1 = yes.}
#'   \item{emerg}{Operative urgency: 0 = elective, 1 = urgent or emergency.}
#'   \item{dm}{Preoperative diabetes mellitus: 0 = no, 1 = yes.}
#'   \item{type}{Type of valve: 1 = human tissue, 2 = porcine tissue.}
#' }
#'
#' @details
#' The file is in long format: one row per LVMI measurement, and the baseline
#' and survival variables (`futime`, `status`, `age`, ...) are repeated on each
#' row for the patient. There are 988 measurement rows for 256 patients; 54 of
#' the patients died (`status` is 1, repeated on each of their rows). Patients
#' who had a second procedure are censored at that time so that they do not
#' appear twice in the survival data.
#'
#' The data are used for joint modelling of a longitudinal and a survival
#' outcome (Examples 8.5-8.9). The full data set is available as `heart.valve`
#' in the joineR package.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 8.5 (Table 8.10). Data from Lim et al.
#'   (2008).
#'
#' @examples
#' str(aortic)
#' length(unique(aortic$id))
"aortic"

#' Recurrence of an ulcer
#'
#' Interval-censored times to recurrence of an ulcer among 43 patients in a
#' double-blind clinical trial of two treatments (Collett, 2023, Example 9.1).
#'
#' @format A data frame with 43 rows and 6 variables:
#' \describe{
#'   \item{patient}{Patient number (1-43).}
#'   \item{age}{Age of the patient in years.}
#'   \item{duration}{Duration of verified disease: 1 = less than five years,
#'     2 = five years or more.}
#'   \item{treatment}{Treatment group: 1 = A, 2 = B.}
#'   \item{time}{Time of the last visit, in months.}
#'   \item{result}{Result of the endoscopy at the last visit: 1 = no ulcer
#'     detected, 2 = ulcer detected.}
#' }
#'
#' @details
#' Endoscopies were scheduled 6 and 12 months after randomisation, and patients
#' who presented with symptoms between visits had an unscheduled endoscopy.
#' The pair (`time`, `result`) is converted to an interval-censored recurrence
#' time: for example, a visit at 7 months with `result` 2 means recurrence in
#' the interval (6, 7], while `result` 1 at 12 months means the recurrence time
#' is right-censored at 12 months. Because 6 months is the earliest possible
#' interval limit, the combination (`time` = 6, `result` = 2) becomes (0, 6].
#' There are 11 detected recurrences.
#'
#' The data are used for interval-censored analyses (Examples 9.1-9.7) and for
#' the restricted mean survival time computed from interval-censored data
#' (Example 11.1). The full multinational study is described by Whitehead
#' (1989); the data here are the Belgian subset.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 9.1 (Tables 9.1 and 9.2). Data from
#'   Whitehead (1989).
#'
#' @examples
#' str(ulcer)
#' table(ulcer$time, ulcer$result)
"ulcer"

#' Recurrence of bladder cancer
#'
#' Times to the first recurrence of a bladder tumour, in months, for 86
#' patients in a placebo-controlled trial of thiotepa (Collett, 2023, Appendix
#' B.2).
#'
#' @format A data frame with 86 rows and 6 variables:
#' \describe{
#'   \item{patient}{Patient number (1-86).}
#'   \item{time}{Time to first recurrence, in months.}
#'   \item{status}{Event indicator: 1 = recurrence, 0 = right-censored.}
#'   \item{treat}{Treatment: 1 = placebo, 2 = thiotepa.}
#'   \item{init}{Initial number of tumours.}
#'   \item{size}{Diameter of the largest initial tumour, in cm.}
#' }
#'
#' @details
#' The trial was conducted by the Veterans Administration Cooperative
#' Urological Research Group. Superficial tumours were removed transurethrally
#' before randomisation. The original data set in Andrews and Herzberg (1985)
#' contains the times to up to nine recurrences; the file here keeps only the
#' time to the first recurrence (47 recurrences).
#'
#' The appendix suggests a Cox model for `init` and `size`, an assessment of the
#' treatment effect after adjustment, a test of interaction, model-checking
#' diagnostics, a test of proportional hazards for treatment using a
#' time-dependent variable, and a comparison with a Weibull proportional
#' hazards model.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Appendix B.2 (Table B.2). Data from Andrews
#'   and Herzberg (1985).
#'
#' @examples
#' str(bladder)
#' survival::coxph(
#'   survival::Surv(time, status) ~ init + size + treat,
#'   data = bladder
#' )
"bladder"

#' Recurrence of mammary tumours in female rats
#'
#' Times from randomisation to the development of mammary tumours for 48 female
#' rats, treated with a retinoid or a control, in recurrent-event form (Collett,
#' 2023, Example 13.2).
#'
#' @format A data frame with 254 rows and 4 variables:
#' \describe{
#'   \item{rat}{Rat number (1-48).}
#'   \item{treatment}{Treatment: 0 = control, 1 = retinoid prophylaxis.}
#'   \item{time}{Time from randomisation to a detected tumour, in days, or to
#'     censoring.}
#'   \item{status}{Event indicator: 1 = tumour detected, 0 = right-censored.}
#' }
#'
#' @details
#' All rats were injected with a carcinogen and the 48 rats that were tumour
#' free after 60 days were randomised to retinoid or control. Rats were
#' examined twice weekly and the observation period ended 122 days after
#' randomisation. Because several tumours could be found at the same
#' assessment, tied times have been broken by adding 0.1 and 0.2 days, so
#' `time` is not always a whole number. There are 23 treated and 25 control
#' rats, 212 detected tumours in total, and only two rats never developed a
#' tumour.
#'
#' The data are used for multiple-event and event-history models: the
#' Andersen-Gill, PWP and WLW models, with the data expanded into counting
#' process format (Example 13.2; see also [cirrhosis_cp] for a simpler
#' counting process illustration).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 13.2 (Table 13.2). Data from Gail,
#'   Santner and Brown (1980).
#'
#' @examples
#' str(rats)
#' table(rats$treatment)
"rats"

#' Clinical trial of tamoxifen in breast cancer patients
#'
#' Time-to-event data for five different endpoints in 641 women from a
#' randomised trial of tamoxifen alone versus tamoxifen plus radiotherapy
#' (Collett, 2023, Example 13.3).
#'
#' @format A data frame with 641 rows and 18 variables:
#' \describe{
#'   \item{id}{Patient identifier.}
#'   \item{treat}{Treatment: 0 = tamoxifen plus radiotherapy, 1 = tamoxifen
#'     alone.}
#'   \item{age}{Age of the patient in years.}
#'   \item{size}{Tumour size in cm.}
#'   \item{hist}{Tumour histology: 1 = ductal, 2 = lobular, 3 = medullary,
#'     4 = mixed, 5 = other.}
#'   \item{hr}{Hormone receptor level: 0 = negative, 1 = positive.}
#'   \item{hb}{Haemoglobin level in g/l.}
#'   \item{andis}{Axillary node dissection: 0 = no, 1 = yes.}
#'   \item{lsurv}{Time to local relapse or last follow-up.}
#'   \item{ls}{Local relapse: 0 = no, 1 = yes.}
#'   \item{asurv}{Time to axillary relapse or last follow-up.}
#'   \item{as}{Axillary relapse: 0 = no, 1 = yes.}
#'   \item{dsurv}{Time to distant relapse or last follow-up.}
#'   \item{ds}{Distant relapse: 0 = no, 1 = yes.}
#'   \item{msurv}{Time to second malignancy or last follow-up.}
#'   \item{ms}{Second malignancy: 0 = no, 1 = yes.}
#'   \item{tsurv}{Time from randomisation to death or last follow-up.}
#'   \item{ts}{Status at last follow-up: 0 = alive, 1 = dead.}
#' }
#'
#' @details
#' The women were randomised to tamoxifen alone or with radiotherapy; 320
#' received tamoxifen plus radiotherapy and 321 tamoxifen alone. Each of the
#' five endpoints has its own time and indicator, and the times are censored at
#' the last date the woman was known to be alive. For women who relapsed after
#' the start of follow-up the relevant indicator switches from 0 to 1.
#'
#' The example was used by Pintilie (2006) to illustrate the WLW model for
#' multiple events. Because a woman can experience more than one of the five
#' event types, the data are rearranged into one row per possible event per
#' woman before fitting the model (Example 13.3).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 13.3 (Table 13.5). Data from Fyles et
#'   al. (2004) and Pintilie (2006).
#'
#' @examples
#' str(tamoxifen)
#' table(tamoxifen$treat)
#' survival::survfit(survival::Surv(tsurv, ts) ~ treat, data = tamoxifen)
"tamoxifen"

#' Patient outcome following bone marrow transplantation
#'
#' Data from 2204 leukaemia patients who received a bone marrow transplant,
#' with times to platelet recovery and to relapse or death (Collett, 2023,
#' Example 13.4).
#'
#' @format A data frame with 2204 rows and 9 variables:
#' \describe{
#'   \item{id}{Patient identifier.}
#'   \item{leukaemia}{Disease type: `"AML"`, `"ALL"` or `"CML"`.}
#'   \item{age}{Age group: `"<=20"`, `"21-40"` or `">40"`.}
#'   \item{match}{Donor-recipient gender match: 0 = no, 1 = yes.}
#'   \item{tcell}{T-cell depletion: 0 = no, 1 = yes.}
#'   \item{ptime}{Time from transplantation to platelet recovery, in days.}
#'   \item{pcens}{Platelet recovery indicator: 0 = censored, 1 = recovery.}
#'   \item{rdtime}{Time from transplantation to relapse or death, in days.}
#'   \item{rdcens}{Relapse-or-death indicator: 0 = censored, 1 = event.}
#' }
#'
#' @details
#' The data come from the European Group for Blood and Marrow Transplantation
#' (EBMT) Registry, and are the version used by Putter, Fiocco and Geskus
#' (2007). Following the transplant a patient may either recover platelet
#' function and later relapse or die, or relapse or die before platelet
#' recovery. The data therefore describe a three-state model with transition
#' rates for transplantation to platelet recovery, transplantation to relapse
#' or death, and platelet recovery to relapse or death.
#'
#' Of the 2204 patients, 1169 experienced platelet recovery and 458 relapsed
#' or died before their platelet count had returned to normal; a further 383
#' patients relapsed or died after platelet recovery. Note that the `ptime`
#' of a patient who relapsed before recovering platelets is censored at the
#' time of relapse when the first transition is modelled. To fit the model the
#' data are expanded into one row per possible transition per patient
#' (Example 13.4).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 13.4 (Table 13.9). Data from the EBMT
#'   Registry, see Putter, Fiocco and Geskus (2007).
#'
#' @examples
#' str(bmt_outcome)
#' table(bmt_outcome$leukaemia, bmt_outcome$age)
"bmt_outcome"

#' Survival of liver transplant recipients
#'
#' Graft survival times of 1761 adult liver transplant recipients, with the
#' cause of graft failure (Collett, 2023, Example 12.1).
#'
#' @format A data frame with 1761 rows and 7 variables:
#' \describe{
#'   \item{patient}{Patient number (1-1761).}
#'   \item{age}{Age of the patient in years.}
#'   \item{gender}{Gender: 1 = male, 2 = female.}
#'   \item{disease}{Primary liver disease: 1 = primary biliary cirrhosis
#'     (PBC), 2 = primary sclerosing cholangitis (PSC), 3 = alcoholic liver
#'     disease (ALD).}
#'   \item{time}{Time from transplantation to graft failure, death or last
#'     follow-up, in days.}
#'   \item{status}{Event indicator: 1 = graft failure or death, 0 =
#'     right-censored.}
#'   \item{cof}{Cause of graft failure: 0 = functioning graft (censored),
#'     1 = rejection, 2 = thrombosis, 3 = recurrent disease, 4 = other.}
#' }
#'
#' @details
#' The patients had a first elective transplant with an organ from a deceased
#' donor between January 2000 and December 2010 and were followed up to the end
#' of 2012. In the book there are 261 graft failures among the 1761 patients,
#' and an additional 211 patients die with a functioning graft; the failure
#' times of the latter group are censored at death. In the distributed file
#' `status` is 1 for 265 patients while `cof` is non-zero for 260, so the two
#' indicators are not perfectly consistent.
#'
#' The data are the main illustration of competing risks: the cumulative
#' incidence of each cause of graft failure, cause-specific hazard models and
#' the subdistribution approach (Examples 12.1-12.6). See [liver_wait] for the
#' waiting-list data from the same registry.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 12.1 (Table 12.1). Data from the UK
#'   Transplant Registry.
#'
#' @examples
#' str(liver)
#' table(liver$cof)
#' survival::survfit(
#'   survival::Surv(time, factor(cof)) ~ 1,
#'   data = liver
#' )
"liver"

#' Survival of laboratory mice with competing causes of death
#'
#' Survival times and causes of death for 181 irradiated mice, reared in a
#' standard or a germ-free environment (Collett, 2023, Example 12.7).
#'
#' @format A data frame with 181 rows and 3 variables:
#' \describe{
#'   \item{environment}{Rearing environment: 1 = standard, 2 = germ-free.}
#'   \item{causeofdeath}{Cause of death: 1 = thymic lymphoma, 2 = reticulum
#'     cell sarcoma, 3 = other causes.}
#'   \item{time}{Survival time in days.}
#' }
#'
#' @details
#' The mice were RFM strain males, a strain susceptible to tumour development
#' after exposure to ionising radiation, and were given 300 rads at five or six
#' weeks of age. An autopsy established the cause of death for every mouse.
#' There is no censoring. There are 99 mice in the standard environment (22
#' deaths from thymic lymphoma, 38 from reticulum cell sarcoma and 39 from
#' other causes) and 82 in the germ-free environment (29, 15 and 38).
#'
#' The data illustrate estimation of the cumulative incidence function for each
#' cause and cause-specific Cox regression (Example 12.7).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 12.7 (Table 12.7). Data first
#'   described by Hoel (1972).
#'
#' @examples
#' str(mice)
#' table(mice$environment, mice$causeofdeath)
"mice"

#' Survival following kidney transplantation
#'
#' Transplant survival times of 434 kidney recipients, where the two kidneys of
#' a donor may have been transplanted into two different recipients (Collett,
#' 2023, Example 10.4).
#'
#' @format A data frame with 434 rows and 7 variables:
#' \describe{
#'   \item{patient}{Patient number (1-434).}
#'   \item{donor}{Donor number (1-270). Recipients of kidneys from the same
#'     donor share this value.}
#'   \item{time}{Transplant survival time in days; the earlier of graft failure
#'     and death with a functioning graft.}
#'   \item{status}{Event indicator: 1 = transplant failure, 0 = right-censored.}
#'   \item{age}{Age of the recipient in years.}
#'   \item{diabetes}{Diabetes status: 0 = absent, 1 = present.}
#'   \item{cit}{Cold ischaemic time, in hours, between retrieval of the kidney
#'     and transplantation.}
#' }
#'
#' @details
#' The transplants used organs from deceased donors following circulatory
#' death. Of the 270 donors, 106 gave one kidney and 164 gave both, so many
#' recipients are clustered within donors and their survival times are likely
#' to be correlated; there are 71 failures. The example fits Weibull models
#' with and without a shared frailty effect for the donor (Example 10.4).
#'
#' See [kidney_centres] for transplant survival in eight centres, a
#' centre-level analogue of the same problem.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 10.4 (Table 10.5). Data from the UK
#'   Transplant Registry.
#'
#' @examples
#' str(kidney)
#' length(unique(kidney$donor))
"kidney"

#' Comparisons between kidney transplant centres
#'
#' Transplant survival times of 1439 kidney recipients in eight UK transplant
#' centres (Collett, 2023, Example 11.4).
#'
#' @format A data frame with 1439 rows and 9 variables:
#' \describe{
#'   \item{patient}{Patient identifier.}
#'   \item{centre}{Transplant centre (1-8).}
#'   \item{tsurv}{Transplant survival time in days.}
#'   \item{tcens}{Event indicator: 1 = transplant failure, 0 = right-censored.}
#'   \item{dage}{Age of the donor in years.}
#'   \item{dtype}{Donor type: 0 = donation after brain death (DBD), 1 =
#'     donation after circulatory death (DCD).}
#'   \item{rage}{Age of the recipient in years.}
#'   \item{diab}{Diabetic status of the recipient: 0 = absent, 1 = present.}
#'   \item{cit}{Cold ischaemic time, in hours.}
#' }
#'
#' @details
#' The data cover transplants with organs from deceased donors performed
#' between January 2009 and December 2011. Transplant survival is the earlier
#' of graft failure and patient death, and there are 206 failures. One
#' recipient (patient 7) had a kidney that never functioned, so `tsurv` is 0.
#'
#' The data are used to compare centre-specific one-year failure rates, both
#' unadjusted and risk-adjusted through a Cox model, and to estimate
#' centre-specific rates with fixed and random effects (Examples 11.4-11.8).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 11.4 (Table 11.4). Data from the UK
#'   Transplant Registry.
#'
#' @examples
#' str(kidney_centres)
#' table(kidney_centres$centre)
#' survival::coxph(
#'   survival::Surv(tsurv, tcens) ~ dage + dtype + rage + diab + cit,
#'   data = kidney_centres
#' )
"kidney_centres"

#' Survival of patients registered for a lung transplant
#'
#' Survival times from registration for a lung transplant for 196 UK patients
#' (Collett, 2023, Example 10.3).
#'
#' @format A data frame with 196 rows and 7 variables:
#' \describe{
#'   \item{patient}{Patient identifier.}
#'   \item{time}{Survival time in days from registration for a transplant.}
#'   \item{status}{Event indicator: 1 = death, 0 = right-censored.}
#'   \item{age}{Age at registration in years.}
#'   \item{gender}{Gender: 1 = male, 2 = female.}
#'   \item{bmi}{Body mass index at registration.}
#'   \item{disease}{Primary disease: 1 = COPD, 2 = fibrosis, 3 = suppurative
#'     disease, 4 = other.}
#' }
#'
#' @details
#' The patients were registered in 2004 and survival is measured from
#' registration to death regardless of any intervening transplantation; 123 of
#' the 196 patients died. Times are censored at removal from the list, at the
#' last known follow-up date, or at 30 April 2012 for patients still alive.
#' The disease codings above follow the values in the distributed file (they
#' can be checked against Table 10.2 of the book).
#'
#' The example compares a Weibull model with and without an individual
#' lognormal frailty term (Example 10.3). See [kidney] for a shared frailty
#' example and [liver_wait] for a similar waiting-list cohort.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 10.3 (Table 10.2). Data from the UK
#'   Transplant Registry.
#'
#' @examples
#' str(lung_transplant)
#' survival::coxph(
#'   survival::Surv(time, status) ~ age + gender + bmi + factor(disease),
#'   data = lung_transplant
#' )
"lung_transplant"

#' Survival of patients with gastric cancer
#'
#' Survival times, in days, of 90 patients with locally advanced gastric
#' cancer, randomised to chemotherapy alone or chemotherapy plus radiotherapy
#' (Collett, 2023, Example 11.2).
#'
#' @format A data frame with 90 rows and 4 variables:
#' \describe{
#'   \item{patient}{Patient number (1-90).}
#'   \item{time}{Time from randomisation to death from gastric cancer, in
#'     days.}
#'   \item{status}{Event indicator: 1 = death from gastric cancer, 0 =
#'     right-censored.}
#'   \item{treat}{Treatment: 0 = chemotherapy alone, 1 = chemotherapy plus
#'     radiotherapy.}
#' }
#'
#' @details
#' The trial was carried out by the Gastrointestinal Tumor Study Group; the
#' patients were followed for over eight years. There are 82 deaths. The
#' estimated survivor functions cross, so the proportional hazards assumption
#' is not tenable and the data are used to motivate non-proportional hazards:
#' the log-cumulative hazard plot, the restricted mean survival time and
#' time-dependent effects (Examples 11.2 and 11.3).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 11.2 (Table 11.2). Data from Stablein
#'   and Koutrouvelis (1985).
#'
#' @examples
#' str(gastric)
#' survival::survfit(survival::Surv(time, status) ~ treat, data = gastric)
"gastric"

#' Health evaluation and linkage to primary care
#'
#' Time from randomisation to linkage to primary care for 447 patients in a
#' residential detoxification programme, in the HELP study (Collett, 2023,
#' Example 16.7).
#'
#' @format A data frame with 447 rows and 7 variables:
#' \describe{
#'   \item{subject}{Patient identifier.}
#'   \item{days}{Time from randomisation to linkage to primary care, in days.}
#'   \item{status}{Event indicator: 1 = linked to primary care, 0 =
#'     censored.}
#'   \item{age}{Age of the patient in years.}
#'   \item{gender}{Gender: 0 = female, 1 = male.}
#'   \item{housing}{Housing status: 0 = homeless, 1 = housed.}
#'   \item{linkage}{Assistance from the HELP clinic in linking to primary
#'     care: 0 = no, 1 = yes.}
#' }
#'
#' @details
#' Patients undergoing detoxification for alcohol, heroin or cocaine who had no
#' primary care physician were randomised to help from a HELP clinic or to no
#' such help. The response is the number of days until linkage to primary care,
#' and there are 167 events. The file is the complete-case version of the
#' `HELPmiss` data set in the mosaicData package.
#'
#' The example is the running illustration of Bayesian survival analysis: a
#' Bayesian Weibull model and a piecewise exponential model (Example 16.7).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 16.7 (Tables 16.1 and 16.2). Data from
#'   Samet et al. (2003); see also the mosaicData package.
#'
#' @examples
#' str(help)
#' survival::survfit(survival::Surv(days, status) ~ linkage, data = help)
"help"

#' Time to death while waiting for a liver transplant
#'
#' Time from registration to death on the waiting list for 281 adults with
#' primary biliary cirrhosis (Collett, 2023, Example 14.1).
#'
#' @format A data frame with 281 rows and 7 variables:
#' \describe{
#'   \item{patient}{Patient identifier.}
#'   \item{time}{Time from registration to death on the waiting list, in
#'     days.}
#'   \item{status}{Event indicator: 1 = died while waiting, 0 = censored
#'     (usually at transplantation).}
#'   \item{age}{Age of the patient in years.}
#'   \item{gender}{Gender: 0 = female, 1 = male.}
#'   \item{bmi}{Body mass index, in kg/m squared.}
#'   \item{ukeld}{UK end-stage liver disease score; higher values indicate
#'     more severe disease.}
#' }
#'
#' @details
#' The patients were first registered for a liver transplant in the five years
#' from 1 January 2006, and there are 64 deaths. The time of a patient who
#' receives a transplant is censored at transplantation. Livers are allocated
#' on the basis of need, so the time to transplantation (censoring) is
#' associated with the time to death; the data are used to illustrate
#' sensitivity analysis for dependent censoring and inverse probability of
#' censoring weighting (Examples 14.1 and 14.3). The rows are ordered by
#' survival time.
#'
#' See [liver] for the post-transplant graft survival data from the same
#' registry.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Example 14.1 (Table 14.1). Data from the UK
#'   Transplant Registry.
#'
#' @examples
#' str(liver_wait)
#' survival::coxph(
#'   survival::Surv(time, status) ~ age + gender + bmi + ukeld,
#'   data = liver_wait
#' )
"liver_wait"

#' Bone marrow transplantation in leukaemia patients
#'
#' Survival times, in days, of 37 leukaemia patients who received a bone marrow
#' transplant, together with donor and recipient variables (Collett, 2023,
#' Appendix B.4).
#'
#' @format A data frame with 37 rows and 9 variables:
#' \describe{
#'   \item{patient}{Patient number (1-37).}
#'   \item{time}{Survival time in days.}
#'   \item{status}{Event indicator: 1 = death, 0 = alive.}
#'   \item{rage}{Age of the recipient in years.}
#'   \item{dage}{Age of the donor in years.}
#'   \item{type}{Type of leukaemia: 1 = AML, 2 = ALL, 3 = CML.}
#'   \item{preg}{Whether the donor had previously been pregnant: 0 = no,
#'     1 = yes.}
#'   \item{index}{Index of mixed epidermal lymphocyte reactions.}
#'   \item{gvhd}{Graft-versus-host disease: 0 = no, 1 = yes.}
#' }
#'
#' @details
#' The 37 patients were in complete remission from AML or ALL, or in the
#' chronic phase of CML, and received a non-depleted allogeneic bone marrow
#' transplant. There are 17 deaths. The data were also given in Altman (1991).
#'
#' The appendix suggests fitting a Weibull accelerated failure time model,
#' estimating and plotting the baseline survivor function, comparing with
#' log-logistic and lognormal models and with a Cox model, and checking the
#' adequacy of the preferred model. See [bmt_leukaemia] (a different study of
#' 23 patients) and [bmt_outcome] (EBMT registry data).
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Appendix B.4 (Table B.4). Data from Bagot et
#'   al. (1988) and Altman (1991).
#'
#' @examples
#' str(bmt)
#' survival::coxph(
#'   survival::Surv(time, status) ~ rage + dage + factor(type) + gvhd,
#'   data = bmt
#' )
"bmt"

#' Chronic active hepatitis
#'
#' Survival times, in months, of 44 patients with chronic active hepatitis,
#' randomised to prednisolone or to an untreated control group (Collett, 2023,
#' Appendix B.1).
#'
#' @format A data frame with 44 rows and 3 variables:
#' \describe{
#'   \item{treatment}{Treatment: 1 = prednisolone, 2 = control.}
#'   \item{time}{Survival time in months from admission to the trial.}
#'   \item{status}{Event indicator: 1 = death, 0 = right-censored.}
#' }
#'
#' @details
#' The data were originally reported by Kirk et al. (1980) and given in Pocock
#' (1983); there are 27 deaths. The trial is used in Chapter 15 as the worked
#' example for sample size calculation: with five-year survival of 0.41 under
#' the standard treatment and 0.60 under the new treatment, the number of
#' events required by Schoenfeld's formula is about 140, corresponding to
#' roughly 400 patients (Examples 15.1-15.3). The appendix also suggests
#' survival curves by treatment, the log-rank and Wilcoxon tests, Cox and
#' Weibull models and a log-cumulative hazard plot.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Appendix B.1 (Table B.1) and Examples
#'   15.1-15.3. Data from Kirk et al. (1980) via Pocock (1983).
#'
#' @examples
#' str(hepatitis)
#' survival::survfit(survival::Surv(time, status) ~ treatment, data = hepatitis)
"hepatitis"

#' Survival of black ducks
#'
#' Survival times, in days, of 50 female black ducks captured and fitted with
#' radios (Collett, 2023, Appendix B.3).
#'
#' @format A data frame with 50 rows and 6 variables:
#' \describe{
#'   \item{duck}{Duck number (1-50).}
#'   \item{time}{Survival time in days.}
#'   \item{status}{Event indicator: 1 = dead, 0 = alive or missing.}
#'   \item{age}{Age group: 0 = hatch-year bird, 1 = bird aged at least one
#'     year.}
#'   \item{weight}{Body weight in g.}
#'   \item{length}{Wing length in mm.}
#' }
#'
#' @details
#' Fifty female ducks from two locations in New Jersey were captured between 8
#' November and 14 December 1983 and their status was recorded daily until the
#' study ended on 15 February 1984; there are 18 deaths. The data are included
#' in Hand et al. (1994).
#'
#' The appendix suggests a proportional hazards model for age, weight and
#' length, a test of whether the coefficients of weight and length differ
#' between age groups, and an assessment of whether non-linear functions of
#' weight and length are needed.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Appendix B.3 (Table B.3). Data from Hand et
#'   al. (1994); the study was conducted by the US Fish and Wildlife Service.
#'
#' @examples
#' str(ducks)
#' survival::coxph(
#'   survival::Surv(time, status) ~ age + weight + length,
#'   data = ducks
#' )
"ducks"

#' Chronic granulomatous disease
#'
#' Time to the first serious infection for 128 patients with chronic
#' granulomatous disease (CGD) in a multicentre trial (Collett, 2023, Appendix
#' B.5).
#'
#' @format A data frame with 128 rows and 12 variables:
#' \describe{
#'   \item{patient}{Patient number (1-128).}
#'   \item{time}{Time to the first serious infection, in days.}
#'   \item{status}{Event indicator: 1 = infection, 0 = censored.}
#'   \item{centre}{Trial centre (1-14; centre 8 does not occur in these
#'     data).}
#'   \item{treat}{Treatment: 0 = placebo, 1 = interferon.}
#'   \item{age}{Age in years.}
#'   \item{sex}{Sex: 1 = male, 2 = female.}
#'   \item{height}{Height in cm.}
#'   \item{weight}{Weight in kg.}
#'   \item{pattern}{Pattern of inheritance: 1 = X-linked, 2 = autosomal
#'     recessive.}
#'   \item{cort}{Use of corticosteroids at trial entry: 1 = used, 2 = not
#'     used.}
#'   \item{anti}{Use of antibiotics at trial entry: 1 = used, 2 = not used.}
#' }
#'
#' @details
#' CGD is a group of inherited disorders that leave patients vulnerable to
#' recurrent infections. The trial compared the antiviral drug interferon with
#' placebo, and the endpoint is the time to the first serious infection after
#' randomisation; there are 44 infections. The data were described by Therneau
#' and Grambsch (2000); this is the 128-patient version used in the book.
#'
#' The appendix suggests a wide range of analyses: model selection and model
#' checking, consistency of the treatment effect across centres, a
#' constructed interval-censored version of the data, shared frailty models
#' with centre as a random effect, risk-adjusted centre-specific infection
#' rates, and an inverse probability of censoring weighting analysis for
#' dependent censoring. The infection data are also available, in a larger
#' form, as `cgd` in the survival package.
#'
#' @source Collett, D. (2023) *Modelling Survival Data in Medical Research*,
#'   4th ed. Chapman & Hall/CRC, Appendix B.5. Data described by Therneau and
#'   Grambsch (2000); the trial was carried out by Genentech, Inc.
#'
#' @examples
#' str(cgd)
#' survival::coxph(survival::Surv(time, status) ~ treat + age + sex, data = cgd)
"cgd"

# Data set that does not come from the book ---------------------------------
#
# The data set below is used in the computer exercise on survival analysis. It
# does not accompany Collett (2023) and is documented separately, with its own
# source, so that the distinction is visible in the help pages and in the
# package index.

#' Synthetic Scottish metastatic breast cancer cohort
#'
#' A cohort of 850 patients diagnosed with metastatic breast cancer, used in the
#' computer exercise on survival analysis. The data are **not** from Collett
#' (2023); they come from the teaching material of the Edinburgh Cancer
#' Informatics group, which is redistributed here (see Source).
#'
#' @format A data frame with 850 rows and 21 variables:
#' \describe{
#'   \item{patient_id}{Patient identifier, `MBC0001` to `MBC0850`.}
#'   \item{health_board}{NHS Health Board of the treating centre, one of the 14
#'     Scottish boards.}
#'   \item{age_at_diagnosis}{Age at diagnosis of metastatic disease, in years.}
#'   \item{sex}{Sex of the patient.}
#'   \item{simd_quintile}{Scottish Index of Multiple Deprivation quintile, 1
#'     (most deprived) to 5 (least deprived).}
#'   \item{ecog_ps}{ECOG performance status at baseline: 0 (best) to 3 (worst).}
#'   \item{er_status}{Oestrogen receptor status: `Positive` or `Negative`.}
#'   \item{pr_status}{Progesterone receptor status: `Positive` or `Negative`.}
#'   \item{her2_status}{HER2 status: `Positive` or `Negative`.}
#'   \item{n_metastatic_sites}{Number of metastatic sites at diagnosis.}
#'   \item{bone_mets, liver_mets, lung_mets, brain_mets}{Metastatic involvement
#'     of bone, liver, lung and brain: `Yes` or `No`.}
#'   \item{presentation}{`De novo metastatic` or `Recurrent` disease.}
#'   \item{diagnosis_date}{Date of diagnosis of metastatic disease.}
#'   \item{first_line_treatment}{First-line treatment.}
#'   \item{observed_time}{Follow-up time in months from diagnosis to death or
#'     censoring.}
#'   \item{status}{Event indicator: 1 = death, 0 = right-censored.}
#'   \item{age_group}{Age group at diagnosis: `<50`, `50-64`, `65-74` or `75+`.}
#'   \item{hormone_receptor}{Hormone receptor status: `HR-positive` or
#'     `HR-negative`, derived from `er_status` and `pr_status`.}
#' }
#'
#' @details
#' The time origin is the date of diagnosis of metastatic breast cancer and the
#' time scale is time since diagnosis, in months. The event of interest is death
#' from any cause; patients who were alive at the end of follow-up are
#' right-censored. Of the 850 patients, 703 died and 147 (17.3 %) were censored,
#' and the observed follow-up times range from 0.5 to 71.2 months. The patients
#' were diagnosed between 5 January 2018 and 28 December 2022.
#'
#' The cohort is **entirely synthetic**. It was generated for teaching purposes
#' and contains no real patient data, but it was designed to reproduce realistic
#' patterns of metastatic breast cancer in Scotland. The code that generated it,
#' together with a longer walk-through of the same cohort, is part of the
#' tutorial by the Edinburgh Cancer Informatics group that is cited under
#' Source.
#'
#' Compared with the data sets from Collett (2023), two columns are stored in a
#' slightly different form: `status` is an integer and `diagnosis_date` a `Date`,
#' so that the object matches the other data sets in the package. Otherwise the
#' file is used as distributed.
#'
#' @source The file `scottish_mbc_cohort.xlsx` in the `onco-stats` repository of
#'   the Edinburgh Cancer Informatics group,
#'   <https://github.com/Edinburgh-Cancer-Informatics/onco-stats/tree/main/docs/data>,
#'   redistributed under the MIT licence of that repository (Copyright (c) 2025
#'   Edinburgh-Cancer-Informatics). See also *Survival Analysis in R: A
#'   Practical Tutorial*,
#'   <https://edinburgh-cancer-informatics.github.io/onco-stats/tutorials/survival_analysis_tutorial.html>,
#'   which documents the same cohort and the simulation that generated it.
#'
#' @examples
#' str(scottish_mbc_cohort)
#' survival::survfit(
#'   survival::Surv(observed_time, status) ~ hormone_receptor,
#'   data = scottish_mbc_cohort
#' )
"scottish_mbc_cohort"
