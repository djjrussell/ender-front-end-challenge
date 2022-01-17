import React from 'react';
import gif from './../assets/spinning-loading.gif'

export const Spinner = () => {
    return (
        <div id='spinnerContainer'>
            <img alt='loading...' src={gif} />
        </div>
    )
}

export default Spinner;