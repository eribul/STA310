---
name: sta310-exercise-authoring
description: Författar kapitelvisa övningsuppgifter i överlevnadsanalys för kursen STA310, som Quarto-dokument som renderas till en PDF per kapitel i Collett "Modelling Survival Data in Medical Research". Använd när övningar ska skapas, utökas, struktureras eller renderas, när frågetyper ska väljas, eller när ett nytt kapitels övningsdokument ska sättas upp.
---

# STA310 — Övningsförfattning

Författar övningsuppgifter till STA310 (Överlevnadsanalys), kapitelvis utifrån
Collett, *Modelling Survival Data in Medical Research* (4:e uppl., 2023).
Mål: **en PDF per kapitel** (frågor) plus ett separat facit per kapitel, genererat
från Quarto med **Typst** (`.qmd` → PDF), strukturerat på samma sätt genom kursen.

## Översikt

- Övningsdokumenten ligger i `/Users/xbuler/STA310/exercises/` (Quarto-projekt).
- En mapp per kapitel: `chapter-NN/chapter-NN.qmd` — **en källfil** som genererar både fråge-PDF och facit-PDF.
- Mall: `exercises/_template.qmd` (renderas inte; `_`-prefix).
- Studentinriktat innehåll skrivs på **engelska**; planering sker på svenska.
- R är en integrerad del av övningarna, inte ett separat spår.
- 10–14 uppgifter per kapitel, som `###`-rubriker med automatisk numrering, taggade med frågetyp.

## En källfil → två PDF:er

Lösningarna ligger inline, inramade i `::: {.content-visible when-profile="solutions"}`.

- Fråge-PDF: `quarto render chapter-NN/chapter-NN.qmd --to typst` (standardprofil `questions` döljer lösningarna).
- Facit-PDF: `quarto render chapter-NN/chapter-NN.qmd --to typst --profile solutions -M solutions:true -o chapter-NN/chapter-NN-solutions.pdf`.

`-o` skiljer filnamnen åt; `-M solutions:true` byter titel ("Exercises" → "Solutions")
via `exercises/_solutions.lua`. Använd `exercises/render.sh chapter-NN`, som renderar
facit först (så att `-o` inte skriver över fråge-PDF:en) och sedan frågorna. Kör
`exercises/render.sh` utan argument för att rendera alla kapitel.

## Arbetsflöde (författning av ett kapitel)

1. Läs **hela** kapitlets text i Collett (bok-PDF i `/Users/xbuler/STA310/book/`,
   t.ex. `pdftotext -layout book/NN.pdf`) — inte bara innehållsförteckning eller
   avsnittsrubriker. Notera vilka delavsnitt (X.Y–X.Z) som täcks och vilka begrepp
   och metoder som faktiskt introduceras.
2. Slå upp kapitlet i [references/chapter-map.md](references/chapter-map.md) för
   rekommenderade frågetyper och fokus.
3. Kopiera mallen: `cp _template.qmd chapter-NN/chapter-NN.qmd`; sätt `title`.
4. Dela in i avsnitt om kapitlet täcker flera teman; annars ett enda avsnitt.
5. Skriv 10–14 uppgifter med blandade typer enligt [references/question-types.md](references/question-types.md).
6. Skriv lösningen direkt under varje uppgift, inramad i `::: {.content-visible when-profile="solutions"}`.
7. Rendera och kontrollera: `./render.sh chapter-NN` (eller `./render.sh` för alla kapitel).

## Frågetyper

18 frågetyper i sex grupper. Fullständig katalog med definitioner, exempel och
mixrekommendation: [references/question-types.md](references/question-types.md).

## Kapitelkarta och progression

Frågetyperna följer bokens metodologiska progression: tidiga kapitel betonar
censorering, Kaplan–Meier och jämförelse av kurvor; senare kapitel betonar
modellkritik, regression, tidsberoende effekter och avancerad modellering.
Kapitelvis vägledning: [references/chapter-map.md](references/chapter-map.md).

## Avgränsning och frågemix

- **Avgränsning:** Övningarna för kapitel N får **endast** bygga på kapitel 1–N
  (aldrig senare kapitel). Innehållet i kapitel 1–N-1 måste därför vara känt innan
  frågorna skrivs.
- **Två slags frågor per kapitel** (eftersträva en mix av båda):
  - *Kapitellokala* — testar endast det aktuella kapitlets innehåll.
  - *Kumulativa* — förutsätter även att studenten tagit till sig tidigare kapitel.
- Kumulativa frågor markeras med en extra kursiv rad under typen, t.ex.
  `*Builds on: Chapters 1–2*`. Kapitellokala frågor behöver ingen markering.

## Konventioner

- Engelska för allt studentinriktat innehåll.
- Varje uppgift är en `###`-rubrik (automatiskt numrerad via `number-sections`). Frågetypen skrivs på en egen kursiv rad direkt under rubriken: `*Type: Concept & notation*`.
- Kumulativa frågor markeras med en extra kursiv rad under typen: `*Builds on: Chapters X–Y*`. Kapitellokala frågor lämnas omarkerade.
- Deluppgifter skrivs som lista med `(a)`, `(b)`, `(c)` på egna rader, med blankrad före listan.
- Visa R-output/figurer som fast innehåll; kör kod endast i mini-labs och
  simuleringsuppgifter (chunk med `#| echo: true`).
- Slutsatser och tolkning väger tyngre än kod.
- Tillämpad inriktning: undvik överdrivet teoretisk matematik och formella härledningar; betona tolkning, resonemang och konkreta (helst biomedicinska) exempel.
- Lösningen skrivs direkt under uppgiften, inramad i `::: {.content-visible when-profile="solutions"}` och inledd med **Solution.**.
- Standardverktyg i koden: `survival` + `ggsurvfit` + `gtsummary`.

## Sammanhang

Kursplan, lärandemål, examinationsstruktur och litteratur: skillen
`sta310-course-planning`. R-paket per tema (kap 17) och kompletterande paket:
dess referenser `collett-r-packages.md` och `recommended-r-packages.md`.
