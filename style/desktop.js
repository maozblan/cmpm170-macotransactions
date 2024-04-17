const notifications = []; // tracks open notifications
function notify(title='', text='') { // spawns notification
  if (notifications.length && notifications[0]) { // last notification was open
    // close it
    $("#notification").animate({
      left: $(window).width() + 450,
      opacity: 0.5,
    }, 300, () => { updateNotification(title, text) });
    notifications[0] = false;
  } else {
    updateNotification(title, text);
  }
}
// helper function so the "new" notifcation doesn't opens before the old one is closed
function updateNotification(title, text) { // helper
  // update text for new notfification
  $("#notification-title").text(title);
  $("#notification-text").text(text);

  // "new" notification
  notifications.unshift(true);
  $("#notification").animate({
    left: $(window).width() - 410,
    opacity: 1,
  }, 500, function() { // on complete remove notification
    setTimeout(function() { // give it some time
      if (notifications.pop()) {
        $("#notification").animate({
          left: $(window).width() + 450,
          opacity: 0.5,
        }, 500);
      }
    }, 2000); // shows for 2 seconds
  });
}

// handling bank account page
var moneyInBank = 100;
function charge(text, amount) {
  // input a money thing
  let container = $('<div>');
  container.addClass('money-input');
  container.append($('<p>').text(text));
  container.append($('<p>').text(parseFloat(amount).toFixed(2))
    .addClass(amount > 0 ? 'money-add' : 'money-sub'));
  $("#money-changes").prepend(container);

  // update global variables
  moneyInBank += amount;
  $("#bank-screen-data h1").text(`YOUR CURRENT TOTAL: ${moneyInBank} USD`);
}
