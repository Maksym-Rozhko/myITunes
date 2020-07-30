import { addZero } from './support.script.js';

export const musicPlayerInit = () => {
    const audio  = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const musicVolume = document.querySelector('.music-volume');
    const musicMute = document.querySelector('.music-mute');
    const playerBlock = document.querySelector('.player-block');

    let prevVolume = 1;

    const playlist = [
        'hello',
        'flow',
        'speed'
    ];

    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }

        audioPlayer.addEventListener('canplay', () => {
            upDateTime();
        })
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    }

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    audioNavigation.addEventListener('click', e => {
        const target = e.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    musicVolume.addEventListener('input', () => {
        audioPlayer.volume = musicVolume.value / 100;
        prevVolume = audioPlayer.volume;
    });

    musicMute.addEventListener('click', () => {
        if (audioPlayer.volume) {
            prevVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
        } else {
            audioPlayer.volume = prevVolume;
        }
    })

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    const upDateTime = () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
        
    };
    upDateTime();

    audioPlayer.addEventListener('timeupdate', upDateTime);

    audioProgress.addEventListener('click', e => {
        const coordX = e.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (coordX / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });
    
    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };
};