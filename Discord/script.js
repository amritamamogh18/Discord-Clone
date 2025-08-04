document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');
    
    // Sample messages data
    const sampleMessages = [
        {
            username: 'Alice',
            avatar: 'A',
            time: '12:30 PM',
            text: 'Hey everyone! Welcome to the server!'
        },
        {
            username: 'Bob',
            avatar: 'B',
            time: '12:32 PM',
            text: 'Thanks for the invite!'
        },
        {
            username: 'Charlie',
            avatar: 'C',
            time: '12:35 PM',
            text: 'What are we discussing today?'
        }
    ];
    
    // Display sample messages
    sampleMessages.forEach(message => {
        addMessage(message);
    });
    
    // Handle message submission
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        
        if (messageText) {
            const newMessage = {
                username: 'User',
                avatar: 'U',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: messageText
            };
            
            addMessage(newMessage);
            messageInput.value = '';
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });
    
    // Function to add a message to the UI
    function addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        
        messageElement.innerHTML = `
            <div class="message-avatar">${message.avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-username">${message.username}</span>
                    <span class="message-time">${message.time}</span>
                </div>
                <div class="message-text">${message.text}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
    }
    
    // Channel switching
    const channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
        channel.addEventListener('click', function() {
            channels.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Update channel header
            document.querySelector('.channel-header h2').textContent = this.textContent.trim().substring(1);
            
            // Clear messages
            messagesContainer.innerHTML = '';
            
            // Add sample messages (in a real app, you'd fetch messages for this channel)
            sampleMessages.forEach(message => {
                addMessage(message);
            });
        });
    });
    
    // Server switching
    const servers = document.querySelectorAll('.server-icon:not(:last-child)');
    servers.forEach(server => {
        server.addEventListener('click', function() {
            servers.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you'd load the server's channels and data here
        });
    });
});