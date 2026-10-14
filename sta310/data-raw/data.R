# Build the data/*.rda files shipped with the sta310 package.
#
# Source: the folder "Data sets from Modelling Survival Data in Medical
# Research, 4th edition" (Collett, 2023, Chapman & Hall/CRC), distributed with
# the book. The folder lives next to the package inside the STA310 repository.
# Set the environment variable STA310_DAT_DIR to point somewhere else, then run
# from the package root:
#
#   Rscript data-raw/data.R
#
# The .dat files are whitespace separated with a header row, as read by
# read.table(header = TRUE). Column names are kept exactly as they appear in the
# files; the only cleaning done is to turn the missing-value marker "." in
# "Bone marrow transplantation in the treatment of leukaemia" into NA.

dat_dir <- Sys.getenv(
  "STA310_DAT_DIR",
  unset = file.path(
    "..",
    "Data sets from Modelling Survival Data in Medical Research, 4th edition"
  )
)
if (!dir.exists(dat_dir)) {
  stop("Cannot find the data folder: ", dat_dir)
}

# Object name (as used in the package) -> file name on disk.
datasets <- c(
  numerical_illustration = "A numerical illustration.dat",
  bmt_leukaemia = "Bone marrow transplantation in the treatment of leukaemia.dat",
  bmt = "Bone marrow transplantation.dat",
  ovarian = "Chemotherapy in ovarian cancer patients.dat",
  hepatitis = "Chronic active hepatitis.dat",
  cgd = "Chronic granulomatous disease.dat",
  tamoxifen = "Clinical trial of tamoxifen in breast cancer patients.dat",
  prostate = "Comparison of two treatments for prostatic cancer.dat",
  kidney_centres = "Comparisons between kidney transplant centres.dat",
  cirrhosis = "Data from a cirrhosis study (baseline).dat",
  cirrhosis_cp = "Data from a cirrhosis study (in counting process format).dat",
  cirrhosis_lbr = "Data from a cirrhosis study (lbr data).dat",
  help = "Health evaluation and linkage to primary care.dat",
  dialysis = "Infection in patients on dialysis.dat",
  bmt_outcome = "Patient outcome following bone marrow transplantation.dat",
  breast = "Prognosis for women with breast cancer.dat",
  pulmonary = "Pulmonary metastasis.dat",
  breast_rfs = "Recurrence free survival in breast cancer patients.dat",
  ulcer = "Recurrence of an ulcer.dat",
  bladder = "Recurrence of bladder cancer.dat",
  rats = "Recurrence of mammary tumours in female rats.dat",
  aortic = "Survival following aortic valve replacement.dat",
  kidney = "Survival following kidney transplantation.dat",
  ducks = "Survival of black ducks.dat",
  mice = "Survival of laboratory mice.dat",
  liver = "Survival of liver transplant recipients.dat",
  myeloma = "Survival of multiple myeloma patients.dat",
  lung_transplant = "Survival of patients registered for a lung transplant.dat",
  gastric = "Survival of patients with gastric cancer.dat",
  melanoma = "Survival times of patients with melanoma .dat",
  liver_wait = "Time to death while waiting for a liver transplant.dat",
  iud = "Time to discontinuation of the use of an IUD.dat",
  hyper = "Treatment of hypernephroma.dat"
)

read_collett <- function(file) {
  read.table(
    file.path(dat_dir, file),
    header = TRUE,
    na.strings = c("NA", ".")
  )
}

env <- new.env(parent = emptyenv())
for (nm in names(datasets)) {
  file <- datasets[[nm]]
  x <- read_collett(file)
  assign(nm, x, envir = env)
  save(
    list = nm,
    file = file.path("data", paste0(nm, ".rda")),
    envir = env,
    compress = "xz"
  )
  message(sprintf("%-20s <- %-62s %4d x %2d", nm, file, nrow(x), ncol(x)))
}

message("Wrote ", length(datasets), " data sets to data/.")
