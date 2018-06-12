/*
 * Create a list that holds all of your cards
 */
//document ready
$(document).ready(function () {
    //global variables
    const deck = document.querySelector('.deck');
    let openList = [];
    let counter = 0;
    let totalSec = 0;
    let matchingCards = [];
    let matchCount = 0;
    let final = 0;

    //Cards
    let cardArray = ["fa-diamond", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-paper-plane"];

    let cardList = cardArray.concat(cardArray);
    
    //Initialize the first game
    start();
    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */
    //make the gameboard
    function generateBoard() {
        //clear previous board
        $('.deck').empty();
        //shuffle board
        let shuffledBoard = shuffle(cardList);
        //loop to set new board
        for (cards in shuffledBoard) {
            let card = document.createElement('li');
            card.classList.add('card');
            deck.appendChild(card);
            let icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add(`${shuffledBoard[cards]}`);
            card.appendChild(icon);
            card.addEventListener('click', displayCard);
            card.addEventListener('click', cardUp);
        }
    }

    //start game
    function start() {
        //reset
        stopTimer();
        $('.moves').html('0');
        totalSec = 0;
        counter = 0;
        matchCount = 0;
        matchingCards = [];
        resetStars();
        resetModalStars();
        //start new board
        generateBoard();
    }

    //reset the stars
    function resetStars() {
        if (!$('#starOne').hasClass('fa')) {
            $('#starOne').addClass('fa');
        }
        if (!$('#starTwo').hasClass('fa')) {
            $('#starTwo').addClass('fa');
        }
        if (!$('#starThree').hasClass('fa')) {
            $('#starThree').addClass('fa');
        }
        if (!$('#starFour').hasClass('fa')) {
            $('#starFour').addClass('fa');
        }
        if (!$('#starFive').hasClass('fa')) {
            $('#starFive').addClass('fa');
        }
    }

    //restart button
    $('.restart').click(start);

    //display card
    function displayCard() {
        this.classList.toggle('open');
        this.classList.toggle('show');
    }

    //winner
    function winner() {
        let finalTime = $('.time').html();
        stopTimer();
        final = finalTime;
        $('.finalTime').html(finalTime);
        $('#myModal').modal('show');
    }

    //reset modal stars
    function resetModalStars() {
        $('#ModalFive').show();
        $('#ModalFour').show();
        $('#ModalThree').show();
        $('#ModalTwo').show();
        $('#ModalOne').show();
    }
    //modal stars
    function modalStars() {
        if (counter > 22 && counter < 28) {
            $('#ModalFive').hide();
        } else if (counter > 28 && counter < 34) {
            $('#ModalFour').hide();
        } else if (counter > 34 && counter < 40) {
            $('#ModalThree').hide();
        } else if (counter > 40 && counter < 46) {
            $('#ModalTwo').hide();
        }
    }

    //timer
    function timer() {
        ++totalSec;
        let seconds = totalSec;
        switch(matchingCards.length){
            case 8:
                $('.time').html(final);
                break;
            default:
            $('.time').html(seconds);
        }
    }

    //start timer
    function startTimer() {
        timer = setInterval(timer, 1000);
    }

    //stop timer
    function stopTimer() {
        window.clearInterval(timer);
    }

    //display stars
    function stars() {
        if (counter > 22 && counter < 28) {
            $('#starFive').removeClass('fa');
        } else if (counter > 28 && counter < 34) {
            $('#starFour').removeClass('fa');
        } else if (counter > 34 && counter < 40) {
            $('#starThree').removeClass('fa');
        } else if (counter > 40 && counter < 46) {
            $('#starTwo').removeClass('fa');
        }
    }

    //Click on a card
    function cardUp() {
        openList.push($(this).children('i').attr('class'));
        counter++;
        $('.moves').html(Math.floor(counter / 2));
        startTimer();
        //once two cards are choosen
        if (openList.length === 2) {
            stars();
            modalStars();
            //if matched
            if (openList[0] === openList[1]) {
                matched();
                matchCount++;
                matchingCards.push(matchCount);
                if (matchingCards.length == 8) {
                    winner();
                }
                //no match
            } else {
                unMatched();
            }
        }
    }
    //matched cards
    function matched() {
        $('.show').addClass('match');
        $('.match').removeClass('show');
        $('.match').removeClass('open');
        openList = [];
    }
    //unmatched cards
    function unMatched() {
        setTimeout(function () {
            $('.show').removeClass('show');
            $('.open').removeClass('open');
            openList = [];
        }, 750);
    }

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */

});