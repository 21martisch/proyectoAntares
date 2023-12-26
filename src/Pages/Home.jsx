import img from '../components/home/logo-antares.png';
import '../components/home/home.css'
import React from 'react';

function Home(){
    return(
        <div className='imgFondo'>
            <div className='container'>
                
                <img src={img} alt="" className='img'/>
            </div>
        </div>
    );
}

export default Home;