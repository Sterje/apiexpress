// Base URL for the API
const apiUrl = "http://localhost:5000/api/albums";

// Fetch all albums
document.getElementById("fetch-albums").addEventListener("click", async () => {
  try {
    const response = await fetch(apiUrl);
    const albums = await response.json();

    const albumsList = document.getElementById("albums-list");
    albumsList.innerHTML = ""; // Clear previous list

    albums.forEach(album => {
      const li = document.createElement("li");
      li.textContent = `${album.id}: ${album.title} by ${album.band} (${album.year})`;
      albumsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
});

// Add a new album
document.getElementById("add-album-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const band = document.getElementById("band").value;
  const year = document.getElementById("year").value;

  const newAlbum = { title, band, year };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAlbum)
    });

    if (response.ok) {
      alert("Album added successfully!");
      document.getElementById("add-album-form").reset();
    } else {
      alert("Error adding album");
    }
  } catch (error) {
    console.error("Error adding album:", error);
  }
});

// Delete an album by ID
// document.getElementById("delete-album-form").addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const albumId = document.getElementById("delete-album-id").value;

//   try {
//     const response = await fetch(`${apiUrl}/${albumId}`, {
//       method: "DELETE",
//     });

//     const deleteMessage = document.getElementById("delete-message");

//     if (response.ok) {
//       deleteMessage.textContent = `Album with ID ${albumId} was deleted successfully!`;
//       deleteMessage.className = "success"; // Lägg till en klass för styling av framgångsmeddelande.
//     } else {
//       deleteMessage.textContent = `Could not find album with ID ${albumId}.`;
//       deleteMessage.className = "error"; // Lägg till en klass för styling av felmeddelande.
//     }
//   } catch (error) {
//     console.error("Error deleting album:", error);
//     const deleteMessage = document.getElementById("delete-message");
//     deleteMessage.textContent = "An error occurred while trying to delete the album.";
//     deleteMessage.className = "error"; // Visa felmeddelande.
//   }
// });


// Delete an album by ID using query parameters
document.getElementById("delete-album-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const albumId = document.getElementById("delete-album-id").value;

  try {
    const response = await fetch(`${apiUrl}?id=${albumId}`, { method: "DELETE" }); // Query-parameter
    const deleteMessage = document.getElementById("delete-message");

    if (response.ok) {
      deleteMessage.textContent = `Album with ID ${albumId} was deleted successfully!`;
      deleteMessage.className = "success";
    } else {
      deleteMessage.textContent = `Could not find album with ID ${albumId}.`;
      deleteMessage.className = "error";
    }
  } catch (error) {
    console.error("Error deleting album:", error);
    const deleteMessage = document.getElementById("delete-message");
    deleteMessage.textContent = "An error occurred while trying to delete the album.";
    deleteMessage.className = "error";
  }
});



// Find album by ID
// document.getElementById("find-album-form").addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const albumId = document.getElementById("album-id").value;

//   try {
//     const response = await fetch(`${apiUrl}/${albumId}`);
//     if (response.ok) {
//       const album = await response.json();
//       document.getElementById("album-details").textContent = 
//         `${album.id}: ${album.title} by ${album.band} (${album.year})`;
//     } else {
//       document.getElementById("album-details").textContent = "Album not found.";
//     }
//   } catch (error) {
//     console.error("Error finding album:", error);
//   }
// });

// Find album by ID using query parameters
document.getElementById("find-album-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const albumId = document.getElementById("album-id").value;

  try {
    const response = await fetch(`${apiUrl}?id=${albumId}`); // Lägg till ID som query-parameter
    if (response.ok) {
      const album = await response.json();
      document.getElementById("album-details").textContent = 
        `${album.id}: ${album.title} by ${album.band} (${album.year})`;
    } else {
      document.getElementById("album-details").textContent = "Album not found.";
    }
  } catch (error) {
    console.error("Error finding album:", error);
  }
});


