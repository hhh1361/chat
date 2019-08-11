import React from 'react'


export default function HelloWorld(state) {
    return (
        <div>
            <div>Numba {state.num}</div>
            <div style={{border: '1px solid black', width: '50px', height: '50px', lineHeight: '50px'}} 
                onClick={function(){
                console.log('+1')
            }}>plus</div>
            <div style={{border: '1px solid black', width: '50px', height: '50px', lineHeight: '50px'}} 
                onClick={function(){
                console.log('-1')
            }}>minus</div>
        </div>
    )
}