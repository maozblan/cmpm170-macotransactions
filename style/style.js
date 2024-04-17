const backgroundRatio = 3840 / 2160; // bg image resolution
$("#game-screen").append($("canvas")); // phaser sometimes REALLY REALLY want to escape
$(document).ready(function() {
  scaleBG();
  $("#game-screen").append($("canvas")); // phaser please stop trying to escape
  
  // mock "tab physics"
  $(".tab").draggable();
  $(".tab").click(function() {
    reorganizeTabs(`#${$(this).attr('id')}`);
  });
});

$(window).resize(scaleBG);

function scaleBG() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  // console.log(aspectRatio, backgroundRatio);
  if (aspectRatio < backgroundRatio) {
    $("#desktop-background").css("height", "100vh");
    $("#desktop-background").css("width", "auto");
  } else {
    $("#desktop-background").css("height", "auto");
    $("#desktop-background").css("width", "100vw");
  }
  $("#game-screen").append($("canvas")); // just incase phaser wants to escape
}

let openTabs = ['#game-screen', '#bank-screen'];
function reorganizeTabs(topTab) {
  openTabs.splice(openTabs.indexOf(topTab), 1);
  openTabs.unshift(topTab);
  for (let i = 1; i <= openTabs.length; ++i) {
    $(openTabs[openTabs.length-i]).css('z-index', i);
  }
}
