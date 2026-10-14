
# sta310

`sta310` collects the data sets that accompany Collett (2023),
*Modelling Survival Data in Medical Research* (4th edition), together
with a small set of teaching functions that implement the estimators
used in the STA310 course at the University of Gothenburg from first
principles. The estimators are written so that the individual steps can
be inspected in the lectures and computer exercises, and they agree with
the established implementations in `survival` to within numerical
tolerance.

## Installation

The package lives in the `sta310/` directory of the course repository,
so `subdir` has to be given:

``` r
devtools::install_github("eriklgb/STA310", subdir = "sta310")
```

## Data sets

All 33 data sets from the book are available under the object names used
in the course material, with the original column names, and each of them
has a help page with the background of the study, the coded variables
and the relevant examples in Collett (2023):

``` r
library(sta310)
data(package = "sta310")$results[, "Item"]
#>  [1] "aortic"                 "bladder"                "bmt"                   
#>  [4] "bmt_leukaemia"          "bmt_outcome"            "breast"                
#>  [7] "breast_rfs"             "cgd"                    "cirrhosis"             
#> [10] "cirrhosis_cp"           "cirrhosis_lbr"          "dialysis"              
#> [13] "ducks"                  "gastric"                "help"                  
#> [16] "hepatitis"              "hyper"                  "iud"                   
#> [19] "kidney"                 "kidney_centres"         "liver"                 
#> [22] "liver_wait"             "lung_transplant"        "melanoma"              
#> [25] "mice"                   "myeloma"                "numerical_illustration"
#> [28] "ovarian"                "prostate"               "pulmonary"             
#> [31] "rats"                   "scottish_mbc_cohort"    "tamoxifen"             
#> [34] "ulcer"
```

The package also ships `scottish_mbc_cohort`, the synthetic Scottish
metastatic breast cancer cohort used in the first computer exercise. It
is **not** from the book: it comes from the teaching material of the
Edinburgh Cancer Informatics group, and that is what its help page
documents (`?scottish_mbc_cohort`).

Note that six of the names are also used by the `survival` package, for
data sets that are not the same: `bladder`, `cgd`, `kidney`, `myeloma`,
`ovarian` and `rats`. Attach `sta310` last, or use `sta310::myeloma`, if
both packages are attached.

``` r
iud
#>    time status
#> 1    10      1
#> 2    13      0
#> 3    18      0
#> 4    19      1
#> 5    23      0
#> 6    30      1
#> 7    36      1
#> 8    38      0
#> 9    54      0
#> 10   56      0
#> 11   59      1
#> 12   75      1
#> 13   93      1
#> 14   97      1
#> 15  104      0
#> 16  107      1
#> 17  107      0
#> 18  107      0
```

## Teaching functions

- `km_estimate()` and `plot_km()`: the Kaplan-Meier estimator with
  Greenwood standard errors, and a plot of it.
- `cox_fit()`: Cox regression fitted by Newton-Raphson, with Breslow or
  Efron handling of ties.
- `emp_hazard()`: empirical, piecewise constant hazard estimates.
- `n_events_logrank()`, `power_logrank()` and `power_logrank_sim()`:
  sample size, power and simulation for the log-rank test.
- `cif_cause_specific()`: cumulative incidence functions from
  cause-specific Cox models.

## Example

`km_estimate()` returns the risk sets, the events and censorings, the
survivor function and its standard error at each event time:

``` r
km <- km_estimate(iud$time, iud$status)
km
#>    time n_risk n_event n_censor  survival  std_error      lower     upper
#> 1     0     18       0        0 1.0000000 0.00000000 1.00000000 1.0000000
#> 2    10     18       1        0 0.9444444 0.05399030 0.83862541 1.0000000
#> 3    19     15       1        0 0.8814815 0.07898919 0.72666551 1.0000000
#> 4    30     13       1        0 0.8136752 0.09777700 0.62203581 1.0000000
#> 5    36     12       1        0 0.7458689 0.11067019 0.52895935 0.9627785
#> 6    59      8       1        0 0.6526353 0.13031975 0.39721332 0.9080573
#> 7    75      7       1        0 0.5594017 0.14116728 0.28271893 0.8360845
#> 8    93      6       1        0 0.4661681 0.14519912 0.18158304 0.7507531
#> 9    97      5       1        0 0.3729345 0.14299297 0.09267341 0.6531955
#> 10  107      3       1        2 0.2486230 0.13924720 0.00000000 0.5215425
```

`cox_fit()` reproduces `survival::coxph()` on the same data:

``` r
fit <- cox_fit(myeloma$time, myeloma$status, myeloma[, c("age", "bun")])
ref <- survival::coxph(survival::Surv(time, status) ~ age + bun, data = myeloma)
cbind(cox_fit = coef(fit), coxph = coef(ref))
#>           cox_fit         coxph
#> age -0.0001542319 -0.0001542319
#> bun  0.0201535963  0.0201535963
```

See `vignette("sta310")` for a walk-through of the data sets and the
teaching functions, and `vignette("cs1-survival-analysis")` for the
first computer exercise, which has the solutions to all its questions
hidden behind *Show solution*. Both are HTML documents.

## Course material

The lectures, exercises and labs that use this package are part of the
same repository. Collett (2023) is the textbook for the course:

> Collett, D. (2023) *Modelling Survival Data in Medical Research*, 4th
> ed. Chapman & Hall/CRC.
