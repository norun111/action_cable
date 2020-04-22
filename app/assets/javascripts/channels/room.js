App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    console.log('connected');
  },
  disconnected: function() {

  },
  received: function(message) {
    const messages = document.getElementById('messages')
    messages.innerHTML += `<li class="list-group-item">
                            <p>${message}</p>
                          </li>`

  },
  speak: function(content) {
    return this.perform('speak', {message: content});
    // room_channelのspeakメソッドを実行
  }
});

document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('chat-input');
  const button = document.getElementById('button')
  button.addEventListener('click', function(){
    const content = input.value
    App.room.speak(content)
    input.value = ''
  });
});
