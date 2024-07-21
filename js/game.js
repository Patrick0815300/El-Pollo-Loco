let canvas;
let world;
let keyboard = new Keyboard();
let isKeyboardEnabled = true;

/**
 * function to initial the game
 */
function init() {
  canvas = document.getElementById("canvas");
  addClassLists();
  initLevel();
  world = new World(canvas, keyboard);
}

/**
 * function to toggle the direction for the game
 */
function directions() {
  document.getElementById("directions").classList.toggle("d-none");
}

/**
 * function to reset the world and reload the side
 */
function resetWorld() {
  init();
  document.getElementById("youwon").classList.add("d-none");
  document.getElementById("youlose").classList.add("d-none");
  document.getElementById("play_again").classList.add("d-none");
}

function returnToMenu() {
  location.reload();
}

/**
 * function to remove the overlay content and add the canvas container
 */
function addClassLists() {
  document.getElementById("content").classList.add("d-none");
  document.getElementById("canvas_container").classList.remove("d-none");
  document.getElementById('mobile_btns').classList.remove('d-none');
}


/**
 * function to for mobile version to track the touch
 */
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btn_left').addEventListener('touchstart', function() {
      keyboard.LEFT = true;
  });
  document.getElementById('btn_left').addEventListener('touchend', function() {
      keyboard.LEFT = false;
  });

  document.getElementById('btn_right').addEventListener('touchstart', function() {
      keyboard.RIGHT = true;
  });
  document.getElementById('btn_right').addEventListener('touchend', function() {
      keyboard.RIGHT = false;
  });

  document.getElementById('btn_jump').addEventListener('touchstart', function() {
      keyboard.SPACE = true;
  });
  document.getElementById('btn_jump').addEventListener('touchend', function() {
      keyboard.SPACE = false;
  });

  document.getElementById('btn_throw').addEventListener('touchstart', function() {
      keyboard.D = true;
  });
  document.getElementById('btn_throw').addEventListener('touchend', function() {
      keyboard.D = false;
  });
});


/**
 * Listener to check the key on keyboard
 * the key set the class Keyboard bolean true or false
 */
function keydownHandler(event) {
  if (!isKeyboardEnabled) return;

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
}

function keyupHandler(event) {
  if (!isKeyboardEnabled) return;

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
}

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function disableKeyboard() {
  isKeyboardEnabled = false;
}

function enableKeyboard() {
  isKeyboardEnabled = true;
}

/**
 * function to mute the audio
 * set the opacity of the button
 */
document.addEventListener("DOMContentLoaded", () => {
  const volumeOffBtn = document.getElementById("volumenOff");
  volumeOffBtn.addEventListener("click", () => {
    if (world) {
      world.toggleSound();
      volumeOffBtn.style.opacity = world.soundMuted ? "0.5" : "1.0";
    }
  });
});

/**
 * function to toggle the fullscreen
 * for different browser
 */
function toggleFullScreen() {
  const canvas = document.getElementById("canvas");
  if (!document.fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      // Firefox
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      // IE/Edge
      canvas.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
}
