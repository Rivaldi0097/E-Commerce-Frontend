import React from 'react';
import "../styles/homeProducts.css";
import Star from "../assets/star.svg";

interface StarReview{
    numberOfStars: number,
    numberOfReviews?: number
}

function ProductStarReview({numberOfStars, numberOfReviews}: StarReview) {

    let stars = []

    for(let i=0; i<numberOfStars; i++){
        stars.push(
            <img src={Star} alt="star" className='Star' key={i}/>
        )
    }

    return (
        <div className='ReviewsFlex'>
            <div style={{marginLeft: "20px"}}>
                {stars}
            </div>

            {numberOfReviews?
                <div>
                    ({numberOfReviews})
                </div>
            :
                <></>
            }

        </div>
    );
}

export default ProductStarReview;