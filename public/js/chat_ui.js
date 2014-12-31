$(function() {
  var socket = io();

  $("#chat-input").on("submit", function(e){
    submitChatMessage(socket);
  });

  socket.on('message', function(data){
    addChatToHTML(data);
  });

});

var addChatToHTML = function(data) {
  $("#chat-input").val("");
  var message = document.createTextNode(data.body)
  var classType = data.aaron ? "from-aaron" : "from-user"
  $("#chat-output").append(
    $("<li>").append(message).addClass(classType)
  );
}

var submitChatMessage = function(socket) {
  text = getText();
  message = new ChatApp.Chat(socket);
  message.sendMessage(text)
}

var getText = function() {
  return $("#chat-input-field").val()
}
