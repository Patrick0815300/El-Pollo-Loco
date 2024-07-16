let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('content').classList.add('d-none');
    document.getElementById('canvas_container').classList.remove('d-none');
    initLevel();
    world = new World(canvas, keyboard);
    
}


function directions() {
    document.getElementById('directions').classList.toggle('d-none');
}

function resetWorld() {
    location.reload();
}


/**
 * Listener to check the key on keyboard
 * the key set the class Keyboard bolean true or false 
 */
document.addEventListener('keydown', (event) => { 
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})

document.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})


document.addEventListener('DOMContentLoaded', () => {
    const volumeOffBtn = document.getElementById('volumenOff');
    volumeOffBtn.addEventListener('click', () => {
        if (world) {
            world.toggleSound();
            volumeOffBtn.style.opacity = world.soundMuted ? '0.5' : '1.0';
        }
    });
});

/**
 * function to toggle the fullscreen
 * for different browser
 */
function toggleFullScreen() {
    const canvas = document.getElementById('canvas');
    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) { // Firefox
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) { // IE/Edge
            canvas.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

