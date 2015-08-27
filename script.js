var bankRollElement = document.getElementById('bankroll');
var yourBetElement = document.getElementById('totalwager');

var bankRoll = 500;
var amtWagered = 0;
var amtWon = 0;
var btnValue;

var cardOneElement = document.getElementById('cardbox1');
var cardTwoElement = document.getElementById('cardbox2');
var cardThreeElement = document.getElementById('cardbox3');
var cardFourElement = document.getElementById('cardbox4');
var cardFiveElement = document.getElementById('cardbox5');
var cardArray = [cardOneElement, cardTwoElement, cardThreeElement, cardFourElement, cardFiveElement];
var shuffledDeck;

var checkBoxOne = document.getElementById('checkbox1');
var checkBoxTwo = document.getElementById('checkbox2');
var checkBoxThree = document.getElementById('checkbox3');
var checkBoxFour = document.getElementById('checkbox4');
var checkBoxFive = document.getElementById('checkbox5');
var checkBoxArray = [checkBoxOne, checkBoxTwo, checkBoxThree, checkBoxFour, checkBoxFive];
var totalChecked;


var cardRank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
//var cardRank = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

var cardSuit = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
var deck = [];

    //Create a 52 card deck pushed into the array "deck".
    for (var i=0; i < cardSuit.length; i++) {
        for (var j=0; j<cardRank.length; j++) {
            deck.push(new Card(cardRank[j], cardSuit[i]));
        };
    };

    for (var i = 0; i < deck.length; i++) {
        deck[i].cardIndex = i;
    };


var dealButton = document.getElementById('dealbutton');
var dealTwo = document.getElementById('dealtwo');

var betFive = document.getElementById('bet5');
var betTen = document.getElementById('bet10');
var betTwentyFive = document.getElementById('bet25');

//////TEST ARRAYS
var royalFlushArray = [deck[8],deck[9],deck[10],deck[11],deck[12]];
var straightFlushArray = [deck[2],deck[3],deck[4],deck[5],deck[6]];
var fourOfAKindArray = [deck[2],deck[1],deck[14],deck[27],deck[40]];
var fullHouseArray = [deck[2],deck[10],deck[15],deck[23],deck[36]];
var flushArray = [deck[28],deck[32],deck[30],deck[33],deck[34]];
var straightArray = [deck[5],deck[19],deck[47],deck[9],deck[33]];
var threeOfaKindArray = [deck[9],deck[4],deck[22],deck[35],deck[44]];
var twoPairArray = [deck[5],deck[18],deck[22],deck[35],deck[40]];
var jackOrBetterArray = [deck[40],deck[10],deck[23],deck[3],deck[4]];




///////////////////////////////////////////////////
// FUNCTIONS WILL GO HERE
///////////////////////////////////////////////////


//constructor makes a card object with a card's rank and a card's suit.
function Card (cardRank, cardSuit, cardIndex) {
    this.cardRank = cardRank;
    this.cardSuit = cardSuit;
    this.cardIndex = cardIndex;
};

//takes an array and a number. returns a subset of the array to N in a randomized order. Five card draw would only need a max of 10 cards used.
function shuffler(arrayOfCards, numOfCards) {
    var shuffledArray = [];
    for (var i = 0; i < numOfCards; i++) {
        var randomNumber = randomNumGen(0, arrayOfCards.length - 1);
        shuffledArray.push(arrayOfCards[randomNumber]);
        arrayOfCards.splice(randomNumber, 1);
        };
    return shuffledArray;
};

//takes a the cardArray and displays numToDisplay cards to the HTMLarray on the page.
function displayDeltCards(HTMLarray, setOfCards, numToDisplay) {
    for (var i =0; i < numToDisplay; i++) {
        HTMLarray[i].style.backgroundPosition = (setOfCards[i].cardIndex * -81) - 80 + 'px';
    };
};

//Random number gen.
function randomNumGen(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


function disableBets() {
    if (bankRoll < 5) {
    betFive.disabled = true;
    betTen.disabled = true;
    betTwentyFive.disabled = true;
    //TODO REPLACE THIS ALERT WITH A DIFFERENT KIND OF POPUP.    
    alert('You are all in! Good luck mofo!');
}   else if (bankRoll < 10) {
    betTen.disabled = true;
    betTwentyFive.disabled = true;

}   else if (bankRoll < 25) {
    betTwentyFive.disabled = true;
}
};

function enableBets() {
    if (bankRoll >= 25) {
        betFive.disabled = false;
        betTen.disabled = false;
        betTwentyFive.disabled = false;
    } else if (bankRoll >= 10) {
        betFive.disabled = false;
        betTen.disabled = false;
    }
    else if (bankRoll >= 5) {
        betFive.disabled = false;
    }
};

// THIS CODE RESETS THE CARDS, FLIPS THE DEAL BUTTON, RESETS THE WAGER, ADDS ANY WINNINGS, HIDES HOLD BOXES, AND SHUFFLES THE DECK.
function playAgain() {
    cardArray.map(function(element){
        element.style.backgroundPosition = 0
        });
    checkBoxArray.forEach(function(element){element.checked = false;});
    shuffledDeck = shuffler(shuffledDeck, 52);
    dealbutton.style.visibility = 'visible';
    amtWagered = 0;
    yourBetElement.innerHTML = amtWagered;
    bankRoll = bankRoll + amtWon;
    bankRollElement.innerHTML = bankRoll;
    checkBoxArray.forEach(function(element){element.style.visibility = 'hidden'});
    checkBoxArray.forEach(function(element){element.nextElementSibling.style.visibility = 'hidden'});
    enableBets();
};

///////////////////////////////////////////////////
// CODE & FUNCTION CALLS
///////////////////////////////////////////////////


bankRollElement.innerHTML = bankRoll;
yourBetElement.innerHTML = amtWagered;

shuffledDeck = shuffler(deck, 52);

betFive.addEventListener('click', function() {
    btnValue = 5;
    amtWagered += 5;
    bankRoll = bankRoll - btnValue;
    bankRollElement.innerHTML = bankRoll;
    yourBetElement.innerHTML = amtWagered;
    disableBets();

}, false);

betTen.addEventListener('click', function() {
    btnValue = 10;
    amtWagered += 10;
    bankRoll = bankRoll - btnValue;
    bankRollElement.innerHTML = bankRoll;
    yourBetElement.innerHTML = amtWagered;
    disableBets();

}, false);

betTwentyFive.addEventListener('click', function() {
    btnValue = 25;
    amtWagered += 25;
    bankRoll = bankRoll - btnValue;
    bankRollElement.innerHTML = bankRoll;
    yourBetElement.innerHTML = amtWagered;
    disableBets();

}, false);

///////////////////////////////////////////////////////////
// RED DEAL BUTTON
///////////////////////////////////////////////////////////
dealButton.addEventListener('click', function() {
    if(amtWagered < 1) {
        alert('You know it takes money to make money.\nYou gotta bet something!');
        return;
    }
    this.style.visibility = 'hidden';
    checkBoxArray.forEach(function(element){element.style.visibility = 'visible'});
    checkBoxArray.forEach(function(element){element.nextElementSibling.style.visibility = 'visible'});
    betFive.disabled = true;
    betTen.disabled = true;
    betTwentyFive.disabled = true;
    displayDeltCards(cardArray , shuffledDeck, shuffledDeck.length);
}, false);

dealButton.addEventListener('mousedown', function() {
    dealButton.className += ' dealdownred';
}, false);

dealButton.addEventListener('mouseup', function() {
    dealButton.classList.remove('dealdownred');
}, false);

///////////////////////////////////////////////////////////
// GREEN DEAL BUTTON
///////////////////////////////////////////////////////////

dealTwo.addEventListener('click', function() {
//    var finishedHand = jackOrBetterArray; //TEST HANDS GO HERE.

    
    var finishedHand = [shuffledDeck[0], shuffledDeck[1], shuffledDeck[2], shuffledDeck[3], shuffledDeck[4]];
    //if cards are not checked replace them with the card five places away and adjust the sprite position on the screen.
    for (var i = 0; i < checkBoxArray.length; i++) {
        if (!checkBoxArray[i].checked) {
            cardArray[i].style.backgroundPosition = (shuffledDeck[i + 5].cardIndex * -81) - 80 + 'px';
            finishedHand.splice(i, 1);
            finishedHand.unshift(shuffledDeck[i + 5]);
            var edgeCase = finishedHand;
            }
        };
    
    if (royalFlush(finishedHand)) {
        alert("You're a winner with a ROYAL flush!");
        bankRoll = bankRoll + (800 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        bankRollElement.innerHTML = bankRoll + amtWon * amtWagered;
        playAgain();
    } else if (straightFlush(finishedHand)) {
        alert("You're a winner with a straight flush!");
        bankRoll = bankRoll + (50 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        playAgain();
    } else if (fourOfAKind(finishedHand)) {
        alert("You're a winner with a four four four four of a kind!");
        bankRoll = bankRoll + (25 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        playAgain();
    } else if (fullHouse(finishedHand)) {
        alert("You're a winner with a FULL HOUSE!");
        bankRoll = bankRoll + (9 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        playAgain();
    } else if (flush(finishedHand)) {
        alert("You're a winner with a flush!");
        bankRoll = bankRoll + (6 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        playAgain();
    } else if(straight(finishedHand)) {
        alert("You're a winner with a Straight!");
        bankRoll = bankRoll + (4 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        playAgain();
    } else if(threeOfAKind(finishedHand)) {
        alert("You're a winner with three of a kind!");
        bankRoll = bankRoll + (3 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        playAgain();
    } else if (twoPairs(finishedHand)) {
        alert("You're a winner with two-pair!");
        bankRoll = bankRoll + (2 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        playAgain();
    } else if(jacksOrBetter(edgeCase)) {
        alert("You're a winner with Jacks or Better!");
        bankRoll = bankRoll + (1 * amtWagered);
        bankRollElement.innerHTML = bankRoll;
        playAgain();
    } else {
        alert("You've lost this round.");
        playAgain();
    }
    
    
    //TODO change this to a hidden div with two buttons or something.
   /* if (prompt('Would you like to play again?') === 'y'){
        playAgain();
        }*/
    }, false);




///////////////////////////////////////////////////
// WIN FUNCTIONS TO CHECK FOR WINNING HANDS      //
///////////////////////////////////////////////////

function jacksOrBetter(array) { //TESTED SEEMS TO WORK.
    var newArray = [];
    array.map(function(element) {if(element.cardRank === 'J' || element.cardRank === 'Q' || element.cardRank === 'K' || element.cardRank === 'A'){newArray.push(element.cardRank)}});
    
    if (newArray.join('').match(/JJ/) || newArray.join('').match(/QQ/) || newArray.join('').match(/KK/) || newArray.join('').match(/AA/)){
        console.log(newArray.join(''));
        return true;
    }
    return false;
};

function twoPairs(array) {
    var newArray = [];
    array.map(function(element) {newArray.push(element.cardRank)});
    var sortedString = newArray.sort().join('');
    
    var stringExp = '';
    
    
    for (var k = 0; k < cardRank.length; k++) {
        stringExp = cardRank[k] + cardRank[k];
        var regEx = new RegExp(stringExp);
                
        if (sortedString.match(regEx)) {
            
            var newstr = sortedString.replace(regEx, '');
            for (var l = 0; l < cardRank.length; l++) {
                stringExp = cardRank[l] + cardRank[l];
                var regEx = new RegExp(stringExp);
                    
                if (newstr.match(regEx)) {
                return true;
                }
            };
        }
    };
    return false;
    
};

function threeOfAKind(array) { //TESTED SEEMS TO WORK.
    var newArray = [];
    array.map(function(element) {newArray.push(element.cardRank)});
    var sortedString = newArray.sort().join('');
    
    var stringExp = '';
    
    
    for (var k = 0; k < cardRank.length; k++) {
        stringExp = cardRank[k] + cardRank[k] + cardRank[k];
        var regEx = new RegExp(stringExp);
        
        if (sortedString.match(regEx)) {
            return true;
        }
    };
    return false;
};

function straight(array) { //TESTED SEEMS TO WORK.
    var newArray = [];
    array.map(function(element){newArray.push(element.cardRank)});
    if (newArray.join('').match(/2345A/) || 
        newArray.join('').match(/23456/) || 
        newArray.join('').match(/34567/) ||
        newArray.join('').match(/45678/) ||
        newArray.join('').match(/56789/) ||
        newArray.join('').match(/106789/) || 
        newArray.join('').match(/10789J/) ||
        newArray.join('').match(/1089JQ/) || 
        newArray.join('').match(/109JKQ/) || 
        newArray.join('').match(/10AJKQ/)) {
        console.log(newArray.join(''));
        return true;
    }
    return false;
};

function flush(array) { //TESTED SEEMS TO WORK.
    if(array[0].cardSuit === array[1].cardSuit && array[0].cardSuit === array[2].cardSuit && array[0].cardSuit === array[3].cardSuit && array[0].cardSuit === array[4].cardSuit) {
        return true;
    }
    return false;
};

function fullHouse(array) {
    var newArray = [];
    array.map(function(element) {newArray.push(element.cardRank)});
    var sortedString = newArray.sort().join('');
    
    var stringExp = '';
    
    
    for (var k = 0; k < cardRank.length; k++) {
        stringExp = cardRank[k] + cardRank[k] + cardRank[k];
        var regEx = new RegExp(stringExp);
                
        if (sortedString.match(regEx)) {
            
            var newstr = sortedString.replace(regEx, '');
            for (var l = 0; l < cardRank.length; l++) {
                stringExp = cardRank[l] + cardRank[l];
                var regEx = new RegExp(stringExp);
                    

                if (newstr.match(regEx)) {
                return true;
                }
            };
        }
    };
    return false;
};

function fourOfAKind(array) { //TESTED SEEMS TO WORK.
    var newArray = [];
    array.map(function(element) {newArray.push(element.cardRank)});
    var sortedString = newArray.sort().join('');
    
    var stringExp = '';
    
    
    for (var k = 0; k < cardRank.length; k++) {
        stringExp = cardRank[k] + cardRank[k] + cardRank[k] + cardRank[k];
        var regEx = new RegExp(stringExp);
        
        if (sortedString.match(regEx)) {
            return true;
        }
    };
    return false;
};

function straightFlush(array) { //TESTED SEEMS TO WORK.
    if (flush(array) && straight(array)) {
        return true;
    }
    return false;
};

function royalFlush(array) { //TESTED SEEMS TO WORK.
    var newArray = [];
    array.map(function(element){newArray.push(element.cardRank)});
    if (newArray.join('').match(/10AJKQ/) && flush(array)) {
        return true;
    }
    return false;
};
