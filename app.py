from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS
from src.controllers.chat_controller import ChatController

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Initialize CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize chat controller
chat_controller = ChatController()

@app.route('/')
def index():
    """Render the main chat interface."""
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Process chat messages and return AI responses."""
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Get response from chat controller
        response = chat_controller.get_response(user_message)
        
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
