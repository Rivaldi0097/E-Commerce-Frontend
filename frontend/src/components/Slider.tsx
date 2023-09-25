import React, { useEffect, useState } from 'react';
import "../styles/slider.css";
import Keyboard from "../assets/keyboard.avif";
import Watch from "../assets/watch.avif";
import Headphone from "../assets/headphone.avif";
import ShoeSlideShow from "../assets/shoes2.jpeg";

function Slider() {
    
    const [slideNumber, setSlideNumber] = useState<number>(0);
    const sliderData = [
        Keyboard, Watch, Headphone, ShoeSlideShow
    ]

    const previous = () => {

        if(slideNumber - 1 < 0){
            setSlideNumber(sliderData.length - 1)
        }else{
            setSlideNumber(slideNumber - 1)
        }
    }

    const next = () => {
        if(slideNumber + 1 ===  sliderData.length){
            setSlideNumber(0)
        }else{
            setSlideNumber(slideNumber + 1)
        }
    }
    


    return (
        <>
            <div className='SlideShowFlexbox'>
                
                {/* for previous button */}
                <button 
                    className='previous'
                    onClick={previous}
                >
                    &lt;
                </button>

                {sliderData.map((name, i) => {
                    return(
                        <div 
                            className = "SlideContent"
                            key={i}
                            style={{
                                display: slideNumber === i ? "" : 'none'
                            }}
                        >
                            <img src={sliderData[i]} alt='lmao1' className='SlideImg'/>
                        </div>
                    )
                })}
                
                {/* for next button */}
                <button 
                    className='next'
                    onClick={next}
                > 
                    &gt;
                </button>

            </div>

            <div className='SlideShowProgession'>
                {sliderData?.map((name, i) => {
                    return(
                        <button
                            className='ProgressButton'
                            key={i}
                            id={name}
                            onClick={() => {setSlideNumber(i)}}
                            style={{
                                backgroundColor: slideNumber === i ? "#717171" : "#bbb"
                            }}
                        />
                    )
                })}
            </div>
        </>
    );
}

export default Slider;