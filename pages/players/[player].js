import React from 'react';
import Image from 'next/image'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import styles from './Players.module.css';
import PlayerAverageRow from '../../Components/PlayerAverageRow';
import PageLayout from '../../Components/PageLayout';

// Api Route
import { retrieveAvgSeasonData, retrieveNbaPlayerStats, retrievePlayerId } from '../api/player'

/**
 * 
 * 
 * URL for getting NBA player's image
 *  - https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/(Number).png
 *  - (Number) : The ID of the player that is linked to the image / url below
 *  
 * URL for the list of all of the NBA Players 
 *  - http://data.nba.net/data/10s/prod/v1/(season)/players.json
 *  - (Season) : the most recent season the player has played
 * 
 *  URL for the logos of all the NBA Teams
 *  - https://cdn.nba.com/logos/nba/(TeamID)/primary/L/logo.svg
 * 
 * @param {*} param0 
 * @returns 
 */
const Player = ({ playerInfo, avgSeasonData, playerMeta, playerSchedule }) => {    
    let { 
        first_name,
        last_name,
        team
    } = playerInfo

    let { playerID, teamId, position, heightFeet, heightInches, weightPounds, draft, nbaDebutYear, jersey} = playerMeta
    let { pickNum, roundNum } = draft

    let playerImage = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`
    let teamLogoUrl = `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`
    let PlayerComponent = (
        <Card className = {styles.Card}>
            <Container className = {styles.imageWrapper}>
                <div className= {styles.logoWrapper}>
                    <Image className={styles.logo} src = {teamLogoUrl} layout = "fill" alt = {`${first_name} ${last_name}`} />
                </div>
                <Image className={styles.playerImage} src = {playerImage}  width = { 260 } height = { 190 } alt = {`${first_name} ${last_name}`} />

                
            </Container>
            <Card.Body className = {styles.metaData}>
                <Card.Title className = {styles.playerName}>{ first_name } { last_name } (#{jersey}) </Card.Title>
                <Card.Text><strong>Position</strong> { position }</Card.Text>
                <Card.Text><strong>Height: </strong> { heightFeet } ' { heightInches } ''</Card.Text>
                <Card.Text><strong>Weight:</strong> { weightPounds } lbs</Card.Text>
                <Card.Text><strong>Draft:</strong> {roundNum} round, {pickNum} pick</Card.Text>
                <Card.Text><strong>Debut Year:</strong> { nbaDebutYear }</Card.Text>
            </Card.Body>
        </Card>
    )
    
    // Table headers for the season averages.
    let avgHeaders = ['Season', 'Mins', 'Points', 'FGM', 'FGA', 'FG_PCT', '3pt-FGM', '3pt-FGA', 'FG3_PCT', 'FTM', 'FTA', 'FT_PCT', 'AST', 'REB', 'OREB', 'DREB', 'STL', 'BLK', 'TO']
    let averagesComponent = avgHeaders.map((header, key) => ( <th key = {key}>{ header }</th>))
    
    
    return (
        <PageLayout> 
            { PlayerComponent }
            <h1 className = {styles.statsHeader}>Stats</h1>
            <Table hover responsive striped className = {styles.Table}>
                <thead>
                    <tr>
                        { averagesComponent }
                    </tr>
                </thead>
                <tbody>
                    <PlayerAverageRow  stats = {avgSeasonData} />
                </tbody>
            </Table>
            <h1>Player's Upcoming Games</h1>
        </PageLayout>
    )
}


export async function getServerSideProps(context) {
    // Retrieve the name of the player from the url.
    let player = context.params.player
    let playerInfo = await retrievePlayerId( context.params)
    let avgSeasonData = await retrieveAvgSeasonData(playerInfo.id)
    let playerMeta = await retrieveNbaPlayerStats(context.params)
    
    return {props : { playerInfo, avgSeasonData, playerMeta }}
}

export default Player;
