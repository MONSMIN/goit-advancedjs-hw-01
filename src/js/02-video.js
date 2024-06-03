import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);


const STORAGE_KEY = 'videoplayer-current-time';


const saveCurrentTime = throttle((currentTime) => {
    localStorage.setItem(STORAGE_KEY, currentTime);
}, 1000);


player.on('timeupdate', (event) => {
    saveCurrentTime(event.seconds);
});


const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime !== null) {
    player.setCurrentTime(parseFloat(savedTime)).catch((error) => {
        console.error(error);
    });
}
