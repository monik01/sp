document.addEventListener('DOMContentLoaded', (event) => {
    // Initialized variable 
    let songIndex = 0;
    let audioElement = new Audio('songs/galgoto.mp3');
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myProgressBar');
    let gif = document.getElementById('gif');
    let masterSongName = document.getElementById('masterSongName');
    let songItems = Array.from(document.getElementsByClassName('songItem'));
    let volumeControl = document.getElementById('volume');
    let currentTimeDisplay = document.getElementById('current-time');
    let totalTimeDisplay = document.getElementById('total-time');

    let songs = [
        { songName: "Galgoto", filepath: 'songs/galgoto.mp3', coverpath: "covers/galgoto.jpg" },
        { songName: "Tetudo", filepath: 'songs/tetudo.mp3', coverpath: "covers/tetudo.jpg" },
        { songName: "Kapda Matching", filepath: 'songs/kapda.mp3', coverpath: "covers/n.jpg" },
    ];

    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverpath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    });

    volumeControl.addEventListener('input', () => {
        audioElement.volume = volumeControl.value;
    });

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const updateCoverArt = () => {
        currentCover.src = songs[songIndex].coverpath;
    }

    const updateSongIcons = () => {
        makeAllPlays();
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
    };

    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            updateCoverArt();
            updateSongIcons();

            masterSongName.innerText = songs[songIndex].songName;
        } else {
            audioElement.pause()
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;

            makeAllPlays();
        }
    });

    // Listen to events
    audioElement.addEventListener('timeupdate', () => {
        // Update seek bar
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;

        currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
        totalTimeDisplay.innerText = formatTime(audioElement.duration);
    });

    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    });

    const makeAllPlays = () => {
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        });
    };

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
        element.addEventListener('click', (e) => {
            if (songIndex === index && !audioElement.paused) {
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            } else {
                makeAllPlays();
                songIndex = index;

                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = songs[songIndex].filepath;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;

                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');

                updateCoverArt();
                updateSongIcons();
            }
        })
    });

    document.getElementById('next').addEventListener('click', () => {
        if (songIndex >= songs.length - 1) {
            songIndex = 0
        } else {
            songIndex += 1;
        }
        audioElement.src = songs[songIndex].filepath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        updateCoverArt();
        updateSongIcons();
    });

    document.getElementById('previous').addEventListener('click', () => {
        if (songIndex <= 0) {
            songIndex = 0
        } else {
            songIndex -= 1;
        }
        audioElement.src = songs[songIndex].filepath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        updateCoverArt();
        updateSongIcons();
    })
});
