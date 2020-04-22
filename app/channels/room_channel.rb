class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    Message.create!(content: data['message'])
    ActionCable.server.broadcast 'room_channel', data['message']
    # 'room_channel'はroom.jsの"RoomChannel"を指定している
    # broadcastされるとroom.jsのrecievedで受け取る
  end
end
