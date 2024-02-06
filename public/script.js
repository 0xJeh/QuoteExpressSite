// script.js

// Fetch the quote and author from the server
fetch('/quote')
  .then(response => response.json())
  .then(data => {
    document.getElementById('quote').innerText = data.content;
    document.getElementById('author').innerText = data.author;
  })
  .catch(error => console.error('Error fetching quote:', error));
