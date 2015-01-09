$(function() {
  var socket = io();

  $("form#chat-input-form").on("submit", function(e){
    e.preventDefault();
    sendAjax(socket);
    sendToTwilio();
    $("#chat-input").val("");
  });

  socket.on('message', function(data){
    addChatToHTML(data);
  });

});

var addChatToHTML = function(data) {
  if(data.aaron !== undefined) {
    var message = document.createTextNode(data.body)
    var classType = data.aaron ? "from-aaron" : "from-user"
    $("#chat-output").prepend(
      $("<p>").append(message).addClass(classType)
    );
  }
}

var sendAjax = function(socket) {
  $.ajax({
    url: '/messages',
    type: "POST",
    data: {body: getText()},
    success: function(response){
      submitChatMessage(socket);
    },
    fail: function(error) {
      console.log(error)
    }
  });
}

var sendToTwilio = function() {
  var text = getText();
  var aaron = '+14152720970';
  $.ajax({
    url: '/sms',
    data: {
      body: text,
      to: aaron
    },
    success: function(){
      console.log('successful ajax')
    }
  })
}

var submitChatMessage = function(socket) {
  text = getText();
  message = new ChatApp.Chat(socket);
  message.sendMessage(text)
}

var getText = function() {
  return $("#chat-input").val()
}
