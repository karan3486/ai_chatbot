# AI Chatbot

A Flask-based web application for an AI Chatbot using OpenAI's GPT model with a Tailwind CSS frontend.

## Features

- User-friendly chat interface
- Integration with OpenAI GPT models
- Responsive design using Tailwind CSS
- Modern UI with animations

## Project Structure

```
AIChat/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (add your API key here)
├── .env.example            # Example environment variables
├── static/                 # Static assets
│   ├── css/
│   │   └── style.css       # Custom CSS styles
│   └── js/
│       └── chat.js         # Frontend JavaScript
├── templates/              # HTML templates
│   └── index.html          # Main chat interface
└── src/                    # Application source code
    ├── controllers/
    │   └── chat_controller.py  # Controller for chat logic
    ├── models/
    │   └── chat_model.py       # Model for OpenAI integration
    └── utils/
        └── config.py           # Configuration utilities
```

## Setup Instructions

1. Clone this repository
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key to the `.env` file
4. Run the application:
   ```
   python app.py
   ```
5. Open your browser and navigate to `http://localhost:5000`

## Usage

1. Type your message in the input field at the bottom of the chat interface
2. Press "Send" or hit Enter to submit your message
3. The AI will process your message and respond in the chat

## Customization

- Modify the `OPENAI_MODEL` in the `.env` file to use different GPT models
- Adjust the system prompt in `chat_model.py` to change the AI's behavior
- Customize the UI by editing the CSS in `static/css/style.css`
