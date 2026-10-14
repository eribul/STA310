# Build data/scottish_mbc_cohort.rda.
#
# This data set is NOT part of Collett (2023). It is the synthetic Scottish
# metastatic breast cancer cohort used in the computer exercises, taken from
# the teaching material of the Edinburgh Cancer Informatics group:
#
#   https://github.com/Edinburgh-Cancer-Informatics/onco-stats/tree/main/docs/data
#
# The file scottish_mbc_cohort.xlsx is redistributed here under the MIT licence
# of that repository (Copyright (c) 2025 Edinburgh-Cancer-Informatics). The
# cohort is entirely synthetic and contains no real patient data; the code that
# generated it is part of the accompanying tutorial,
# <https://edinburgh-cancer-informatics.github.io/onco-stats/tutorials/survival_analysis_tutorial.html>.
#
# The script needs the readxl package and is run from the package root:
#
#   Rscript data-raw/scottish_mbc_cohort.R
#
# The only changes made to the file are that the tibble is stored as a plain
# data frame, that the event indicator is stored as an integer and that the date
# of diagnosis is stored as a Date, so that the object matches the other data
# sets in the package.

xlsx <- file.path("data-raw", "scottish_mbc_cohort.xlsx")
if (!file.exists(xlsx)) {
  stop("Cannot find the data file: ", xlsx)
}

mbc <- as.data.frame(readxl::read_xlsx(xlsx))
mbc$diagnosis_date <- as.Date(mbc$diagnosis_date)
mbc$status <- as.integer(mbc$status)

scottish_mbc_cohort <- mbc
save(
  scottish_mbc_cohort,
  file = file.path("data", "scottish_mbc_cohort.rda"),
  compress = "xz"
)

str(scottish_mbc_cohort)
message(
  "Wrote data/scottish_mbc_cohort.rda (",
  nrow(scottish_mbc_cohort),
  " x ",
  ncol(scottish_mbc_cohort),
  "), diagnosed ",
  min(scottish_mbc_cohort$diagnosis_date),
  " to ",
  max(scottish_mbc_cohort$diagnosis_date)
)
