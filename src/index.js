import "./styles.css";

const header = document.querySelector(".js-header"),
    video = document.querySelector(".js-video"),
    muteBtn = document.querySelector(".js-muteBtn"),
    playBtn = document.querySelector(".js-playBtn"),
    volumeRange = document.querySelector(".js-volumeRange"),
    search = document.querySelector(".js-header__others-search"),
    searchInput = document.querySelector(".js-search"),
    searchForm = document.querySelector(".js-search-form");

// video.autoplay = true;

const loadSettings = () => {
    const loadMute = localStorage.getItem("muted");
    volumeRange.value = video.volume;
    // Returned loadMute is not a boolean, it is a string!!
    if(loadMute === "true") {
        video.muted = true;
        volumeRange.value = 0;
        muteBtn.innerHTML="Unmute";
    } else {
        video.muted = false;
        
        muteBtn.innerHTML="mute";
    }
}

video.onended = () => {
    playBtn.innerHTML="Play";
}

const handleScroll = event => {
    const scrollHeight = window.scrollY;
    // console.log(scrollHeight);
    if (scrollHeight > 20) {
        header.classList.add("black");
    } else {
        header.classList.remove("black");
    }

    if (scrollHeight > 500) {
        video.pause();
        playBtn.innerHTML = "Play";
        
    } else {
        video.play();
        video.onplay = () => {
            playBtn.innerHTML = 'Pause';
        }
    }
};

const handleMute = () => {
    const isMute = video.muted;
    if (isMute) {
        // If is muted, change it to unmuted 
        video.muted = false;
        muteBtn.innerHTML="mute";
        volumeRange.value = video.volume;
        localStorage.setItem("muted", false);
    } else {
        // If is not muted, change it to muted
        
        video.muted = true;
        muteBtn.innerHTML="Unmute";
        volumeRange.value = 0;
        localStorage.setItem('muted', true);
    }
};

const handlePlay = () => {
    const isPaused = video.paused;
    // console.log(isPaused);
    if(isPaused) {
        // Play the video, and change the play button text to pause
        video.play();
        playBtn.innerHTML = "Pause";
        
    } else {
        // Pause the video, and change the pause button text to play
        video.pause();
        playBtn.innerHTML="Play";
    }
}

const handleVolume = event => {
    video.volume = event.target.value;
    // console.log(event.target.value);
}

const handleSearch = event => {
    console.log(event.target);
    const searchClass = event.target.className;
    console.log(searchClass);
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
    console.log(searchInput.value);
}
const handleSubmit = event => {
    console.log("hello!");
    event.preventDefault();
}

loadSettings();

muteBtn.addEventListener("click", handleMute);
playBtn.addEventListener("click", handlePlay);
volumeRange.addEventListener("change", handleVolume);
search.addEventListener("click", handleSearch);
window.addEventListener('scroll', handleScroll);
// searchInput.addEventListener("change", handleSearchInput);
searchForm.addEventListener("submit", handleSubmit);


