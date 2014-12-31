$(function() {
  var socket = io();

  $("form#chat-input-form").on("submit", function(e){
    e.preventDefault();
    sendAjax(socket)
  });

  socket.on('message', function(data){
    addChatToHTML(data);
  });

});

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


var addChatToHTML = function(data) {
  if(data.aaron !== undefined) {
    $("#chat-input").val("");
    var message = document.createTextNode(data.body)
    var classType = data.aaron ? "from-aaron" : "from-user"
    $("#chat-output").prepend(
      $("<li>").append(message).addClass(classType)
    );
  }
}

var submitChatMessage = function(socket) {
  text = getText();
  message = new ChatApp.Chat(socket);
  message.sendMessage(text)
}

var getText = function() {
  return $("#chat-input").val()
}
