const backgroundRatio = 3840 / 2160; // bg image resolution
$("#game-screen").append($("canvas")); // phaser sometimes REALLY REALLY want to escape
$(document).ready(function() {
  scaleBG();
  $("#game-screen").append($("canvas")); // phaser please stop trying to escape
});

$(window).resize(scaleBG);

function scaleBG() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  console.log(aspectRatio, backgroundRatio);
  if (aspectRatio < backgroundRatio) {
    $("#desktop-background").css("height", "100vh");
    $("#desktop-background").css("width", "auto");
  } else {
    $("#desktop-background").css("height", "auto");
    $("#desktop-background").css("width", "100vw");
  }
  $("#game-screen").append($("canvas")); // just incase phaser wants to escape
}
