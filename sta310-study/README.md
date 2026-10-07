# STA310 Study — flashcards och flervalsfrågor

Responsiv, backend-fri webbapp för studenter på **STA310 Överlevnadsanalys**.
Appen är ett instuderingsstöd till kursboken — Collett, *Modelling Survival Data
in Medical Research* (4:e uppl., 2023) — och täcker **hela boken, kapitel 1–17**.
Broström/`bostrom`-materialet används **inte**: det är lärarinspiration och ska
inte exponeras för studenter.

Allt studentinriktat innehåll är på engelska (kursens undervisningsspråk).
Innehållet är författat utifrån bok-PDF:erna i `../book/` och följer samma
frågetyper och kapitelprogression som `../exercises/`.

## Innehåll i korthet

| Kapitel | Tema | Flashcards | Flervalsfrågor |
|---|---|---|---|
| 1 | Survival analysis — censurering, S(t), h(t), H(t) | 12 | 6 |
| 2 | Icke-parametriska metoder — Kaplan–Meier, Nelson–Aalen, log-rank | 14 | 6 |
| 3 | Cox regressionsmodell | 14 | 6 |
| 4 | Modellkontroll i Cox-modellen | 12 | 6 |
| 5 | Parametriska regressionsmodeller | 14 | 6 |
| 6 | Flexibla parametriska modeller | 11 | 6 |
| 7 | Modellkontroll i parametriska modeller | 11 | 6 |
| 8 | Tidsberoende kovariater | 13 | 6 |
| 9 | Intervallcensurerade data | 11 | 6 |
| 10 | Frailty-modeller | 13 | 6 |
| 11 | Icke-proportionella hazarder | 12 | 6 |
| 12 | Competing risks | 13 | 6 |
| 13 | Upprepade händelser och event history | 13 | 6 |
| 14 | Beroende censurering | 12 | 6 |
| 15 | Power och sampelstorlek | 11 | 6 |
| 16 | Bayesiansk överlevnadsanalys | 13 | 6 |
| 17 | Överlevnadsanalys med R | 15 | 6 |
| **Totalt** | | **214** | **102** |

## Snabbstart

```bash
npm install
npm run dev        # utvecklingsserver på http://localhost:5173
npm run test       # Vitest i watch-läge
npm run test:run   # Vitest en gång (används av CI)
npm run typecheck  # tsc -b
npm run build      # typkoll + produktionsbygge till dist/
npm run preview    # servera dist/ lokalt
npm run lint       # oxlint
```

## Projektstruktur

```
src/
  content/                  # ALLT kursinnehåll som data
    types.ts                # datamodellen (Chapter, Flashcard, MultipleChoiceQuestion)
    index.ts                # registret: lägg till nya kapitel här
    chapters/
      chapter-01.ts … chapter-17.ts
  logic/
    quiz.ts                 # rena funktioner: blanda, förbereda, rätta, poängsätta
    progress.ts             # rena funktioner: svår-markering, statistik, serialisering
  hooks/
    useProgress.ts          # kopplar logiken till React + localStorage
    useHashRoute.ts         # minimal hash-router (#/chapter/3/quiz)
  components/
    ChapterOverview.tsx     # kapitelöversikt + övergripande progress
    ChapterView.tsx         # kapitelvy med flikar (Flashcards / Quiz)
    FlashcardDeck.tsx       # kortläge: vänd, bläddra, blanda, filtrera
    QuizRunner.tsx          # quizläge: svara, direkt återkoppling, resultat
    DifficultButton.tsx     # stjärna = markera som svår
    ResetProgressButton.tsx # tvåstegsbekräftad återställning
  App.tsx
```

## Redigera frågor och kort

Allt innehåll ligger i **separata datafiler** — UI-koden behöver aldrig röras.

```ts
// src/content/chapters/chapter-03.ts
export const chapter03: Chapter = {
  …
  flashcards: [
    {
      id: 'ch03-f01',            // stabilt id — används som nyckel för sparad progress
      front: 'Write down the Cox proportional hazards model.',
      back: 'h_i(t) = exp(beta\'x_i) h_0(t) …',
      source: '§3.1.2',          // bokavsnittet kortet bygger på
      buildsOn: [1, 2],          // valfritt: kumulativ fråga (måste vara tidigare kapitel)
    },
  ],
  questions: [
    {
      id: 'ch03-q01',
      prompt: '…',
      options: ['…', '…', '…', '…'],
      correctIndex: 1,           // index i options
      explanation: '…',          // visas efter svaret
      source: '§3.4.2',
    },
  ],
}
```

**Viktigt:**

- `id` är nyckeln till studentens sparade progress. Ändra inte ett id i onödan —
  då tappar studenten sin markering och statistik för just det kortet. Lägg hellre
  till ett nytt id.
- Nya kapitel: skapa `chapters/chapter-NN.ts` och lägg till det i arrayen i
  `src/content/index.ts`. Kapitelregistret behöver ha samma nummer som boken.
- Inget LaTeX stöds i gränssnittet (ingen math-renderare). Skriv `S(t)`, `beta`,
  `gamma` som vanlig text. Enhetstestet `content.test.ts` faller om `$` eller
  `\hat`/`\beta` smyger in.

## Sparad progress (localStorage)

Allt sparas lokalt i webbläsaren — ingen backend, inget konto.

- Nyckel: `sta310-study:progress:v1`
- Innehåll: `difficult` (svår-markeringar per item-id), `quiz` (antal försök/rätt
  och senaste resultat), `flashcards` (antal visningar + "I know this") samt
  `lastVisited` för "Continue where you left off".
- Trasig eller handredigerad data kraschar aldrig appen: `parseProgress()`
  reparerar det som går och ignorerar resten. Poster för id:n som inte längre
  finns i registret rensas bort automatiskt.
- "Reset progress" i headern nollställer allt (tvåstegsbekräftelse).

## Tester

```bash
npm run test:run
```

| Fil | Täcker |
|---|---|
| `src/logic/quiz.test.ts` | Blandning, att rätt svar följer med vid omkastning, rättning, poäng, att ogiltiga frågor filtreras bort |
| `src/logic/progress.test.ts` | Svår-markering, quiz-/kortstatistik, serialisering, robusthet mot trasig localStorage, prune, storage-fel |
| `src/content/content.test.ts` | Innehållsintegritet: unika id:n, minsta antal per kapitel, giltigt `correctIndex`, icke-tomma fält, `buildsOn` endast bakåt |
| `src/App.test.tsx` | Huvudflöden i gränssnittet: navigering, rätta/fel svar, kortvändning, svår-markering, filter, omladdning, reset |

## Deploy till GitHub Pages

Appen är helt statisk. Bygget använder `base: './'` och hash-routing
(`#/chapter/3/quiz`), så den fungerar på vilken under­sökväg som helst utan
serverkonfiguration eller 404-fix.

Det finns två färdiga arbetsflöden — använd det som matchar hur du publicerar:

| Fil | När |
|---|---|
| `.github/workflows/deploy-pages.yml` (i `sta310-study/`) | Om `sta310-study/` är ett **eget** GitHub-repo |
| `../.github/workflows/deploy-pages.yml` (i `STA310/`) | Om hela kursrepot publiceras och appen ligger i underkatalogen `sta310-study/` |

Båda kör `npm ci` → `npm run test:run` → `npm run build` och publicerar `dist/`
via de officiella Pages-actionerna.

**Aktivera en gång i GitHub:**

1. Settings → Pages → **Source: GitHub Actions**.
2. Pushtes till `main` (eller kör workflowen manuellt via *Run workflow*) så
   byggs och publiceras appen.
3. Klart. Ingen `gh-pages`-gren och ingen hemlighet behövs.

## Tekniska val

- **React 19 + TypeScript + Vite** — snabbt bygge, typsäkert innehåll.
- **Hash-routing i stället för history-API** — inga server-rewrites, fungerar
  direkt på GitHub Pages.
- **Ren logik i `src/logic/`** — inga React-beroenden, därför enkelt att
  enhetstesta; testerna är motorn i "frågelogiken".
- **Data/UI-uppdelning** — komponenterna läser bara `Chapter`-modellen via
  registret, så frågor kan redigeras utan att röra gränssnittet.
