import "./styles.css";

const header = document.querySelector('.js-header'),
	video = document.querySelector('.js-video'),
	muteBtn = document.querySelector('.js-muteBtn'),
    playBtn = document.querySelector('.js-playBtn__container'),
    playBtnIcon = document.querySelector('.js-playBtn'),
	volumeController = document.querySelector('.js-volumeController'),
	volumeRange = document.querySelector('.js-volumeRange'),
	search = document.querySelector('.js-header__others-search'),
	searchInput = document.querySelector('.js-search'),
	searchForm = document.querySelector('.js-search-form'),
	videoItems = document.querySelectorAll('.js-videoList__item'),
	videoList = Array.from(videoItems),
	videoItemPlayBtn = document.querySelector('.js-videoList__item-playBtn'),
    videoFullScreen = document.querySelector('.js-videoList__item-video'),
    videoListBtn = document.querySelector('.js-videoList__btn');

// video.autoplay = true;

const loadSettings = () => {
    console.log(videoList);
    const loadMute = localStorage.getItem("muted");
    volumeRange.value = video.volume;

    // Returned loadMute is not a boolean, it is a string!!
    if(loadMute === "true") {
        muteSound();
    } else {
        unmuteSound();
    }
}

video.onended = () => {
    pauseVideo();
}

const handleScroll = event => {
    const scrollHeight = window.scrollY;
    // console.log(scrollHeight);
    if (scrollHeight > 20) {
        header.classList.add("black");
    } else {
        header.classList.remove("black");
    }
    
    if (scrollHeight > 300) {
        pauseVideo();
        
    } else {
        playVideo();
    }
    
};

const handleMute = () => {
    const isMute = video.muted;
    if (isMute) {
        // If is muted, change it to unmuted 
        unmuteSound();
        volumeRange.value = video.volume;
        localStorage.setItem("muted", false);
    } else {
        // If is not muted, change it to muted
        muteSound();
        localStorage.setItem('muted', true);
    }
};

const handlePlay = () => {
    const isPaused = video.paused;
    if(isPaused) {
        // Play the video, and change the play button text to pause
        playVideo();
        
    } else {
        // Pause the video, and change the pause button text to play
        pauseVideo();
    }
}

const handleVolume = event => {
    video.volume = event.target.value;
    if(video.volume === 0) {
        muteSound();
    } else {
        unmuteSound();
    }
}

const handleSearch = event => {
    console.log(event.target);
    const searchClass = event.target.className;
    if(searchClass.includes("fa-search")) {
        search.innerHTML = `
        <form class="js-search-form">
        <i class="fa fa-times fa-lg js-searchCloseBtn"></i>
        <input class="js-search open" type="text" placeholder="Title, peple, genres" />
        </form>`;
    } else if(searchClass.includes("js-searchCloseBtn")) {
        search.innerHTML = `<i class="fa fa-search fa-lg"></i>`;
    }
    
    
}
const handleSearchInput = event => {

}
const handleSubmit = event => {
    event.preventDefault();
}

const handleMouseEnter = event => {
    volumeRange.style.display="block";
}

const handleMouseLeave = event => {
    volumeRange.style.display = "none";
}

const handleMouseEnterVideoList = event => {
    const selectedVideo = event.target;
    selectedVideo.children[1].style.display="flex";
    selectedVideo.children[2].style.display = "flex";
    if(selectedVideo.previousElementSibling === null) {
        selectedVideo.classList.add("selected-left");
    } else if(selectedVideo.nextElementSibling === null) {
        selectedVideo.classList.add('selected-right');
    } else {
        selectedVideo.classList.add("selected");
    }

    moveBoxesRight(selectedVideo);
    moveBoxesLeft(selectedVideo);

    // videoListBtn.style.display="flex";

}

const handleMouseLeaveVideoList = event => {
    
    const selectedVideo = event.target;
    selectedVideo.children[1].style.display = "none";
    selectedVideo.children[2].style.display = "none";
    // selectedVideo.classList.remove("selected");
    videoList.forEach(video => {
		video.classList.remove('selected',"selected-left","selected-right", 'right', 'left');
    });
    // videoListBtn.style.display = "none";
}

const moveBoxesRight = selectedVideo => {
    const nextBox = selectedVideo.nextElementSibling;
    if (nextBox !== null) {
        nextBox.classList.add("right");
        if (nextBox.nextElementSibling !== null) {
            moveBoxesRight(nextBox);
        }
    }
};

const moveBoxesLeft = selectedVideo => {
    const prevBox = selectedVideo.previousElementSibling;
    if (prevBox !== null) {
        prevBox.classList.add("left");
        if (prevBox.nextElementSibling !== null) {
            moveBoxesLeft(prevBox);
        }
    }
};

const handleVideoPlay = event => {
    console.log("Play FullScreen!");
    if (videoFullScreen.paused) {
        if (videoFullScreen.requestFullscreen) {
            videoFullScreen.requestFullscreen();
        }
        else if (videoFullScreen.msRequestFullscreen) {
            videoFullScreen.msRequestFullscreen();
        }
        else if (videoFullScreen.mozRequestFullScreen) {
            videoFullScreen.mozRequestFullScreen();
        }
        else if (videoFullScreen.webkitRequestFullScreen) {
            videoFullScreen.webkitRequestFullScreen();
        } 
        videoFullScreen.play();
    } 
    else {
        videoFullScreen.pause();
    }
    
}

const playVideo = event => {
    video.play();
    if(!video.paused) {
        console.log(playBtn.children);
        playBtnIcon.innerHTML = `<i class="fa fa-pause"></i>`;
    }
}

const pauseVideo = event => {
    video.pause();
    playBtnIcon.innerHTML = `<i class="fa fa-play"></i>`;
}

const muteSound = event => {
    video.muted = true;
    muteBtn.innerHTML = `<i class="fa fa-volume-off fa-lg"></i>`;
    volumeRange.value = 0;
}
const unmuteSound = event => {
    video.muted = false;
    muteBtn.innerHTML = `<i class="fa fa-volume-up fa-lg"></i>`;
};


loadSettings();

videoList.forEach(video => {
	video.addEventListener('mouseenter', handleMouseEnterVideoList);
	video.addEventListener('mouseleave', handleMouseLeaveVideoList);
});
muteBtn.addEventListener("click", handleMute);
muteBtn.addEventListener('mouseenter', handleMouseEnter);
volumeController.addEventListener('mouseleave', handleMouseLeave);
playBtn.addEventListener("click", handlePlay);
volumeRange.addEventListener("change", handleVolume);
search.addEventListener("click", handleSearch);
window.addEventListener('scroll', handleScroll);
videoItemPlayBtn.addEventListener("click", handleVideoPlay);
// videoListBtn.addEventListener("hover")

// searchInput.addEventListener("change", handleSearchInput);
searchForm.addEventListener("submit", handleSubmit);



