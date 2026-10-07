---
name: sta310-course-planning
description: Stöd för planering av kursen STA310 Överlevnadsanalys (survival analysis) vid Göteborgs universitet. Innehåller kursplan, lärandemål, examinationsstruktur samt kapitelkarta för kursboken Collett "Modelling Survival Data in Medical Research". Använd vid planering av föreläsningar, datorövningar, seminarier, examination eller annat planeringsarbete för STA310.
---

# STA310 — Överlevnadsanalys (Survival Analysis)

Planeringsunderlag för STA310, 7,5 hp, Mastersprogrammet i tillämpad biostatistik
(M2STA), Göteborgs universitet, Institutionen för medicin.

## Kärnfakta

- Kurskod / hp: STA310, 7,5 hp
- Nivå: A1N (avancerad nivå)
- Huvudområde: Tillämpad biostatistik
- Undervisningsspråk: engelska (planering sker på svenska)
- Betygsskala: Väl godkänd (VG), Godkänd (G), Underkänd (U)
- Kursen är hållbarhetsrelaterad
- Kursplanen är ett **utkast** (fastställande saknas)

## Examination

| Moment | Hp | Betyg |
|---|---|---|
| Individuell skriftlig salstentamen | 4 hp | VG / G / U |
| 2 obligatoriska datorövningar med skriftliga rapporter | 2 hp | G / U |
| Obligatoriskt seminarium (aktivt deltagande) | 1,5 hp | G / U |

För G krävs G på alla moment. För VG krävs G på obligatoriska moment + VG på tentamen.
Komplettering av icke godkända obligatoriska moment erbjuds enligt lärarens instruktioner.

## Kurslitteratur

- **Kursbok (enda bok studenterna exponeras för):** Collett, *Modelling Survival Data in Medical Research*, 4:e uppl. (2023).
- Broström, *Event History Analysis with R*, och R-paketet `eha` används endast som **intern inspiration för läraren** — de exponeras inte för studenterna. Se [references/inspiration-brostrom-eha.md](references/inspiration-brostrom-eha.md).
- Boken saknar övningsuppgifter; Appendix B ger fem extra dataset att bygga egna övningar kring. Se [references/collett-book.md](references/collett-book.md).

## Lärandemål (sammanfattning)

All planering ska koppla innehåll till minst ett lärandemål. Fullständig text: [references/syllabus.md](references/syllabus.md).

- **Kunskap och förståelse:** grundbegrepp (tid till händelse, censurering, överlevnads- och hazardfunktioner); principer bakom icke-/semi-/parametriska modeller inkl. hypotesprövning och relativa mått; syftet med avancerade metoder (icke-proportionella hazarder, upprepade händelser, competing risks).
- **Färdigheter:** visualisera, estimera och tolka överlevnadskurvor + grundläggande icke-parametriska test; formulera, skatta och utvärdera regressionsbaserade överlevnadsmodeller med flera kovariater.
- **Värderingsförmåga:** kritiskt välja analysmetod utifrån studiedesign och forskningsfråga; reflektera över evidensbaserade beslut, hållbar utveckling och jämlika hälsoresultat.

## Innehållsteman → Collett-kapitel

| Tema | Collett |
|---|---|
| Grundbegrepp, censurering, S(t), h(t), H(t) | 1 |
| Icke-parametriskt: Kaplan–Meier, Nelson–Aalen, log-rank, Wilcoxon | 2 |
| Cox proportionella hazard-modell | 3 |
| Modellkontroll (residualer, PH-antagande) | 4 |
| Parametriska och flexibla modeller | 5–7 |
| Tidsberoende kovariater | 8 |
| Icke-proportionella hazarder | 11 |
| Competing risks | 12 |
| Upprepade händelser / event history | 13 |
| R-implementering | 17 |

Fullständig kapitelkarta: [references/collett-book.md](references/collett-book.md).
R-paket per tema (kap 17): [references/collett-r-packages.md](references/collett-r-packages.md).
Kompletterande paket utöver boken (beslutad verktygslåda): [references/recommended-r-packages.md](references/recommended-r-packages.md).

## Arbetsfiler (under /Users/xbuler/STA310)

- `Syllabus_STA310_sv_2026-03-26.docx` — kursplan (utkast)
- `book/0.pdf … 17.pdf` — Collett, kapitel för kapitel; `99.pdf` = index
- `book/modelling-survival-data-in-medical-research-4nbsped-..._compress.pdf` — hela boken i en fil
- `bostrom/bostrom_book_annotated.pdf` — Broström (inspiration för läraren, skannad, ej studentmaterial)
- `eha/` — lärarens egna R-tester (inspiration, ej studentmaterial)
- `schema.xlsx` — kursens schema (TimeEdit-export)
- `.posit/assistant/skills/sta310-course-planning/assets/survival-vignette.pdf` — officiell `survival`-vignett (Therneau, 2026), utgångspunkt för övningskonstruktion
- `exercises/` — kapitelvisa övningsdokument (Quarto → en PDF per kapitel); författas enligt skillen `sta310-exercise-authoring`

## Schema

Kursens schema (HT2026) finns maskinläsbart i [assets/schedule.csv](assets/schedule.csv) och
översiktligt i [references/schedule.md](references/schedule.md). Källa: `schema.xlsx` (TimeEdit-export).

- Kursstart: introduktion fre 6 nov 2026 (v45)
- 15 föreläsningar, 4 datorövningar (2 obligatoriska med inlämning + 2 övningstillfällen)
- Obligatoriskt seminarium fre 18 dec 2026 (v51)
- Digital tentamen sön 17 jan 2027; omexamination lör 6 mar 2027

## Övningsmaterial

Kapitelvisa övningsuppgifter (en PDF per kapitel) författas enligt skillen
`sta310-exercise-authoring` och lagras i `exercises/` (Quarto-projekt). Mall:
`exercises/_template.qmd`; frågetypskatalog och kapitelprogression finns i den
skillens referenser.

## Planeringsarbetsflöde

1. Identifiera vilket moment som ska planeras (föreläsning, datorövning, seminarium eller tentamen) och vilket lärandemål det kopplar till.
2. Slå upp aktuellt tema i kapitelkartan och välj avsnitt i Collett.
3. Bygg R-exempel och övningar med standardverktygen `survival` + `ggsurvfit` + `gtsummary`; paket per tema i [references/collett-r-packages.md](references/collett-r-packages.md) och [references/recommended-r-packages.md](references/recommended-r-packages.md). Använd `eha`/Broström enbart som bakgrundsinspiration.
4. Kontrollera att examinationsmomenten tillsammans täcker samtliga lärandemål.
5. Skriv och lagra material i `eha/` (eller annan angiven plats).

Vid frågor om kursplanens exakta formuleringar, läs [references/syllabus.md](references/syllabus.md).
