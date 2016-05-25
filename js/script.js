var player;
var intv;
var slider;
var numminutes;
var numseconds;

window.onload = function() {
    document.getElementById('btnPlay').addEventListener('click', playMusic, false);
    document.getElementById('btnPause').addEventListener('click', pauseMusic, false);
    document.getElementById('btnStop').addEventListener('click', stopMusic, false);
    document.getElementById('btnVolUp').addEventListener('click', volUp, false);
    document.getElementById('btnVolDown').addEventListener('click', volDown, false);

    player = document.getElementById('player');
    slider = document.getElementById('silderTime');
    slider.addEventListener('change', reposition, false);
}

function playMusic() {
    player.play();
    intv = setInterval(update, 100);
    slider.max = player.duration;
}

function pauseMusic() {
    player.pause();
    clearInterval(intv);
}

function stopMusic() {
    player.pause();
    player.currentTime = 0;
    clearInterval(intv);
    slider.value = 0;
    document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
}

function volUp() {
    if (player.volume <= 1 && player.volume >= 0) {
        player.volume += 0.1;
    } else {
        player.volume = 1;
    }
}

function volDown() {
    if (player.volume > 0 && player.volume <= 1) {
        player.volume -= 0.1;
    } else {
        player.volume = 0;
    }
}

function update() {
  document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
  slider.value = player.currentTime;
}

function millisToMins(seconds) {
  numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  if (numseconds >= 10) {
    return "Time elapsed: " + numminutes + ":" + Math.round(numseconds);
  }
  else {
    return "Time elapsed: " + numminutes + ":0" + Math.round(numseconds);
  }
}

function reposition() {
  player.currentTime = slider.value;
}
