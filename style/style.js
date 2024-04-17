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

  // setup
  $("#bank-screen-data h1").text(`YOUR CURRENT TOTAL: ${moneyInBank} USD`);
  $('.close').click(function() {
    $(this).parent().hide();
    $(`[data-screen=${$(this).parent().attr('id').slice(0, -7)}]`).toggleClass('active');
  });
  $("#notification").click(() => {openWindow('bank')});
  $(".clickable").click(function() {
    toggleWindow($(this).attr('data-screen'));
  });
  $("#bank-screen").hide();
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

// tab physics
let openTabs = ['#game-screen', '#bank-screen'];
function reorganizeTabs(topTab) {
  openTabs.splice(openTabs.indexOf(topTab), 1);
  openTabs.unshift(topTab);
  for (let i = 1; i <= openTabs.length; ++i) {
    $(openTabs[openTabs.length-i]).css('z-index', i);
  }
}
function toggleWindow(w) {
  if ($(`[data-screen=${w}]`).hasClass('active')) {
    closeWindow(w);
  } else {
    openWindow(w);
  }
}
function openWindow(w) {
  $(`#${w}-screen`).show();
  $(`[data-screen=${w}]`).toggleClass('active');
  reorganizeTabs(`#${w}-screen`);
}
function closeWindow(w) {
  $(`#${w}-screen`).hide();
  $(`[data-screen=${w}]`).toggleClass('active');
}
