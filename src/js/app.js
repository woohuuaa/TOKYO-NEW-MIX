// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

// 1.	Create an event handler to run when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // a.	Create all of the buttons for your app’s Artists
  // <nav id="menu">
  createButtonForArtist();

  createButtonForNewArtist();
  // b.	By default, you should use your first Artist on load
  // main -> h2
  displayArtist(artists[0]);
  // main -> table -> tbody
  displaySongs(artists[0]);
});

// to display Menu Navigation: Artist1/Artist2/Artist3
function createButtonForArtist() {
  const menu = document.querySelector("#menu");
  // i.	Loop through all of your Artist objects
  artists.forEach((artist) => {
    // create a <button> element for each
    const button = document.createElement("button");
    // ii.	Use each Artist’s name for the button’s text
    button.textContent = artist.name;
    // iii.	When the button is clicked, show that Artist’s Name, Links, and Songs
    button.addEventListener("click", () => {
      // a.	Update the text of the Selected Artist above your table with the Artist’s Name
      //      and create anchor elements for all of the Artists Links
      displayArtist(artist);
      displaySongs(artist);
    });
    // adding it to the <nav id=”menu”>…</nav>
    menu.appendChild(button);
  });
}

function createButtonForNewArtist() {
  const menu = document.querySelector("#menu");
  // create a <button> element for each
  const button = document.createElement("button");
  // ii.	Use each Artist’s name for the button’s text
  button.textContent = "New Artist Request";
  button.id = "add-artist-button";
  // iii.	When the button is clicked, show that Artist’s Name, Links, and Songs
  button.addEventListener("click", () => {});
  // adding it to the <nav id=”menu”>…</nav>
  menu.appendChild(button);
}

// to display Artist Name with (website, instagram) with hyperlinks as required format
function displayArtist(artist) {
  const selectedArtistTitle = document.querySelector("#selected-artist");
  selectedArtistTitle.innerHTML =
    artist.name +
    " (" +
    artist.urls.map((urls) => `<a href="${urls.url}" target="_blank">${urls.name}</a>`).join(", ") +
    ")";
}

// to display songs of selected artist
function displaySongs(artist) {
  const songsCards = document.querySelector("#cards-container");
  songsCards.innerHTML = "";

  let cardsContainer = document.getElementById("cards-container");
  if (!cardsContainer) {
    cardsContainer = document.createElement("div");
    cardsContainer.id = "cards-container";
    document.body.appendChild(cardsContainer);
  }

  cardsContainer.innerHTML = "";

  // Filter Songs Array for the chosen Artist / NOT flagged (explicit == false)
  const selectedSongs = songs.filter((song) => song.artistId === artist.artistId && !song.explicit);
  selectedSongs.forEach((song) => {
    const songCard = createSongCard(song);
    cardsContainer.appendChild(songCard);
  });
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function createSongCard(song) {
  // <div> to hold the card
  const card = document.createElement("div");
  // Add the .card class to the <div>
  card.classList.add("card");

  // Create a song image, use the .card-image class
  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.alt = song.title;
  songImg.classList.add("card-image");
  card.appendChild(songImg);

  // card building code
  const textBelowImage = document.createElement("div");
  textBelowImage.classList.add("text-below-image");

  const songName = document.createElement("h3");
  songName.classList.add("song-name");
  songName.textContent = song.title;

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");

  const yearRecorded = document.createElement("time");
  yearRecorded.classList.add("year-recorded");
  yearRecorded.textContent = song.year;

  const duration = document.createElement("span");
  duration.classList.add("duration");
  duration.textContent = formatDuration(song.duration);

  infoContainer.appendChild(duration);
  infoContainer.appendChild(yearRecorded);

  textBelowImage.appendChild(songName);
  textBelowImage.appendChild(infoContainer);

  card.appendChild(textBelowImage);

  songImg.addEventListener("click", () => {
    window.open(song.url, "_blank");
  });

  // Return the card’s <div> element to the caller
  return card;
}
