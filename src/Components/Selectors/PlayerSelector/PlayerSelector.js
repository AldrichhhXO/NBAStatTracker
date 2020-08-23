import React, {useState, useEffect} from 'react'
import "../../../css/components/PlayerSelector.css"

import axios from 'axios'
import cheerio from 'cheerio'

import { Link } from 'react-router-dom'

export default function PlayerSelector(props) {
    let [image, setImage] = useState('');
    useEffect()


    async function scrapeNBAImage() {
        const html = await axios.get(`https://www.nba.com/search#/${props.data.first_name}%20${props.data.last_name}`)
        const $ = await cheerio.load(html.data);
        let data = []
        
    }



    return (
        <div className = "PlayerSelector">
            <h1>Name: {props.data.first_name} {props.data.last_name}</h1>
            <p> <b>Position:</b> { props.data.position == "" ? "Retired" : props.data.position}</p>
            <p>Team: {props.data.team.full_name}</p>
        </div>
    )
}


