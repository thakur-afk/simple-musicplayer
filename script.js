// ??Intializing varibales

let songIndex = 0;
var audio = new Audio("/songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myprogressbar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let activeSong = document.getElementById("activeSong");
activeSong.innerHTML = "wariyo";

let songs = [
  { songname: "wariyo", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
  { songname: "HUma-Huma", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
  { songname: "Invicible", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
  { songname: "My heart", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
  { songname: "Heroes", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
  { songname: "nachna", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },

  { songname: "gaana", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
  { songname: "lee ssi o", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
  {
    songname: "mala se pa",
    filepath: "songs/9.mp3",
    coverpath: "covers/9.jpg",
  },
  {
    songname: "cant say no",
    filepath: "songs/10.mp3",
    coverpath: "covers/10.jpg",
  },
];

masterPlay.addEventListener("click", function (event) {
  // alert(event);

  audio.paused ? fplay() : fpause();
});

function fplay() {
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
  audio.play();
}

function fpause() {
  masterPlay.classList.remove("fa-circle-pause");
  masterPlay.classList.add("fa-circle-play");
  gif.style.opacity = 0;
  //document.querySelector("songInfo");
  audio.pause();
}

audio.addEventListener("timeupdate", function () {
  myprogressbar.value = (audio.currentTime / audio.duration) * 100;
});

myprogressbar.addEventListener("change", function () {
  audio.currentTime = (myprogressbar.value * audio.duration) / 100;
});

Array.from(document.querySelectorAll(".songItem")).forEach((Element, i) => {
  // console.log(Element, i);
  Element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  Element.getElementsByClassName("songName")[0].innerHTML = songs[i].songname;
});

Array.from(document.getElementsByClassName("songPlay")).forEach((Element) => {
  // console.log(Element);
  Element.addEventListener("click", (e) => {
    makeallPlay();
    songIndex = parseInt(e.target.id);
    activeSong.innerHTML = songs[songIndex].songname;

    if (audio.paused) {
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audio.src = `songs/${songIndex + 1}.mp3`;
      fplay();
    } else {
      e.target.classList.add("fa-circle-play");
      e.target.classList.remove("fa-circle-pause");
      //audio.src = `songs/${songIndex + 1}.mp3`;
      fpause();
    }

    // e.target.classList.remove("fa-circle-play");
    // e.target.classList.add("fa-circle-pause");
    // audio.src = `songs/${songIndex + 1}.mp3`;
    // audio.currentTime = 0;
    // fplay();
  });
});

function makeallPlay() {
  Array.from(document.getElementsByClassName("songPlay")).forEach((Element) => {
    Element.classList.remove("fa-circle-pause");
    Element.classList.add("fa-circle-play");
  });
}

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  activeSong.innerHTML = songs[songIndex].songname;
  audio.src = `songs/${songIndex + 1}.mp3`;
  audio.currentTime = 0;
  fplay();
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  activeSong.innerHTML = songs[songIndex].songname;
  audio.src = `songs/${songIndex + 1}.mp3`;
  audio.currentTime = 0;
  fplay();
});
