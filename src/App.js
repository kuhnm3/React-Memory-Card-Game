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
    const card = {
      ...this.state.cards[cardIndex]
    }
    card.feedback = "visible";
    card.flipped = true;
    const cards = [...this.state.cards];
    cards[cardIndex] = card;

    const cardName = card.name;
    const { currentPair } = this.state;
    const cardObj = {
      name: cardName,
      index: cardIndex
    }
    currentPair.push(cardObj);
    const currentPairs = [...currentPair];
    
    this.setState((prevState, props) => {
      return {
        cards: cards, 
        currentPair: currentPairs,
        guesses: prevState.guesses + 1
      };
    });

    if (currentPair.length === 2) {
      const cardOne = currentPair[0];
      const cardTwo = currentPair[1];
      this.checkForMatch(cardOne, cardTwo);
    }

  }

  checkForMatch = (cardOne, cardTwo) => {
    if (cardOne.name === cardTwo.name) {

      const cardOneInArray = this.state.cards[cardOne.index];
      const cardOneCopy = {...cardOneInArray};
      cardOneCopy.feedback = "matched";
      cardOneCopy.flipped = true;

      const cardTwoInArray = this.state.cards[cardTwo.index];
      const cardTwoCopy = {...cardTwoInArray};
      cardTwoCopy.feedback = "matched";
      cardTwoCopy.flipped = true;

      const cards = [...this.state.cards];
      cards[cardOne.index] = cardOneCopy;
      cards[cardTwo.index] = cardTwoCopy;
      this.setState({cards: cards});
      this.handleResetMatch();

      }
    else {
      this.handleResetNoMatch(cardOne, cardTwo);
    }
    
  }

  handleResetMatch = () => {

   let currentPairs = [...this.state.currentPair];
   currentPairs = [];
   this.setState({currentPair: currentPairs});
   this.checkIfFinished();
  }

  handleResetNoMatch = (cardOne, cardTwo) => {

    const cardOneInArray = this.state.cards[cardOne.index];
    const cardOneCopy = {...cardOneInArray};
    cardOneCopy.feedback = "hidden";
    cardOneCopy.flipped = false;

    const cardTwoInArray = this.state.cards[cardTwo.index];
    const cardTwoCopy = {...cardTwoInArray};
    cardTwoCopy.feedback = "hidden";
    cardTwoCopy.flipped = false;

    const cards = [...this.state.cards];
    cards[cardOne.index] = cardOneCopy;
    cards[cardTwo.index] = cardTwoCopy;
    
    //make copy of current pairs and reset state to empty array
    let currentPairsUpdate = [...this.state.currentPair];
    currentPairsUpdate = [];


    setTimeout( () => this.setState({cards: cards, currentPair: currentPairsUpdate}), 1000)
  }
  
  handleRestart = () => {
    const cards = [...this.state.cards];
    cards.forEach((element) => {
      element.flipped = false;
      element.feedback = "hidden";
    });

    let currentPairsUpdate = [...this.state.currentPair];
    currentPairsUpdate = [];

    this.setState({cards: cards, currentPair: currentPairsUpdate, guesses: 0, gameFinished: false});
  }

  //this needs to be fixed
  checkIfFinished = () => {
    // const isFinished = this.state.cards.every(val => console.log(val.feedback));
    const matchedArray = this.state.cards.filter(card => card.feedback === "matched")

    if (matchedArray.length >= 6) {
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