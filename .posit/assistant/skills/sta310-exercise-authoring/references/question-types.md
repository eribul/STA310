# Frågetypskatalog — STA310 övningar

## Innehåll

- Övergripande principer
- Grupp 1: Grundläggande förståelse
- Grupp 2: Tolkning
- Grupp 3: Metodval och antaganden
- Grupp 4: Diagnostik och kritik
- Grupp 5: Forskningsfråga ↔ modell
- Grupp 6: R-integrerat
- Mix per kapitel

## Övergripande principer

- R är en integrerad del av övningarna, inte ett separat spår.
- Frågorna testar *relationer mellan begrepp*, inte bara definitioner.
- Tillämpad inriktning: undvik överdrivet teoretisk matematik; betona tolkning, resonemang och konkreta (helst biomedicinska) exempel.
- Frågetyperna följer bokens metodologiska progression (se chapter-map.md).
- 10–14 uppgifter per kapitel.

## Grupp 1: Grundläggande förståelse

### [Concept & notation] — Begrepp och notation
Kontrollerar centrala objekt och relationerna mellan dem: hazard, survival function,
cumulative hazard, censurering, truncation, risk set, proportional hazards.
Fokus ligger på relationer, inte definitioner.

### [True / false with justification] — Sant/falskt med motivering
Påståenden om vanliga missuppfattningar, t.ex. att hazard kan tolkas som sannolikhet,
vad censurering innebär, eller vad proportional hazards faktiskt säger. Kräver motivering.

### [Risk set reasoning] — Risk-set-resonemang
Vilka individer bidrar till riskmängden vid olika tidpunkter och hur censurering
påverkar detta. Centralt för både Kaplan–Meier och Cox-modellen.

### [Time scale & estimand] — Tidsskala och estimand
Resonemang om val av tidsskala och exakt vilket mått frågan gäller: survival
probability vid viss tidpunkt, median survival, hazard ratio, restricted mean
survival time, etc.

## Grupp 2: Tolkning

### [Interpret R output]
Ge output från `survfit()`, `coxph()` eller parametriska modeller; studenten
förklarar koefficienter, hazard ratio, konfidensintervall, teststatistik och vad
som faktiskt kan slutsatsdras.

### [Interpret figure]
Kaplan–Meier, log-minus-log, residualdiagnostik, cumulative hazard eller
modellbaserade kurvor. Fråga både vad figuren visar och vad den *inte* visar.

## Grupp 3: Metodval och antaganden

### [Method selection]
Studiesituation; välj mellan Kaplan–Meier, log-rank, Cox, stratifierad Cox,
tidsberoende kovariat eller parametrisk modell — och motivera valet.

### [Assumptions]
Vilka antaganden metoden kräver, hur de bedöms, och konsekvensen om de inte håller.
För Cox återkommer proportional hazards ofta.

### [Model comparison]
Cox vs parametrisk, stratifiering vs interaktion, olika tidsskalor, eller olika sätt
att hantera en kovariat.

## Grupp 4: Diagnostik och kritik

### [Diagnostics & model critique]
Residualplotter, testresultat eller modelljämförelser; bedöm om modellen verkar
rimlig och vad nästa analyssteg bör vara.

### [What's wrong here?]
En felaktig analys eller feltolkning, t.ex. hazard ratio tolkad som risk ratio,
ignorerad censurering, eller en modell där proportional hazards uppenbart inte håller.

### [What if ...?]
Ändra censoreringsgrad, uppföljningstid, kovariatkodning eller baseline hazard och
fråga hur analysen/tolkningen påverkas.

## Grupp 5: Forskningsfråga ↔ modell

### [From research question to model]
Substantiell frågeställning; formulera utfall, tidsskala, censoreringsmekanism,
kovariater och modell.

### [From model to research question]
Ge modellformuleringen; beskriv vilken vetenskaplig fråga den faktiskt besvarar.

## Grupp 6: R-integrerat

### [Code reading]
Kort R-kod; förklara vad koden gör, upptäck buggar eller avgör om analysen
motsvarar den avsedda frågan.

### [Code completion]
Nästan färdigt kodblock; fyll i en eller två kritiska delar. Testar strukturförståelse
utan att uppgiften blir ren programmering.

### [Mini-lab]
Litet dataset eller utsnitt; analys i R och 3–5 tolkningsfrågor. Slutsatserna väger
tyngre än kodandet.

### [Simulation-based intuition]
Simulera data och se hur censurering, hazard ratio eller brott mot PH-antagandet
påverkar resultatet. Särskilt värdefullt på masternivå.

## Mix per kapitel (10–14 uppgifter)

- 2–3 snabba konceptfrågor
- 2 tolkningsfrågor
- 2 metod-/modellval
- 1 diagnostikfråga
- 1 felanalys
- 1 R-kodfråga
- 1 mini-lab
- 1 mer resonerande eller simuleringsbaserad uppgift

Progression: tidiga kapitel → fler koncept-, censurerings- och KM-uppgifter;
senare kapitel → mer modellkritik, regression, tidsberoende effekter och avancerad
modellering.
