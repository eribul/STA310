# STA310 — Övningsuppgifter (kapitelvis)

Quarto-projekt som från **en `.qmd`-fil per kapitel** genererar två PDF:er — frågor
och facit — i Collett, *Modelling Survival Data in Medical Research* (4:e uppl., 2023).
PDF-motor: **Typst**.

## En källfil → två PDF:er

- Frågor och lösningar ligger i **samma** `.qmd`-fil. Lösningarna är inramade i
  `::: {.content-visible when-profile="solutions"}` och döljs i fråge-PDF:en.
- Rendera båda med: `./render.sh chapter-NN`.
- Fråge-PDF heter `chapter-NN.pdf`; facit heter `chapter-NN-solutions.pdf`.

## Struktur

- `_quarto.yml` — projekt-, profil- och PDF-konfiguration (Typst).
- `_solutions.lua` — byter titel "Exercises" → "Solutions" när `solutions: true`.
- `_template.qmd` — kanonisk mall (renderas inte; `_`-prefix).
- `render.sh` — renderar frågor + facit för ett kapitel.
- `chapter-NN/chapter-NN.qmd` — ett kapitels källfil.

## Skapa ett nytt kapitel

1. Kopiera mallen: `cp _template.qmd chapter-NN/chapter-NN.qmd`.
2. Sätt `title` till kapitlets nummer och titel.
3. Dela in i avsnitt om kapitlet täcker flera teman.
4. Skriv 10–14 frågor; lösningen skrivs direkt under varje fråga, inramad i
   `::: {.content-visible when-profile="solutions"}`.

## Rendera

Ett kapitel:

```bash
./render.sh chapter-NN
```

Alla kapitel:

```bash
./render.sh
```

Manuellt (samma som skriptet gör):

```bash
quarto render chapter-NN/chapter-NN.qmd --to typst --profile solutions -M solutions:true -o chapter-NN/chapter-NN-solutions.pdf
quarto render chapter-NN/chapter-NN.qmd --to typst
```

Typst (>= 0.12) krävs och finns installerat.

## Konventioner

- Studentinriktat innehåll skrivs på **engelska** (kursens undervisningsspråk).
- Frågorna numreras `N.1, N.2, …` och taggas med frågetyp.
- Frågetypskatalog, mix och kapitelprogression: se skillen `sta310-exercise-authoring`.
