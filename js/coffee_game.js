document.addEventListener('DOMContentLoaded', function() {
    const images = [
        './images/img-2.png',
        './images/img-2.png',
        './images/img-4.png',
        './images/img-4.png',
        './images/img-6.png',
        './images/img-6.png',
        './images/img-8.png',
        './images/img-8.png',
        './images/img-10.png',
        './images/img-10.png',
        './images/img-12.png',
        './images/img-12.png',
        './images/img-14.png',
        './images/img-14.png',
        './images/img-16.png',
        './images/img-16.png',
    ];

    const gameContainer = document.getElementById('game_container');
    let cards = [];

    // Create card elements and add to the game container
    for (let i = 0; i < images.length; i++) {
        const cardElement = createCardElement(images[i]);
        cards.push(cardElement);
        console.log(cardElement);
        gameContainer.appendChild(cardElement);
    }

    // Shuffle the cards
    shuffle(cards);
    console.log(cards);

    // Attach event listeners to the cards
    cards.forEach(card => {
        card.addEventListener('click', () => flipCard(card));
    });

    let flippedCard = null;
    let lockBoard = false;

    function flipCard(card) {
        if (lockBoard) return;
        if (card === flippedCard) return;

        card.classList.add('flip');

        if (!flippedCard) {
            flippedCard = card;
            return;
        }

        checkForMatch(card);
    }

    let matchedPairs = 0;

    function checkForMatch(secondCard) {
        let isMatch = flippedCard.dataset.id === secondCard.dataset.id;

        if (isMatch) {
            disableCards(flippedCard, secondCard);
            matchedPairs++;

            // Check if all pairs are matched
            if (matchedPairs === images.length / 2) {
                setTimeout(() => {
                    unflipAllCards()
                    shuffle(cards);
                }, 1000);
                
            }
        } else {
            unflipCards(flippedCard, secondCard);
        }

        flippedCard = null;
    }

    function disableCards(card1, card2) {
        card1.removeEventListener('click', () => flipCard(card1));
        card2.removeEventListener('click', () => flipCard(card2));
    }

    function unflipCards(card1, card2) {
        lockBoard = true;

        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            lockBoard = false;
        }, 1000);
    }

    function createCardElement(imageUrl) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.dataset.id = imageUrl;
        card.innerHTML = `
            <div class="view front-view">
                <img src="https://btholt.github.io/complete-intro-to-web-dev-v3/images/coffee_masters_logo.png" alt="logo">
            </div>
            <div class="view back-view">
                <img src="${imageUrl}" alt="card-img">
            </div>
        `;
        return card;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        gameContainer.innerHTML = ""
        
        for (let i = 0; i < cards.length; i++) {
            
            gameContainer.appendChild(cards[i]);
        }

    }
    function unflipAllCards() {
        cards.forEach(card => {
            card.classList.remove('flip');
        });
    }
});