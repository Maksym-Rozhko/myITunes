import { videoPlayerInit } from './videoPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';


const playerBtns = document.querySelectorAll('.player-btn');
const playerBlocks = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');


const deactivationBtn = () => {
    temp.style.display = 'none';
    playerBtns.forEach(item => item.classList.remove('active'));
    playerBlocks.forEach(item => item.classList.remove('active'));

    musicPlayerInit.stop();
    videoPlayerInit.stop();
    radioPlayerInit.stop();
};

playerBtns.forEach((btns, i) => btns.addEventListener('click', () => {
    deactivationBtn();
    btns.classList.add('active');
    playerBlocks[i].classList.add('active');
}));

videoPlayerInit();
radioPlayerInit();
musicPlayerInit();   