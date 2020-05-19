import React from "react";
import "./Confetti.css"

const Confetti = (props) => {
    return(
        <div className="celebration-container">
            <div className="confetti-container">
                <img className="confetti" src="https://jebbit-assets.s3.amazonaws.com/crush/ebay%20tech%20season/4-4_Confetti.png" />
                <img className="confetti" src="https://jebbit-assets.s3.amazonaws.com/crush/ebay%20tech%20season/4-4_Confetti.png" />
                <img className="confetti" src="https://jebbit-assets.s3.amazonaws.com/crush/ebay%20tech%20season/4-4_Confetti.png" />
                <img className="confetti" src="https://jebbit-assets.s3.amazonaws.com/crush/ebay%20tech%20season/4-4_Confetti.png" />
            </div>
        </div>
    )
}

export default Confetti;