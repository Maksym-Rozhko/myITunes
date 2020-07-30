import { addZero } from './support.script.js';

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButttonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullscreen = document.querySelector('.video-fullscreen');
    const videoMute = document.querySelector('.video-mute');

    let prevVolume = 1;

    videoFullscreen.addEventListener('click', () => {   
        videoPlayer.requestFullscreen();
    });

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }
    
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButttonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${secondsTotal}`;
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullscreen.addEventListener('clicl', () => {
        videoPlayer.requestFullscreen();
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100; 
    });

    videoVolume.value = videoPlayer.value * 100;

    videoMute.addEventListener('click', () => {
        if (videoPlayer.volume) {
            prevVolume = videoPlayer.volume;
            videoPlayer.volume = 0;
        } else {
            videoPlayer.volume = prevVolume;
        }
    })

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
    };
};


