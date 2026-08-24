"use client";

import { scrollCollection } from '@/lib/actions/scroll';

const Hero = () => {
    return (
        <div className='hero'>
            <h6>Digital invitation atelier</h6>
            <h1>Invitations that live at a link, <span className='text-gold italic'>not in a drawer</span></h1>
            <p className='simple-text'>Browse the collection by occasion, open the demo, and send your own version the same day — no printing, no post office.</p>
            <button 
                onClick={scrollCollection}
                className="btn-dark"
            >
                Browse the collection
            </button>
        </div>
    )
}

export default Hero
