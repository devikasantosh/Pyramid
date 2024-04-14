function startGame() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    // You can add further initialization logic for your game here
  }
  

// List of valid words
const validWords = [
    "a", "al", "an", "ant", "at", "la", "lap", "lat", "na", "nap", 
    "pa", "pal", "pan", "pant", "pat", "plan", "ta", "tan", "tap", "apt", "plant"
  ];
  
  // Function to check if a word is valid
  function isValidWord(word) {
    return validWords.includes(word);
  }
  
  // Function to update the content of a box
  function updateBox(boxId, content) {
    document.getElementById(boxId).innerText = content;
  }
  
  // Function to move cursor to the end of the box content
  function moveCursorToEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }
  
  // Function to check if a word contains all letters of the previous word
  function containsAllLetters(currentWord, previousWord) {
    return previousWord.split('').every(letter => currentWord.includes(letter));
  }
  
  // Function to add event listeners to input boxes
  function addEventListeners() {
    const inputBoxes = document.querySelectorAll('.box');
    let currentRow = 0; // Track the current row
    let previousWord = ''; // Track the previous word
  
    inputBoxes.forEach((box, index) => {
      box.addEventListener('click', () => {
        box.contentEditable = true;
        box.focus();
        moveCursorToEnd(box); // Move cursor to the end when box is clicked
      });
  
      box.addEventListener('input', (event) => {
        const letter = event.data ? event.data.toUpperCase() : ''; // Handles the case when the user deletes content
        updateBox(box.id, letter);
        moveCursorToEnd(box); // Move cursor to the end after input
  
        // If we've reached the end of the current row
        if (index === (currentRow + 1) * (currentRow + 2) / 2 - 1) {
          const rowLetters = Array.from(inputBoxes)
            .slice(currentRow * (currentRow + 1) / 2, (currentRow + 1) * (currentRow + 2) / 2)
            .map(box => box.innerText.toLowerCase())
            .join('');
  
          if (!isValidWord(rowLetters) || !containsAllLetters(rowLetters, previousWord)) {
            // If the word is not valid or does not contain all letters of the previous word, clear the row and prevent moving to the next row
            Array.from(inputBoxes)
              .slice(currentRow * (currentRow + 1) / 2, (currentRow + 1) * (currentRow + 2) / 2)
              .forEach(box => {
                box.innerText = '';
                box.parentNode.style.backgroundColor = '#ccc'; // Set background color to default grey
              });
            moveCursorToEnd(inputBoxes[currentRow * (currentRow + 1) / 2]); // Move cursor to the first box of the row
            return; // Exit the event listener
          } else {
            // Set background color of the row to green if the word is valid
            Array.from(inputBoxes)
              .slice(currentRow * (currentRow + 1) / 2, (currentRow + 1) * (currentRow + 2) / 2)
              .forEach(box => {
                box.style.backgroundColor = '#7fbf4d'; // Green color
              });
            currentRow++;
            previousWord = rowLetters; // Update the previous word
            if (currentRow * (currentRow + 1) / 2 === inputBoxes.length) {
              alert("Congratulations! You've completed the pyramid!"); // Notify user that they've completed the pyramid
            }
          }
        }
  
        if (event.inputType === 'deleteContentBackward' && index > currentRow * (currentRow + 1) / 2) {
          const prevBox = inputBoxes[index - 1];
          if (letter === '' && box.innerText === '') {
            prevBox.contentEditable = true;
            prevBox.focus();
            moveCursorToEnd(prevBox); // Move cursor to the end of previous box
          }
        } else if (index < inputBoxes.length - 1 && letter !== '') {
          const nextBox = inputBoxes[index + 1];
          nextBox.contentEditable = true;
          nextBox.focus();
          moveCursorToEnd(nextBox); // Move cursor to the end of next box
        }
      });
    });
  }
  
  // Initialize event listeners
  addEventListeners();
  
  