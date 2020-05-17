import React, { Component } from 'react';
import './App.css';
import cards from './Components/Card/cards.json';
import Card from './Components/Card/Card.js'
import Header from './Components/Header/Header.js'
import Confetti from "./Components/Confetti/Confetti.js"

class App extends Component {
  constructor(props) {
    super(props);
    //handle shuffle
    for(var i = 0; i< cards.length; i++){
      var rand = Math.floor(Math.random()* (cards.length));
      var tmp = cards[i];
      cards[i] = cards[rand];
      cards[rand] = tmp;
   }

    this.state = {
      cards,
      currentPair: [],
      guesses: 0,
      gameFinished: false,
    };
  }
  
  handleClick = (cardIndex) => {
    //make copy of card clicked, update 2 states 
    //make copy of cards array and update it with updated card
    const card = {
      ...this.state.cards[cardIndex]
    }
    card.feedback = "visible";
    card.flipped = true;
    const cards = [...this.state.cards];
    cards[cardIndex] = card;

    //get name of card clicked
    const cardName = card.name;

    //add card name and index to currentPair array, then create copy of arrY
    const { currentPair } = this.state;
    const cardObj = {
      name: cardName,
      index: cardIndex
    }
    currentPair.push(cardObj);
    const currentPairs = [...currentPair];
    
    //set state of both cards array and current pair array, add to counter
    this.setState((prevState, props) => {
      return {
        cards: cards, 
        currentPair: currentPairs,
        guesses: prevState.guesses + 1
      };
    });

    
    //if there are 2 cards in current pair array then send it to checkForMatch()
    if (currentPair.length === 2) {
      this.checkForMatch(currentPair);
    }

  }

  checkForMatch = (currentPair) => {
    //check if both items in the arry are the same
    if (currentPair[0].name === currentPair[1].name) {
      //grab indexes of cards
      const currentIndexes = [currentPair[0].index, currentPair[1].index];
      
      //get name of cards
      const name = currentPair[0].name;

      //grab cards from cards array that need to be updated by matching it to the name
      const itemsToUpdate = this.state.cards.forEach((element,index) => {
        if (element.name === name) {
          element.feedback = "Matched";
          element.flipped = true;

          //make copy of cards, update that card within copy
          const cards = [...this.state.cards];
          cards[index] = element;
          this.setState({cards: cards});
        }
      });
      this.handleResetMatch()
      }
    else {
      var cardOne = this.state.currentPair[0];
      var cardTwo = this.state.currentPair[1];
      this.handleResetNoMatch(cardOne, cardTwo);
    }
    
  }

  handleResetMatch = () => {
   const { currentPair, cards } = this.state;

   let currentPairsUpdate = [...currentPair];
   currentPairsUpdate = [];
   this.setState({cards: cards, currentPair: currentPairsUpdate});

   this.checkIfFinished();
  }

  handleResetNoMatch = (cardOne, cardTwo) => {
    //make copy of card one to update
    const cardOneToUpdate = {
      ...this.state.cards[cardOne.index]
    }

    //make copy of card two to update
    const cardTwoToUpdate = {
      ...this.state.cards[cardTwo.index]
    }

    //put those two cards in an array
    const cardsToUpdate = [cardOneToUpdate, cardTwoToUpdate];

    //update flipped and feedback states of each card
    cardsToUpdate.forEach((element) => {
      element.flipped = false;
      element.feedback = "hidden";
    });

    //make copy of cards array, update two cards in that array
    const cards = [...this.state.cards];
    cards[cardOne.index] = cardOneToUpdate;
    cards[cardTwo.index] = cardTwoToUpdate;
    
    //make copy of current pairs and reset state to empty array
    const { currentPair } = this.state;
    let currentPairsUpdate = [...currentPair];
    currentPairsUpdate = [];

    //delay resetting of cards
    setTimeout(function() {
      this.setState({cards: cards, currentPair: currentPairsUpdate});
    }
    .bind(this), 1000);
  }
  
  handleRestart = () => {
    //make copy of cards, reset all states to default
    const cards = [...this.state.cards];
    cards.forEach((element) => {
      element.flipped = false;
      element.feedback = "hidden";
    });

    //make copy of current pairs and reset state to empty array
    const { currentPair } = this.state;
    let currentPairsUpdate = [...currentPair];
    currentPairsUpdate = [];

    this.setState({cards: cards, currentPair: currentPairsUpdate, guesses: 0, gameFinished: false});
  }

  checkIfFinished = () => {
    const isFinished = this.state.cards.every( (val) => val.feedback === "Matched");
    
    if (isFinished) {
      this.setState({gameFinished: true});
    }
  }

  render() {
    let celebrationBanner = null;
    if (this.state.gameFinished) {
      celebrationBanner = (
        <div>
          <p>Congrats, you won the game!! Click restart to play again!</p>
        <Confetti />
        </div>
        
      )
    }
    return (
      <div className="App">
        <Header guesses={this.state.guesses} restart={this.handleRestart}/>
        {celebrationBanner}
        <div className="cards-container">
        {this.state.cards.map((card, index) => (
          <Card
            clicked={() => this.handleClick(index)}
            isFlipped={card.flipped}
            isMatched={card.feedback}
            index={index}
            key={card.id}
            name={card.name}
            image={card.image}
          />
        ))}
      </div>
    </div>
    )
  }
}

export default App;
