import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Songs(props) {
  const [songs, setSongs] = useState([]);
  const [songsOnSearch, setSongsOnSearch] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const [audioElement, setAudioElement] = useState(null);
  const navigation = useNavigate()

  const handleChange = (e) => {
    if (e.target.value) {
      e.preventDefault();
      setSongsOnSearch(
        songs.filter((song) => song.tacgia.toLowerCase().includes(e.target.value.toLowerCase()) || song.tenbaihat.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    } else {
      setSongsOnSearch(songs);
    }
  };

  const handleView = (e) => {
    e.preventDefault();
    const formSearch = document.getElementById('formSearch');
    formSearch.setAttribute('action', `/song/${e.target.dataset.id}`);
    formSearch.submit();
  };
  const handlePlay = (e) => {
    e.preventDefault()
    setCurrentSong(songs[Number(e.target.dataset.id) - 1])
    console.log(Number(e.target.dataset.id))
    console.log(songs)
    console.log(songs[Number(e.target.dataset.id) - 1])
  }
  function init() {
    const audio = document.getElementById("playMusic");
    const source = document.getElementById("playFile");
    const diahinhanh = document.getElementById("diahinhanh");
    const tenbaihat = document.querySelector(".music-name");
    const card = document.querySelector(".music");
    const appEle = document.querySelector(".App");
    // appEle.style.backgroundColor = "#fff";
    card.style.backgroundImage = `url(hinhanh/${currentSong.hinhanh})`
    appEle.style.backgroundImage = `url(hinhanh/${currentSong.hinhanh})`
    diahinhanh.src = "hinhanh/" + currentSong.hinhanh
    tenbaihat.innerText = currentSong.tenbaihat + " ft " + currentSong.tacgia
    source.src = "music/" + currentSong.file

    audio.load()
    if (isPlaying) {
      audio.play()
    }
    displayTimer()
  }

  function handleClickPlay() {
    const audio = document.getElementById("playMusic");
    const thumb = document.querySelector(".music-thumb");

    if (isPlaying) {
      audio.pause()
      console.log("paused");
      setIsPlaying(false);
      thumb.style.animationPlayState = 'paused';
      // thumb.classList.remove("is-playing")
    } else {
      audio.play()
      console.log("playing");
      setIsPlaying(true);
      thumb.style.animationPlayState = 'running';

    }
  }

  function handleNext() {
    if (isRandom) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[randomIndex])
    } else {
      if (songs.indexOf(currentSong) == songs.length - 1) {
        setCurrentSong(songs[0])
      } else {
        setCurrentSong(songs[songs.indexOf(currentSong) + 1])
      }
    }
  }

  function handleBack() {
    if (isRandom) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[randomIndex])
    } else {

      if (songs.indexOf(currentSong) == 0) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[songs.indexOf(currentSong) - 1])
      }
    }
  }

  function handleClickRepeat() {
    const playRepeat = document.querySelector(".play-repeat")
    if (isRepeat) {
      setIsRepeat(false)
      playRepeat.removeAttribute("style");
    } else {
      setIsRepeat(true);
      playRepeat.style.color = "#ffb86c";
    }

  }

  function handleClickRandom() {
    const randomBtn = document.querySelector('.play-infinite');
    if (isRandom) {
      setIsRandom(false)
      randomBtn.removeAttribute("style");
    } else {
      setIsRandom(true);
      randomBtn.style.color = "#ffb86c";
    }
  }


  function handleEndedSong() {
    const audio = document.getElementById("playMusic");
    if (isRepeat) {
      audio.play()
    } else {
      handleNext()
    }
  }

  const handleTimeUpdate = () => {
    const rangeBar = document.getElementById("range");
    if (audioElement !== null) {
      rangeBar.value = audioElement.currentTime
    }
  };

  const handleRangeChange = (e) => {
    setCurrentTime(Number(e.target.value));
  };


  function displayTimer() {
    const audio = document.getElementById("playMusic");
    const rangeBar = document.getElementById("range");
    const durationTime = document.querySelector(".duration");
    const remainingTime = document.querySelector(".remaining");
    audio.addEventListener('loadedmetadata', function () {
      const { duration, currentTime } = audio;
      rangeBar.max = duration;
      rangeBar.value = currentTime;
      remainingTime.textContent = formatTimer(duration);
      durationTime.textContent = "00:00";
    })
  }
  function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
      }`;
  }

  useEffect(() => {
    if (window.localStorage.getItem('isLogin') === 'true') {
      if (songs.length == 0) {
        fetch("http://localhost:8080/songs") 
          .then((response) => response.json())
          .then((data) => {
            setSongs(data);
            setSongsOnSearch(data);
            setCurrentSong(data[0]);
          })
          .catch((err) => console.log(err));
      }
    } else {
      window.localStorage.setItem('ten', '')
      window.localStorage.setItem('taikhoan', '')
      window.localStorage.setItem('matkhau', '')
      window.localStorage.setItem('isLogin', false)
      navigation("/dangnhap", {relative: true});
    }
  }, []);

  useEffect(() => {
    const audio = document.getElementById("playMusic");
    setAudioElement(audio);
    init()
  }, [currentSong])

  useEffect(() => {
    if (audioElement) {
      audioElement.currentTime = currentTime;
    }
  }, [audioElement, currentTime]);



  return (
    <div className="main">
      {/* Search filter */}
      <div>
        <form id="formSearch" className="d-flex" role="search" action="" method="GET">
          <input
            id="inputSearch"
            onChange={handleChange}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      {/* Employees List filtered */}
      <div class="nghenhac">

        <div className="music">
          <div className="music-thumb is-playing">
            <img id="diahinhanh" src="" alt="" />
          </div>

          <h3 className="music-name">Beautiful in white</h3>
          <input onChange={handleRangeChange} min={0} step={1} type="range" name="range" id="range" className="range" />
          <audio
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEndedSong}
            id="playMusic"
            preload="auto"
          >
            <source id="playFile" src=""></source>
          </audio>


          <div className="timer">
            <div className="duration">2:10</div>
            <div className="remaining">-3:10</div>
          </div>
          <div className="controls">
            <div className="play-infinite">
              <ion-icon onClick={handleClickRandom} name="infinite-outline" ></ion-icon>

            </div>
            <div className="play-back">
              <ion-icon onClick={handleBack} name="play-back" ></ion-icon>

            </div>
            <div onClick={handleClickPlay} className="play">
              <div className="player-inner">
                <ion-icon name="play" className="play-icon"></ion-icon>
              </div>
            </div>
            <div className="play-forward">
              <ion-icon onClick={handleNext} name="play-forward" ></ion-icon>

            </div>
            <div className="play-repeat">
              <ion-icon onClick={handleClickRepeat} name="repeat-outline" ></ion-icon>

            </div>
          </div>
        </div>

        <audio
          id="playMusic"
        >
          <source id="playFile" src=""></source>
        </audio>
        <div className="list">
          <h2 className="text-center">List Music</h2>
          <div className="row">
            <table className="mb-0 table table-dark table-striped-columns table-bordered">
              <thead>
                <tr className="">
                  <th>#</th>
                  <th>Tên Bài Hát</th>
                  <th>Tác Giả</th>
                  <th>Album</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {songsOnSearch.map((song) => (
                  <tr key={song.id}>
                    <td>{song.id}</td>
                    <td>{song.tenbaihat}</td>
                    <td>{song.tacgia}</td>
                    <td>{song.album}</td>
                    <td>
                      <button data-id={song.id} onClick={handleView} className="btn btn-view btn-dark">View</button>
                      <button data-id={song.id} onClick={handlePlay} className="btn btn-outline-success">Play</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Form action */}
      <form id="formAction" method="GET" action=""></form>
    </div>
  );
}

export default Songs;