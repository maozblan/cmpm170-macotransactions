const backgroundRatio = 3840 / 2160; // bg image resolution
$("#phaser-container").append($("canvas")); // phaser sometimes REALLY REALLY want to escape
$(document).ready(function() {
  scaleBG();
  $("#phaser-container").append($("canvas")); // phaser please stop trying to escape
  
  // mock "tab physics"
  $(".tab").draggable({
    handle: ".tab-header",
    drag: function() { reorganizeTabs(`#${$(this).attr('id')}`); },
  });
  $(".tab").click(function() { reorganizeTabs(`#${$(this).attr('id')}`); });

  // setup
  $("#bank-screen-data h1").text(`YOUR CURRENT TOTAL: ${moneyInBank} USD`);
  $('.close').click(function() {
    $(this).parent().parent().hide();
    $(`[data-screen=${$(this).parent().parent().attr('id').slice(0, -7)}]`).toggleClass('active');
  });
  $("#notification").click(() => {openWindow('bank')});
  $(".clickable").click(function() {
    toggleWindow($(this).attr('data-screen'));
  });
  $("#bank-screen").hide();
  $("#transfer-screen").hide();
  $("#game-over").hide();
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
  $("#phaser-container").append($("canvas")); // just incase phaser wants to escape
}

// tab physics
let allTabs = ['#game-screen', '#bank-screen', '#transfer-screen'];
function reorganizeTabs(topTab) {
  allTabs.splice(allTabs.indexOf(topTab), 1);
  allTabs.unshift(topTab);
  for (let i = 1; i <= allTabs.length; ++i) {
    $(allTabs[allTabs.length-i]).css('z-index', i);
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
