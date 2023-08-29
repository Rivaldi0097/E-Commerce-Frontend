"use client"

import React from 'react';

interface CategoryProps{
    buttonWord: string,
}

function Button({buttonWord}: CategoryProps) {

    

    return (

        <button type='button' className='Button'>
            {buttonWord}
        </button>
    );
}

export default Button;