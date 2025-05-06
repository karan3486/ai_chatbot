import os
from src.models.chat_model import ChatModel

class ChatController:
    """Controller for handling chat interactions."""
    
    def __init__(self):
        """Initialize the chat controller with the chat model."""
        self.chat_model = ChatModel()
    
    def get_response(self, user_message):
        """
        Process user message and get a response from the AI model.
        
        Args:
            user_message (str): The message from the user
            
        Returns:
            str: The AI's response
        """
        return self.chat_model.generate_response(user_message)
