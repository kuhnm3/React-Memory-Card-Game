import React from "react";
import "./Card.css"

const Card = (props) => {
    const classNames = ["card"];
    if (props.isFlipped) {
        classNames.push("card-flipped");
    }
    
    if (props.isMatched === "matched") {
        classNames.push("is-matched");
    }
    return(
        <div className="card-container">
            <div onClick={props.clicked} className={classNames.join(" ")}>
                <div className="card-face card-front"></div>
                <div className="card-face card-back">
                    <img className="cardImage" src={props.image} />
                </div>
            </div>
        </div>
    )
}


export default Card;