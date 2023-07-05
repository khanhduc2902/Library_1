const song = document.getElementById("playMusic");
const file = document.getElementById("playFile");
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

console.log("sucess!!!")

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [

  {
    id: 1,
    title: "Anh sai rồi-Sơn Tùng MTP",
    file: "music/b1.mp3",
    image: "https://i.ytimg.com/vi/niPkap1ozUA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCT9eKRng0RYKBRJrOY8dvMAWSp6Q",
  },
  {
    id: 2,
    title: "Bình yên những phút giây-Sơn Tùng MTP",
    file: "music/b2.mp3",
    image: "https://i.ytimg.com/vi/xypzmu5mMPY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCT9eKRng0RYKBRJrOY8dvMAWSp6Q",

  },
  {
    id: 3,
    title: "Muộn rồi mà sao còn-Sơn Tùng MTP",
    file: "music/b3.mp3",
    image: "../background/bg3.jpg",
  },
  {
    id: 4,
    title: "Chúng ta không thuộc về nhau-Sơn Tùng MTP",
    file: "music/b4.mp3",
    image: "../background/bg4.jpg",
  },
  {
    id: 5,
    title: "Thái Bình mồ hôi rơi-Sơn Tùng MTP",
    file: "music/b5.mp3",
    image: "../background/bg5.jpg",
  },
  {
    id: 6,
    title: "Buông đôi tay nhau ra-Sơn Tùng MTP",
    file: "music/b6.mp3",
    image: "../background/bg6.jpg",
  },
  {
    id: 7,
    title: "Năm mới bình an-Sơn Tùng MTP",
    file: "music/b7.mp3",
    image: "music",
  },
  {
    id: 8,
    title: "Cơn mưa ngang qua-Sơn Tùng MTP",
    file: "music/b8.mp3",
    image: "music",
  },


];
/**
 * Music
 * id: 1
 * title: tiêu đề
 * file: file.mp3
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
   //song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.load()
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
  file.src = `music/${musics[indexSong].file}`;
  song.load()
  song.play()
  console.log(file.src);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);


const handleSearch =  function() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value;
  const searchRs = document.getElementById("search-results");

  let found = -1;
  musics.forEach(music => {
    if (searchQuery.toUpperCase() === music.title.toUpperCase()) {
      init(music.id-1);
      searchRs.innerHTML = "Đã tìm thấy bài hát mời bạn thưởng thức <3"
      found = 1;
    }
  });
  if (found == "-1") {

    searchRs.innerHTML = "Không tìm thấy bài hát. Vui lòng tìm kiếm lại tên bài hát";

  }
};