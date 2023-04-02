# Design your t-shirt

Design you t-shirt is een website waar je een t-shirt kan ontwerpen. Je kan uit verschillende kleuren kiezen en ook verschillende teksten en afbeeldingen toevoegen. Wanneer je een ontwerp hebt gemaakt wordt deze opgeslagen in local storage. Hierdoor kun je meerdere ontwerpen maken en uiteindelijk bestellen.

Deze website heb ik gemaakt voor het vak Browser Technologies gedurende de minor Web-Design en Development aan de Hogeschool van Amsterdam.

Je kunt de demo van mijn website [hier](https://inevdhoven.github.io/browser-technologies-2223/) vinden.

Voor meer over mijn proces en de bronnen die ik heb gebruikt kun je mijn Notion bekijken [hier]().

## Table of Contents

## Hoe kun je de website installeren?

Je kan dit project clonen met de volgende commando's in je terminal in de map waar je het project wilt hebben in te voeren:

` git clone https://github.com/Inevdhoven/browser-technologies-2223.git`

Hierna kun je de website openen in je browser door de index.html te klikken. Ook kun je het project openen in je code editor en de code bekijken of er aanpassingen aan maken.

## De features

In deze website zitten de volgende features:

- De gebruiker kan de maat van het t-shirt kiezen
- De gebruiker kan kiezen of het t-shirt voor een vrouw, man of unisex is
- De gebruiker kan een t-shirt ontwerpen, hierbij kan de gebruiker kiezen om een afbeelding en tekst op het t-shirt te plaatsen.
- De gebruiker kan de kleur van het t-shirt aanpassen
- Wanneer de gebruiker een ontwerp heeft gemaakt wordt deze opgeslagen in local storage
- De gebruiker kan meerdere ontwerpen maken en deze worden in local storage opgeslagen
- De gebruiker kan de ontwerpen terug zien in een overzicht
- De gebruiker kan de gemaakten ontwerpen in de winkelwagen terug vinden en naar het bestelproces gaan

### De core feature

De core feature van deze website is het ontwerpen van een t-shirt. De gebruiker kan kiezen uit verschillende kleuren, teksten en afbeeldingen. Ook kan de gebruiker de maat van het t-shirt kiezen en de kleur van het t-shirt aanpassen. Wanneer de gebruiker een ontwerp heeft gemaakt wordt deze opgeslagen in local storage. De gebruiker kan meerdere ontwerpen maken en deze worden in local storage opgeslagen. De gebruiker kan de ontwerpen terug zien in een overzicht. De gebruiker kan de gemaakten ontwerpen in de winkelwagen terug vinden en naar het bestelproces gaan.

## Hoe heb ik progressive enhancement toegepast?

Ik heb progressive enhancement toegepast door eerst te beginnen met het opzetten van de HTML, zonder CSS en JavaScript. Vervolgens heb ik de CSS toegevoegd en daarna de JavaScript. Hierdoor heb ik ervoor gezorgd dat de website ook zonder CSS en JavaScript werkt. De gebruiker kan dan nog steeds door de website navigeren. Op deze manier wordt er alleen niks opgeslagen, dit zou dan serverside gedaan moeten worden.

<!-- De progressive enhancement kun je ook zien in de vallidation van de input velden. Wanneer de gebruiker een verkeerde input geeft wordt er een error message getoond. Deze error message wordt getoond door JavaScript. Wanneer JavaScript uit staat wordt er een error message getoond door de HTML5 validatie. -->

Wanneer de gebruiker bijvoorbeeld het laten zien van de afbeeldingen uitzet. Dan krijgt de gebruiker waar de afbeeldingen stonden de alt tekst te zien met daarin wat er zou moeten staan. Op deze manier kan de gebruiker nog steeds de website gebruiken.

## Hoe heb ik feature detection toegepast?

Featrure detection is een manier om te kijken of de browser de feature die je hebt toegepast ondersteunt of niet. Ik heb feature detection toegepast door te kijken of de browser bijvoorbeeld local storage ondersteunt. Als er geen local storage wordt ondersteund, zal het opslaan van de ontwerpen serverside moeten worden opgelost.

Ik heb ook feature detection gebruikt om te kijken wat voor CSS features er wel en niet worden gesupport. Zo ben ik er bijvoorbeeld achter gekomen dat appearance: none niet in Flow wordt ondersteund. Dit heb ik opgelost door wanneer appearance: none niet wordt ondersteund, opacity: 0 te gebruiken. Dit heb ik ook gedaan voor de selector :has() en de property cursor: pointer.

## Wat moet er serverside worden opgelost?

## De browsers waarin ik heb getest

De browsers waarin ik heb getest op desktop zijn:

- Chrome
- Firefox
- Safari
- Flow

De browsers waarin ik heb getest op mobiel zijn:

- Safari (iOS)
- Samsung Internet (Android)

## Testverslag

Nadat ik bijna klaar was met het maken van de website heb ik de website getest in de verschillende browsers. Hieronder kun je lezen wat ik allemaal ben tegen gekomen per browser. Onder het testen ben ik de hele website doorlopen en heb ik gekeken of alles werkte. Ook heb ik de website getest in de volgende combinaties:

- Met HTML en CSS aan
- Met HTML en JavaScript aan
- Met HTML, CSS en JavaScript aan

Deze tests heb ik gedaan in de volgende browsers, met daarbij mijn bevindingen:

### Chrome

In Chrome ben ik bijna niets tegen gekomen, omdat dit de browser is waarin ik werk. Hierdoor weet ik van de HTML en CSS die ik gebruik wat wel en niet werkt. Daarnaast word veel van de CSS die ik gebruik ondersteund door Chrome. Op het gebied van JavaScript heb ik tot nu toe ook geen problemen ondervonden.

### Firefox

In Firefox ben ik maar een probleem tegen gekomen en dat is dat niet alle CSS die ik heb gebruikt al wordt ondersteund. Op mobiel formaat is mijn website bijvoorbeeld niet bruikbaar doordat ik gebruik maak van de selector :has(). Dit ga ik oplossen door het op een andere manier te stylen. Verder werkt alle HTML, CSS en JavaScript in Firefox.

### Safari

In Safari op desktop ben ik maar een probleempje tegen gekomen en dat in de navigatiebalk de padding niet helemaal goed ging. Dit heb ik opgelost door specifiek alleen voor Safari de padding aan te passen. Verder werkt alle HTML, CSS en JavaScript in Safari.

### Flow

In Flow liep ik tegen meer problemen op dan in de andere browsers. De meeste problemen kwam ik tegen op het gebied van CSS en JavaScript. Zo kwam ik er al snel achter dat de JavaScript die ik gebruik in Flow niet werkt. Dit komt waarschijnlijk doordat Flow localstorage niet ondersteund. Hierdoor werkt het ontwerpen van de t-shirts net als wanneer je JavaScript uit zou zetten en worden de ontwerpen dus niet opgeslagen. Hiervoor ga ik een omschrijving maken wat er serverside moet worden gedaan om dit op te lossen.

Verder ben ik ook veel tegen gekomen op het gebied van CSS. Zo werken de porperties appearance: none en cursor: pointer niet in Flow. Voor de property appearance: none heb ik een oplossing gevonden door opacity: 0 te gebruiken. Voor de property cursor: pointer heb ik een oplossing gevonden door de cursor: pointer alleen te gebruiken wanneer de browser de property ondersteund. Dan werkt ook de selector :has() niet in Flow. Dit ga ik op een andere manier oplossen door andere selectors en styling te gebruiken wanneer :has() niet wordt ondersteund.

Dan kwam ik nog een rare bug tegen waar ik nog geen oplossing voor heb gevonden en dat is dat wanneer je in een input veld tekst typt, alle velden zich gaan verplaatsen. Als ik nog tijd heb ga ik hier nog verder naar kijken. Maar omdat dit alleen het geval is in Flow en niet in de andere browsers, heb ik dit niet als prioriteit gezet.

Als laatste ben ik er nog achter gekomen dat required op input velden niet werkt in Flow. Ik ga nog kijken of ik dit kan oplossen door met JavaScript te checken of de input velden zijn ingevuld.

### Safari (iOS)

In Safari op iOS ben ik maar een paar kleine problemen tegen gekomen. De eerste was dat het t-shirt dat de gebruiker aan het ontwerpen is over de navigatiebalk met de knoppen om de afbeelding, tekst en kleur toe te voegen of aan te passen heen viel. Dit heb ik opgelost door aan het t-shirt een z-index te geven zodat deze er achter komt te liggen. Verder werkt alle HTML, CSS en JavaScript in Safari iOS.

### Samsung Internet (Android)

HIER MOET NOG EEN TEST VERSLAG KOMEN

### Contrast check

Met de extentie van WCAG Contrast Checker heb ik gekeken of de kleuren die ik heb gebruikt voldoen aan de WCAG 2.0 AA norm.

Door het checken van de kleuren kwam ik erachter dat witte tekst op een oranje achtergrond niet voldoet aan de norm. Dit heb ik opgelost door de kleur van de tekst aan te passen naar zwart. Verder voldoen alle andere kleuren aan de norm.

### Screenreader test

Ik heb de website getest met de screenreader van VoiceOver op macOS. Hieronder kun je lezen wat ik allemaal ben tegen gekomen.

HIER MOET NOG EEN SCREENREADER TEST VERSLAG KOMEN

## Serverside uitleg

## TO DO:

| TO DO                                             | STATUS             |
| ------------------------------------------------- | ------------------ |
| Bedenken hoe de website er uit moet komen te zien | :white_check_mark: |
| HTML schrijven                                    | :white_check_mark: |
| CSS schrijven                                     | :white_check_mark: |
| JavaScript schrijven                              | :white_check_mark: |
| JavaScript Validatie toevoegen                    |                    |
| Responsive maken                                  | :white_check_mark: |
| Testen Chrome                                     | :white_check_mark: |
| Testen Firefox                                    | :white_check_mark: |
| Testen Safari                                     | :white_check_mark: |
| Testen Flow                                       | :white_check_mark: |
| Testen Safari (iOS)                               | :white_check_mark: |
| Testen Samsung Internet (Android)                 |                    |
| Contrast check                                    | :white_check_mark: |
| Screenreader test                                 |                    |
| Readme schrijven                                  |                    |
| Serverside uitleg schrijven                       |                    |
| :has() mobiel Firefox en Flow oplossen            |                    |
