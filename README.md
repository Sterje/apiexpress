# apiexpress

Base URL:
http://localhost:5000/api/albums

Readme URL:
http://localhost:5000

Endpoints
1. Hämta alla album

Metod: GET
URL: /api/albums
Beskrivning: Returnerar en lista över alla album i databasen.

Svar: 
200 OK: En lista med alla album.

json
[
{
    "id": 1, 
    "title": "Back in Black",
    "band": "AC/DC",
    "year": 1980
  },
  {
    "id": 2,
    "title": "Paranoid",
    "band": "Black Sabbath",
    "year": 1970
  }
]

Felmeddelanden:
500 Internal Server Error: Om något gick fel vid läsning av databasen.

2. Hämta ett album med specifikt ID

Metod: GET
URL: /api/albums?id=<ID>
Beskrivning: Hittar ett specifikt album baserat på ett angivet ID.
Query-parametrar:
id (obligatorisk): ID:t för albumet som ska hämtas.

Svar:
200 OK: Det matchande albumet.

json
{
  "id": 1,
  "title": "Back in Black",
  "band": "AC/DC",
  "year": 1980
}

Felmeddelanden:
404 Not Found: Om albumet med det angivna ID:t inte finns.
500 Internal Server Error: Om något gick fel vid läsning av databasen.

4. Hämta album baserat på år
Metod: GET
URL: /api/albums?year=<YEAR>
Beskrivning: Returnerar en lista över album som matchar det angivna året.
Query-parametrar:
year (valfritt): Året för albumen som ska hämtas.
Svar:
200 OK: En lista med album som matchar det angivna året.
json
[
  {
    "id": 1,
    "title": "Back in Black",
    "band": "AC/DC",
    "year": 1980
  },
  {
    "id": 3,
    "title": "British Steel",
    "band": "Judas Priest",
    "year": 1980
  }
]

404 Not Found: Om inga album hittades för det angivna året.
500 Internal Server Error: Om något gick fel vid läsning av databasen.

4. Lägg till ett nytt album
Metod: POST
URL: /api/albums
Beskrivning: Lägger till ett nytt album i databasen.
Begäranskropp (request body):
JSON-format med följande egenskaper:
json
{
  "title": "New Album",
  "band": "New Band",
  "year": 2025
}

Svar: 
201 Created: Det nyligen skapade albumet.

json
{
  "id": 5,
  "title": "New Album",
  "band": "New Band",
  "year": 2025
}

500 Internal Server Error: Om något gick fel vid skrivning till databasen.

5. Ta bort ett album
Metod: DELETE
URL: /api/albums?id=<ID>
Beskrivning: Tar bort ett album baserat på det angivna ID:t.
Query-parametrar:
id (obligatorisk): ID:t för albumet som ska tas bort.

Svar:
200 OK: Bekräftelse på att albumet togs bort.

json
{
  "message": "Album deleted successfully"
}

Felmeddelande:
404 Not Found: Om albumet med det angivna ID:t inte finns.
500 Internal Server Error: Om något gick fel vid skrivning eller läsning av databasen.

Felmeddelanden
Om något går snett i servern (t.ex., ett problem med att läsa eller skriva databasen), returneras ett JSON-felmeddelande:

json
{
  "message": "Error reading database"
}

Anmärkningar
Alla dataoperationer baseras på db.json, en lokal fil som innehåller albumdata.
ID är unika för varje album och används för att identifiera dem vid borttagning eller hämtning.


