# sta310 0.1.0

* First release: the data sets from Collett (2023) and the teaching functions
  used in the STA310 lectures and computer exercises.
* Added the `scottish_mbc_cohort` data set, the synthetic Scottish metastatic
  breast cancer cohort that is used in the first computer exercise. It does not
  come from Collett (2023); its help page gives the source and licence.
* Added a "Getting started with sta310" vignette and a "Computer exercise 1:
  Survival analysis" vignette, in which the solution to every question is hidden
  behind a *Show solution* toggle.
* Added unit tests for all exported functions and for the structure of the data
  sets.
* `plot_km()` draws the confidence band as a step function, so that it follows
  the horizontal segments of the estimate instead of being interpolated between
  event times.
