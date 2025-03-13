import express from "express"; // Importerar Express-biblioteket för att skapa och hantera en webbserver.
import cors from "cors"; // Importerar CORS-biblioteket för att hantera Cross-Origin Resource Sharing.
import fs from "fs"; // Importerar filsystemmodulen för att läsa och skriva filer.
import path from "path"; // Importerar modul för hantering av fil- och katalogsökvägar.
import { fileURLToPath } from "url"; // Importerar en funktion för att få sökvägen till en fil i en ES-modul.

// Få den aktuella filens sökväg och dess katalog i en ES-modul.
const __filename = fileURLToPath(import.meta.url); // Omvandlar URL till en absolut filväg.
const __dirname = path.dirname(__filename); // Hämtar katalogen där filen finns.

// Skapa en Express-applikation.
const app = express();
const port = 5000; // Sätter porten som servern ska lyssna på.

// Middleware för att hantera CORS och JSON.
app.use(cors()); // Tillåter CORS-begäran från olika domäner.
app.use(express.json()); // Gör det möjligt att hantera JSON-data i förfrågningar.

// Middleware som loggar över alla endpoints inkommande request
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Gå vidare till nästa steg (endpoint eller middleware)
});

// Sökväg till databasen (db.json).
const dbFilePath = path.join(__dirname, "db.json"); // Skapar en absolut sökväg till "db.json".

// Hämta album baserat på query-parametrar
app.get("/api/albums", (req, res) => {
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const db = JSON.parse(data);
    const { id } = req.query; // Hämta ID från query-parametern (t.ex., ?id=4)

    if (id) {
      // Om ett ID tillhandahålls, leta efter ett specifikt album
      const album = db.albums.find(a => a.id == id); // Lös jämförelse för att matcha både strängar och siffror
      if (!album) {
        return res.status(404).json({ message: "Album not found" });
      }
      return res.json(album);
    }

    // Om inget ID tillhandahålls, returnera alla album
    res.json(db.albums);
  });
});

// Endpoint: Hämta ett album baserat på ID.
app.get("/api/albums/:id", (req, res) => {
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      // Hanterar fel vid läsning av filen.
      return res.status(500).json({ message: "Error reading database" });
    }
    const albums = JSON.parse(data).albums; // Parsar JSON-strängen till ett objekt.
    const album = albums.find(a => a.id === parseInt(req.params.id)); // Hittar album med ett matchande ID.
    if (!album) {
      // Returnerar 404-fel om albumet inte hittas.
      return res.status(404).json({ message: "Album not found" });
    }
    res.json(album); // Returnerar det hittade albumet som JSON.git
  });
});

// Endpoint: Lägg till ett nytt album.
app.post("/api/albums", (req, res) => {
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      // Hanterar fel vid läsning av filen.
      return res.status(500).json({ message: "Error reading database" });
    }
    const db = JSON.parse(data); // Parsar innehållet i databasen som ett JavaScript-objekt.
    const newAlbum = {
      // Skapar ett nytt albumobjekt med ett unikt ID.
      id: db.albums.length ? db.albums[db.albums.length - 1].id + 1 : 1, // Om det finns album, öka senaste ID med 1.
      title: req.body.title, // Hämtar titel från begärans kropp.
      band: req.body.band, // Hämtar bandnamn från begärans kropp.
      year: req.body.year // Hämtar år från begärans kropp.
    };
    db.albums.push(newAlbum); // Lägger till det nya albumet i databasen.
    fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), "utf8", (writeErr) => {
      if (writeErr) {
        // Hanterar fel vid skrivning till filen.
        return res.status(500).json({ message: "Error writing to database" });
      }
      res.status(201).json(newAlbum); // Returnerar det nya albumet med en 201-statuskod.
    });
  });
});

// Ta bort album med hjälp av en query-parameter
app.delete("/api/albums", (req, res) => {
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const db = JSON.parse(data);
    const { id } = req.query; // Hämta ID från query-parametern (t.ex., ?id=4)

    if (!id) {
      return res.status(400).json({ message: "No ID provided" }); // Om inget ID anges, skicka fel
    }

    const albumIndex = db.albums.findIndex(a => a.id == id); // Hitta albumets index baserat på ID
    if (albumIndex === -1) {
      return res.status(404).json({ message: "Album not found" });
    }

    db.albums.splice(albumIndex, 1); // Ta bort albumet från databasen

    fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), "utf8", (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ message: "Error writing to database" });
      }
      res.status(200).json({ message: "Album deleted successfully" });
    });
  });
  
});

// Starta servern.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Loggar att servern körs och lyssnar på angiven port.
});
