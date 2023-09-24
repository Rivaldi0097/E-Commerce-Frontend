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
    const [slide, setSlide] = useState<any>(
        <div className='SlideContent'>
            <img src={sliderData[slideNumber]} alt='lmao1' className='SlideImg' />
        </div>
    )

    useEffect(() => {
        setSlide(
            <div className='SlideContent'>
                <img src={sliderData[slideNumber]} alt='lmao1' className='SlideImg'/>
            </div>
        )
    }, [slideNumber])
    


    return (
        <>
            <div className='SlideShowFlexbox'>
                
                {/* for previous button */}
                <button 
                    className='previous'
                    onClick={() => {
                        slideNumber - 1 < 0?
                            setSlideNumber(sliderData.length - 1)
                        :
                            setSlideNumber(slideNumber - 1)
                    }}
                >
                    &lt;
                </button>

                {slide}
                
                {/* for next button */}
                <button 
                    className='next'
                    onClick={() => {
                        slideNumber + 1 ===  sliderData.length?
                            setSlideNumber(0)
                        :
                            setSlideNumber(slideNumber + 1)
                    }}
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