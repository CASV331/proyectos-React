import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {
    return(
        <section className='app'>
            <TwitterFollowCard/>
        </section>
    )
}