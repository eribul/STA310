# Intern inspiration — Broström och paketet `eha` (exponeras INTE för studenter)

Detta material används enbart som bakgrundsinspiration för läraren. Studenterna
exponeras endast för kursboken Collett och dess R-implementering (kap 17). Bygg
aldrig övnings- eller examinationsmaterial direkt på `eha`/Broström utan att först
översätta till Colletts framställning och R-verktyg.

## Broström-bok

- Broström, *Event History Analysis with R*, 2:a uppl. (CRC Press).
- Fil: `bostrom/bostrom_book_annotated.pdf` (annoterad). **Skannad utan textlager** — `pdftotext` ger inget; använd OCR eller tryckt TOC för kapiteldetaljer.

## R-paketet `eha` (v2.12.0)

Användbart som idékälla för exempel och datasetstrukturer. `eha` ligger nära Colletts
teman men är ett annat API än Colletts `survival`-baserade framställning.

### Dataset (data(package = "eha"))

| Dataset | Innehåll |
|---|---|
| `mort` | Manlig mortalitet, åldrar 40–60, 1800-tal |
| `oldmort` | Åldersmortalitet, Sundsvall, 1860–1880 |
| `scania` | Åldersmortalitet, Skåne, 1813–1894 |
| `child` | Barnmortalitet, Skellefteå, 1850–1900 |
| `infants` | Spädbarnsmortalitet och mödradöd, 1821–1894 |
| `fert` | Äktenskaplig fruktsamhet, 1800-tal |
| `logrye` | Rågpriser, Skåne, 1801–1894 |
| `male.mortality` | Manlig mortalitet 40–60, 1800-tal |
| `swedeaths` / `swepop` | Svenska döds-/befolkningsdata 1969–2020 |

### Viktiga funktioner

- Dataförberedelse: `Surv()`, `SurvSplit()`, `age.window()`, `cal.window()`, `toTime()`, `join.spells()`, `risksets()`
- Modeller: `coxreg()`, `phreg()`, `aftreg()`, `weibreg()`, `mlreg()`, `pchreg()`, `tpchreg()`
- Test/diagnostik: `logrank()`, `strata()`, `compHaz()`, `hazards()`, `plotHaz()`, `perstat()`
- Tabeller: `regtable()`, `ltx()`

Fullständig funktionslista: `help(package = "eha")`.

## Arbetskatalog `eha/`

- Git-repo utan commits: `.gitignore`, `.vscode/`, `README.md`, `test.R`.
- `test.R` testar eha-funktioner (`logrank`, `phreg`, `age.window`) med svenska kommentarer — enbart lärarens egna experiment, inte kursmaterial.
