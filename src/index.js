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
	FullScreen = document.querySelector('.js-video__fullScreen'),
	videoFullScreen = document.querySelector('.js-videoList__item-video'),
	videoListBtn = document.querySelector('.js-videoList__btn'),
	fullScreenController = document.querySelector('.js-video__fullScreen-controller'),
	fullScreenExitBtn = document.querySelector('.exit'),
	fullScreenPlayBtn = document.querySelector('.play'),
	fullScreenVolumeController = document.querySelector('.fullScreen-volumeController'),
	fullScreenVolumeBtn = document.querySelector('.volume'),
	fullScreenvolumeRange = document.querySelector('.volume-range-background'),
	fullScreenVolumeChange = document.querySelector('.fullScreen-volume-range'),
	currentTime = document.querySelector('.time-played'),
	leftTime = document.querySelector('.time-left'),
	playTimeRange = document.querySelector('.playtime');

// video.autoplay = true;

let isFullScreen = false;
let isMouseMoving =false;

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
    
    if(screen.width > 425) {
        if (scrollHeight > 20) {
            header.classList.add("black");
        } else {
            header.classList.remove("black");
        }
        if(!isFullScreen) {
            if (scrollHeight > 300) {
                pauseVideo();
                
            } else {
                playVideo();
            }
        }
    } else {
        header.classList.add('black');
        if (scrollHeight > 20) {
			header.classList.remove('black');
		} else {
            header.classList.add('black');
		}
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
    if(screen.width>425) {
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
    }

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

const handleEnterFullScreen = event => {
    isFullScreen = true;
    if(!video.paused) {
        pauseVideo();
    }
	FullScreen.webkitRequestFullScreen();
    FullScreen.style.display = 'flex';
    videoFullScreen.play();
    fullScreenPlayBtn.innerHTML = `<i class="fa fa-pause"></i>`;
};

const handleExitFullScreen = event => {
    isFullScreen = false;
    videoFullScreen.pause();
    fullScreenPlayBtn.innerHTML = `<i class="fa fa-play"></i>`;
    FullScreen.style.display = "none";
    document.webkitExitFullscreen();
    
    
}

const handleFullScreenPlay = event => {
    
    if(videoFullScreen.paused) {
        videoFullScreen.play();
        fullScreenPlayBtn.innerHTML = `<i class="fa fa-pause"></i>`;
    } else {
        videoFullScreen.pause();
        fullScreenPlayBtn.innerHTML = `<i class="fa fa-play"></i>`;
    }
}

const handleFullScreenVolumeControllerDisapper = (event) => {
    fullScreenvolumeRange.style.display = "none";
}

const handleFullScreenVolume = () => {
    fullScreenvolumeRange.style.display = 'block';
 
}
const handleFullScreenControllerApper = () => {
    fullScreenController.style.display = 'flex';
    isMouseMoving = true;
    if(!isMouseMoving) {
        setTimeout(() => {
            fullScreenController.style.display = 'none';
        }, 3000);
    }
   
    
}
const handleFullScreenVolumeChange = event => {
    console.log(event.target.value);
    videoFullScreen.volume = event.target.value;
    if (videoFullScreen.volume === 0) {
        fullScreenVolumeBtn.innerHTML = `<i class="fa fa-volume-off"></i>`;
    } else if (videoFullScreen.volume <= 0.4) {
        fullScreenVolumeBtn.innerHTML = `<i class="fa fa-volume-down"></i>`;
	} else {
        fullScreenVolumeBtn.innerHTML = `<i class="fa fa-volume-up"></i>`;
    }
}
const handleTimeUpdate = event => {
    let time = Math.floor(videoFullScreen.currentTime);
    let duration = Math.floor(videoFullScreen.duration);
    let left = duration-time;

    let result = '0:00';
	let sec = 0;
    let min = 0;
    let result_duration = '0:00';
    let sec_duration = 0;
    let min_duration = 0;

    playTimeRange.max = duration;
    playTimeRange.value = time;

	if (time >= 60) {
		min = Math.floor(time / 60);
        sec = time % 60;
		if (sec < 10) {
			sec = `0${sec}`;
		} else if (sec >= 10 && sec < 60) {
			sec = `${sec}`;
		}
	} else if (time < 60) {
		if (time < 10) {
			sec = `0${time}`;
		} else if (time >= 10 && time < 60) {
			sec = `${time}`;
		}
    }
    result = `${min}:${sec}`;
    if (left >= 60) {
        min_duration = Math.floor(left / 60);
        sec_duration = left % 60;
        if (sec_duration < 10) {
            sec_duration = `0${sec_duration}`;
        } else if (sec_duration >= 10 && sec_duration < 60) {
            sec_duration = `${sec_duration}`;
        }
    } else if (left < 60) {
        if (left < 10) {
            sec_duration = `0${left}`;
        } else if (left >= 10 && left < 60) {
            sec_duration = `${left}`;
        }
    }
	result_duration = `${min_duration}:${sec_duration}`;
    
    currentTime.innerHTML = result;
    leftTime.innerHTML = `-${result_duration}`;
}
const handlePlayTimeRange = event => {
    videoFullScreen.currentTime = event.target.value;
}

const handleFullScreenChange = event => {
    
    if(!document.webkitIsFullScreen) {
        isFullScreen = false;
        videoFullScreen.pause();
        fullScreenPlayBtn.innerHTML = `<i class="fa fa-play"></i>`;
        FullScreen.style.display = "none";
        document.webkitExitFullscreen();
    }
}

const handleHideFullScreenController = event => {
    console.log(event);
    fullScreenController.style.display = "none";
}

const playVideo = event => {
    video.play();
    if(!video.paused) {
        // console.log(playBtn.children);
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
FullScreen.addEventListener('mousemove', handleFullScreenControllerApper);
videoItemPlayBtn.addEventListener('click', handleEnterFullScreen);
fullScreenExitBtn.addEventListener("click", handleExitFullScreen);
fullScreenPlayBtn.addEventListener("click", handleFullScreenPlay);
fullScreenVolumeController.addEventListener('mouseleave', handleFullScreenVolumeControllerDisapper);
fullScreenVolumeBtn.addEventListener("mouseenter", handleFullScreenVolume);
fullScreenVolumeChange.addEventListener("change", handleFullScreenVolumeChange);
videoFullScreen.addEventListener("timeupdate", handleTimeUpdate);
playTimeRange.addEventListener("change", handlePlayTimeRange);
document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
fullScreenController.addEventListener("mouseleave", handleHideFullScreenController);
// videoListBtn.addEventListener("hover")

// searchInput.addEventListener("change", handleSearchInput);




