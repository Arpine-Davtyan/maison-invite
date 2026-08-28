"use client";

import { scrollCollection } from '@/lib/actions/scroll';

const Hero = () => {
    return (
        <div className='hero'>
            <h6>Թվաային Հրավիրատոմսեր</h6>
            <h1>Ձեր օրը՝ <span className='text-gold italic'>մեկ հղումով</span></h1>
            <p className='simple-text'>
                Ընտրեք հրավիրատոմսը, լրացրեք ձեր տվյալները և ստացեք այն պատրաստ՝ կիսվելու համար։
            </p>
            <button 
                onClick={scrollCollection}
                className="btn-dark"
            >
                Դիտել Հրավիրատոմսերը
            </button>
        </div>
    )
}

export default Hero
