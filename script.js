// Define the characters
const characters = [
    {
      name: 'Alex',
      gender: 'male',
      hair: 'short',
      eyes: 'brown',
      hat: false,
    },
    {
      name: 'Blake',
      gender: 'male',
      hair: 'short',
      eyes: 'blue',
      hat: true,
    },
    {
      name: 'Casey',
      gender: 'female',
      hair: 'long',
      eyes: 'brown',
      hat: false,
    },
    {
      name: 'Drew',
      gender: 'nonbinary',
      hair: 'short',
      eyes: 'green',
      hat: false,
    },
  ];
  
  // Define the DOM elements
  const board = document.querySelector('.board');
  const options = document.querySelector('.options');
  const question = document.querySelector('.question');
  //const resetButton = document.querySelector('.reset-button');
  const resetButton = document.getElementById('reset-button');
  
  // Create the character cards
  function createCharacterCards() {
    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      const card = document.createElement('div'); // Define the 'card' variable here
      card.className = 'card';
    //   const image = document.createElement('img');
    //   image.src = character.image;
    //   image.alt = character.name;
    //   card.appendChild(image);
      board.appendChild(card);
    }
  }
  
  // Select a card
  let selectedCard = null;
  function selectCard(card) {
    if (selectedCard !== null) {
      selectedCard.classList.remove('selected');
    }
    selectedCard = card;
    selectedCard.classList.add('selected');
    question.innerText = `Does your character have ${card.getAttribute('data-hair')} hair and ${card.getAttribute('data-eyes')} eyes?`;
  }
  
  // Make a guess
  function makeGuess() {
    const selectedAttributes = {
      hair: selectedCard.getAttribute('data-hair'),
      eyes: selectedCard.getAttribute('data-eyes'),
      gender: selectedCard.getAttribute('data-gender'),
      hat: selectedCard.getAttribute('data-hat'),
    };
    let guessedCharacter = null;
    let guessedAttributes = null;
    characters.forEach((character) => {
      if (
        character.hair === selectedAttributes.hair &&
        character.eyes === selectedAttributes.eyes &&
        character.gender === selectedAttributes.gender &&
        character.hat === (selectedAttributes.hat === 'true')
      ) {
        guessedCharacter = character.name;
        guessedAttributes = selectedAttributes;
      }
    });
    if (guessedCharacter !== null) {
      endGame(guessedCharacter, guessedAttributes);
    } else {
      question.innerText = 'No character matches those attributes.';
      selectedCard.classList.remove('selected');
      selectedCard = null;
    }
  }
  
  // End the game
  function endGame(name, attributes) {
    question.innerText = `${name} has ${attributes.hair} hair, ${attributes.eyes} eyes, and is ${attributes.gender}. ${
      attributes.hat === 'true' ? 'They are' : 'They are not'
    } wearing a hat. You win!`;
    gameEnded = true;
  }
  
  // Reset the game
  function resetGame() {
    selectedCard = null;
    gameEnded = false;
    question.innerText = 'Select a card to begin.';
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
    card.classList.remove('selected');
    });
    }
    
    // Initialize the game
    function initGame() {
        createCharacterCards();
        board.addEventListener('click', (event) => {
            if (!gameEnded && event.target.classList.contains('card')) {
                selectCard(event.target);
            }
        });
        options.addEventListener('click', (event) => {
            if (!gameEnded && event.target.classList.contains('option')) {
                event.target.classList.add('disabled');
            if (event.target.getAttribute('data-guess') === 'yes') {
                makeGuess();
            } else {
                const attribute = event.target.getAttribute('data-attribute');
                const value = event.target.getAttribute('data-value');
                const cards = document.querySelectorAll(`[data-${attribute}='${value}']`);
                cards.forEach((card) => {
                    card.classList.add('disabled');
        });
        const numDisabledCards = document.querySelectorAll('.card.disabled').length;
        if (numDisabledCards === characters.length - 1) {
            const remainingCard = document.querySelector('.card:not(.disabled)');
            endGame(remainingCard.getAttribute('data-name'), {
                hair: remainingCard.getAttribute('data-hair'),
                eyes: remainingCard.getAttribute('data-eyes'),
                gender: remainingCard.getAttribute('data-gender'),
                hat: remainingCard.getAttribute('data-hat'),
            });
        } else {
            question.innerText = `Does your character have ${attribute} ${value}?`;
        }
        }
    }
    });
        resetButton.addEventListener('click', resetGame);
        resetGame();
    }
    
    // Initialize the game when the DOM is loaded
    document.addEventListener('DOMContentLoaded', initGame);

  