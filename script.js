
// Analytics stub
console.log('Analytics tracking page: ' + document.title);

// Simple live chat widget
document.addEventListener('DOMContentLoaded', () => {
  const chatBtn = document.createElement('div');
  chatBtn.className = 'chat-button';
  chatBtn.textContent = '💬';
  document.body.appendChild(chatBtn);

  const chatModal = document.createElement('div');
  chatModal.className = 'chat-modal';
  chatModal.innerHTML = `
    <h4>Live Chat</h4>
    <textarea placeholder='Type your message...'></textarea>
    <button id='sendMsg'>Send</button>
  `;
  document.body.appendChild(chatModal);

  chatBtn.addEventListener('click', () => {
    chatModal.style.display = chatModal.style.display === 'block' ? 'none' : 'block';
  });

  document.getElementById('sendMsg').addEventListener('click', () => {
    alert('Message sent! (stub)');
  });
});
