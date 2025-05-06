import os
import openai
from src.utils.config import get_api_key

class ChatModel:
    """Model for handling interactions with the OpenAI API."""
    
    def __init__(self):
        """Initialize the chat model with API key."""
        openai.api_key = get_api_key()
        self.model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
    
    def generate_response(self, user_message):
        """
        Generate a response using the OpenAI GPT model.
        
        Args:
            user_message (str): The message from the user
            
        Returns:
            str: The AI's response
        """
        try:
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Error generating response: {str(e)}")
            return "I'm sorry, I encountered an error while processing your request."
