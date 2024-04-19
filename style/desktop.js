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

// transfering money in and out of the game
function transfer() {
  // reset transfer form
  $("#transfer-form input[type='checkbox']").prop('checked', false);
  $("#transfer-form input[type='number']").val('');
  $("#transfer-warning").text('');
  $("#transfer-loading").hide();
  $("#transfer-loading").text('Processing...');
  $("#transfer-form").show();

  // pull up transfer popup
  setTimeout(() => {
    openWindow('transfer');
  }, 150);
}
$(document).ready(function() { // didn't feel like grouping :/
  // single select
  $("#transfer-form input[type='checkbox']").click(function() {
    if ($(this).is(':checked')) {
      // disable multiselect for same category
      $(`#${$(this).parent().attr('id')} input[type='checkbox']`).not(this).prop('checked', false);
      // disable multiselect for same value
      $(`#transfer-form input[type='checkbox'][value='${$(this).val()}']`).not(this).prop('checked', false);
    }
  });

  // form submission
  $("#transfer-form").submit(function(event) {
    event.preventDefault();
    // get values
    const from = $("#transfer-from input[type='checkbox']:checked").val();
    const to = $("#transfer-to input[type='checkbox']:checked").val();
    const amount = parseFloat($("#transfer-amount").val()? $("#transfer-amount").val() : 100);
    console.log(from, to, amount);
    if (from === 'bank' && moneyInBank < amount) {
      $("#transfer-warning").text("Insufficient funds in bank account.");
      return;
    } else if (from === 'game' && playerInGame.money < amount) {
      $("#transfer-warning").text("Insufficient funds in stock account.");
      return;
    } else {
      $("#transfer-form").hide();
      $("#transfer-loading").show();
      $("#transfer-warning").text('');
      setTimeout(() => {
        $("#transfer-loading").text('Transfer Complete. You can close this window.');
        if (from === 'bank') {
          playerInGame.money += amount;
          charge("transfer to macrotransactions.app", -1*amount);
        } else {
          charge("transfer from macrotransactions.app", amount);
          playerInGame.money -= amount;
        }
        setTimeout(() => { // belated notif cuz why not
          notify('ACCOUNT NOTIFICATION', `You have successfully transferred ${amount} USD from ${from === 'game'? 'macrotransactions.app to your account ending in 6942' : 'your account ending in 6942 to macrotransactions.app'}.`);
        }, 1000);
      }, 1500);
    }
  });
});
