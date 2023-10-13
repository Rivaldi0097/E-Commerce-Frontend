import React from 'react';

function Loading() {


    return (
        <div
            style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                marginTop:'30px'
            }}
        >
            <div
                style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    width: '80%',
                    height:'80vh',
                    backgroundColor: '#f5f6f6'
                }}
            >
                Loading Content ...
            </div>
        </div>
    );
}

export default Loading;