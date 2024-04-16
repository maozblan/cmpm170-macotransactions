$(window).resize(function() {
  // scale background
  const aspectRatio = window.innerWidth / window.innerHeight;
  const backgroundRatio = 3840 / 2160; // bg image resolution
  console.log(aspectRatio, backgroundRatio);
  if (aspectRatio < backgroundRatio) {
    $("#desktop-background").css("height", "100vh");
    $("#desktop-background").css("width", "auto");
  } else {
    $("#desktop-background").css("height", "auto");
    $("#desktop-background").css("width", "100vw");
  }
});