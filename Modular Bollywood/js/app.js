/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Tirth >
 *      Student ID: <172244212>
 *      Date:       <24/03/23>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

// create arrays of songs for the artists
let DarshanRaval = [];
let AtifAslam = [];
let ArRahman = [];

for (let i = 0; i < songs.length; i++) {
  const { artistId, flagged, title } = songs[i];
  if (artistId === "id-dars" && flagged === false) {
    DarshanRaval.push(title);
  } else if (artistId === "id-atif" && flagged === false) {
    AtifAslam.push(title);
  } else if (artistId === "id-rahman" && flagged === false) {
    ArRahman.push(title);
  }
}

//  dynamic navbar
let menu = document.getElementById("menu");
for (let i = 0; i < artists.length; i++) {
  let newMenuItem = document.createElement("button");
  newMenuItem.textContent = artists[i].name;
  newMenuItem.id = artists[i].name;
  menu.appendChild(newMenuItem);
}

// prints the song of selected artist
function printArtist(artist) {
  let tableRows = document.getElementsByClassName("tbl_row");

  if (artist === "id-dars") {
    for (let i = 0; i < DarshanRaval.length; i++) {
      tableRows[i].addEventListener("click", function () {
        console.log(DarshanRaval[i]);
      });
    }
  } else if (artist === "id-atif") {
    for (let i = 0; i < AtifAslam.length; i++) {
      tableRows[i].addEventListener("click", function () {
        console.log(AtifAslam[i]);
      });
    }
  } else if (artist === "id-rahman ") {
    for (let i = 0; i < ArRahman.length; i++) {
      tableRows[i].addEventListDener("click", function () {
        console.log(ArRahman[i]);
      });
    }
  }
}

// create the cells for a particular artist
function createCell(artist) {
  var tbodyRef = document.getElementById("songs");
  var newRow, newCell, newText;

  // go through all the songs and create rows
  for (let i = 0; i < songs.length; i++) {
    document.createElement("tr");
    if (songs[i].artistId === artist && songs[i].flagged === false) {
      // title
      newRow = tbodyRef.insertRow();
      newRow.className = "tbl_row";
      newCell = newRow.insertCell();
      newText = document.createTextNode(songs[i].title);
      newCell.appendChild(newText);

      // year
      newCell = newRow.insertCell();
      newCell.id = i;
      newText = document.createTextNode(songs[i].year);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();

      // duration in seconds

      const minutes = Math.floor(songs[i].duration / 60);
      const remainingSeconds = songs[i].duration % 60;

      newText = document.createTextNode(`${minutes}:${remainingSeconds}`);
      newCell.appendChild(newText);
    }
  }
}

// display Eminemby default
document.getElementById("songs").innerHTML = "";
document.getElementById("selected-artist").textContent = "Darshan Raval ";
createCell("id-dars");

// to show a song list based on the artist and update the heading
function showSongList(artist) {
  // clearance
  document.getElementById("songs").innerHTML = "";

  // changing names to IDs
  for (let j = 0; j < artists.length; j++) {
    if (artists[j].name === artist) {
      artist = artists[j].id;
    }
  }

  // creating cells for songs
  createCell(artist);
  printArtist(artist);
}

// change heading and display song list
let menuArr = document.querySelector("#menu").querySelectorAll("button");
for (let i = 0; i < menuArr.length; i++) {
  menuArr[i].addEventListener("click", function () {
    document.getElementById("selected-artist").innerHTML = menuArr[i].textContent;
    showLinks(menuArr[i].textContent);
    showSongList(menuArr[i].textContent);
  });
}
// links
function showLinks(selectedArtist) {
  const headingElem = document.getElementById("selected-artist");

  artists.forEach((artist) => {
    if (artist.name === selectedArtist) {
      const linksCon = document.createElement("span");
      linksCon.classList.add("small");
      const openingBr = document.createTextNode(" (");
      linksCon.appendChild(openingBr);

      artist.links.forEach((link, index) => {
        const linkAnchor = document.createElement("a");
        linkAnchor.setAttribute("href", link.url);
        linkAnchor.textContent = link.name;
        linksCon.appendChild(linkAnchor);

        if (index < artist.links.length - 1) {
          const comma = document.createTextNode(", ");
          linksCon.appendChild(comma);
        }
      });

      const closingBr = document.createTextNode(")");
      linksCon.appendChild(closingBr);
      headingElem.appendChild(linksCon);
    }
  });
}

// call default
printArtist("id-dars");
showLinks("Darshan Raval");
