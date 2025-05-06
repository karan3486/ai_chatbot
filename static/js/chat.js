document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    
    // Focus input field on page load for desktop
    if (window.innerWidth > 768) {
        userInput.focus();
    }
    
    // Handle mobile viewport adjustments when keyboard appears
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        // Adjust viewport when input is focused (keyboard appears)
        userInput.addEventListener('focus', () => {
            // Small delay to let keyboard appear
            setTimeout(() => {
                window.scrollTo(0, document.body.scrollHeight);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 300);
        });
    }
    
    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser 
            ? 'bg-teal-50 p-3 rounded-lg max-w-3/4 ml-auto border-l-4 border-teal-400' 
            : 'bg-gray-50 p-3 rounded-lg max-w-3/4 border-r-4 border-teal-300';
        
        const messageText = document.createElement('p');
        messageText.className = 'text-sm text-gray-800';
        messageText.textContent = message;
        
        messageDiv.appendChild(messageText);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show loading indicator
    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'bg-gray-50 p-3 rounded-lg max-w-3/4 loading-message border-r-4 border-teal-300';
        loadingDiv.innerHTML = '<p class="text-sm text-gray-800">Thinking...</p>';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return loadingDiv;
    }
    
    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage(message, true);
        
        // Clear input
        userInput.value = '';
        
        // Show loading indicator
        const loadingDiv = showLoading();
        
        try {
            // Send message to server
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            const data = await response.json();
            
            // Remove loading indicator
            loadingDiv.remove();
            
            if (response.ok) {
                // Add AI response to chat
                addMessage(data.response);
            } else {
                // Add error message
                addMessage('Error: ' + (data.error || 'Failed to get response'));
            }
        } catch (error) {
            // Remove loading indicator
            loadingDiv.remove();
            
            // Add error message
            addMessage('Error: Could not connect to the server');
            console.error('Error:', error);
        }
    });
});
