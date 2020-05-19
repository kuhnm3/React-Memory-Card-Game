import React from "react";
import "./Header.css"

const Header = (props) => {
    return(
        <div className="header-container">
           <p className="header-title">Mel's Memory Game</p>
           <button className="restart-button" onClick={props.restart}>Restart</button>
           <p>Your guesses: {props.guesses}</p>
        </div>
    )
}

export default Header;