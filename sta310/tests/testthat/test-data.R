test_that("all documented data sets are available", {
  items <- data(package = "sta310")$results[, "Item"]
  expected <- c(
    "aortic",
    "bladder",
    "bmt",
    "bmt_leukaemia",
    "bmt_outcome",
    "breast",
    "breast_rfs",
    "cgd",
    "cirrhosis",
    "cirrhosis_cp",
    "cirrhosis_lbr",
    "dialysis",
    "ducks",
    "gastric",
    "help",
    "hepatitis",
    "hyper",
    "iud",
    "kidney",
    "kidney_centres",
    "liver",
    "liver_wait",
    "lung_transplant",
    "melanoma",
    "mice",
    "myeloma",
    "numerical_illustration",
    "ovarian",
    "prostate",
    "pulmonary",
    "rats",
    "scottish_mbc_cohort",
    "tamoxifen",
    "ulcer"
  )

  expect_setequal(items, expected)
  expect_length(items, 34L)
})

test_that("the synthetic Scottish MBC cohort has the structure used in the exercise", {
  expect_identical(dim(scottish_mbc_cohort), c(850L, 21L))
  expect_identical(sum(scottish_mbc_cohort$status), 703L)
  expect_identical(sort(unique(scottish_mbc_cohort$status)), c(0L, 1L))
  expect_s3_class(scottish_mbc_cohort$diagnosis_date, "Date")
  expect_identical(
    sort(unique(scottish_mbc_cohort$hormone_receptor)),
    c("HR-negative", "HR-positive")
  )
  expect_gte(min(scottish_mbc_cohort$observed_time), 0)
})

test_that("the data sets have the structure used in the course", {
  expect_identical(dim(iud), c(18L, 2L))
  expect_identical(names(iud), c("time", "status"))
  expect_identical(dim(myeloma), c(48L, 10L))
  expect_identical(dim(bmt_leukaemia), c(23L, 8L))
  expect_identical(dim(liver), c(1761L, 7L))
  expect_identical(dim(ovarian), c(26L, 7L))
  expect_identical(dim(rats), c(254L, 4L))
})

test_that("the event indicators used in the examples are complete", {
  expect_identical(sort(unique(iud$status)), c(0L, 1L))
  expect_identical(sort(unique(myeloma$status)), c(0L, 1L))
  expect_identical(sort(unique(liver$status)), c(0L, 1L))
  expect_gte(min(iud$time), 0)
  expect_gte(min(myeloma$time), 0)
})
