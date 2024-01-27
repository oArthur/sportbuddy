import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)("chat", self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)("chat", self.channel_name)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        from_user = text_data_json['from_user']
        to_user = text_data_json['to_user']
        print(f"ChatConsumer: \n\treceive: '{message}', \n\tfrom:'{from_user}', \n\tto:'{to_user}'")

        async_to_sync(self.channel_layer.group_send)(
            "chat",
            {
                'type': 'chat_message',
                'message': message,
                'from_user': from_user,
                'to_user': to_user,
            }
        )

    def chat_message(self, event):
        message = event['message']
        from_user = event['from_user']
        to_user = event['to_user']
        print(f"ChatConsumer: \n\tchat_message: '{message}', \n\tfrom:'{from_user}', \n\tto:'{to_user}'")

        self.send(text_data=json.dumps({
            'message': message,
            'from_user': from_user,
            'to_user': to_user
        }))
    