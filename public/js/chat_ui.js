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
  $("#chat-input").val("")
  var outputPlace = $("#chat-output")
  $(document.createTextNode(data.body)).appendTo(outputPlace)
  outputPlace.append("<br>")
}

var submitChatMessage = function(socket) {
  text = getText();
  message = new ChatApp.Chat(socket);
  message.sendMessage(text)
}

var getText = function() {
  return $("#chat-input-field").val()
}
