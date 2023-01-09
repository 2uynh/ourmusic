const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [
  {
    id: 1,
    title: "Every Summertime",
    file: "EverySummertime.mp3",
    image:
      "https://i.scdn.co/image/ab67616d0000b273d00cc26852fcc281296977be",
  },

  {
    id: 2,
    title: "Peaches",
    file: "peaches.mp3",
    image:
      "https://media-cdn-v2.laodong.vn/storage/newsportal/2021/6/21/922737/MV-Peaches-Justin-Bi.jpg",
  },

  {
    id: 3,
    title: "Only",
    file: "only.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2021/09/09/1/7/4/2/1631178773324_640.jpg",
  },

  {
    id: 4,
    title: "Still With You",
    file: "stwy.mp3",
    image:
      "https://i1.sndcdn.com/artworks-7nmc0L048KDmtv7Q-aSOK7A-t500x500.jpg",
  },

  {
    id: 5,
    title: "Heartbreak Anniversary",
    file: "heartbre.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2020/04/13/4/9/0/0/1586796801556_640.jpg",
  },

  {
    id: 6,
    title: "Love me",
    file: "loveme.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2022/07/30/5/0/c/b/1659159502044_640.jpg",
  },

];
/**
 * Music
 * id: 1
 * title: Holo
 * file: holo.mp3
 * image: unsplash
 */
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    // handle repeat song
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  // song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}
function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
function init(indexSong) {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);