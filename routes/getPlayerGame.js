var express = require('express');
var router = express.Router();

const {getPuuid, getGame} = require('../services/riotApi.js')

const champions = require('../repos/champions.js')
const sSpells = require('../repos/sSpells.js')

const gameInfoJson = require('../services/gameExample.json')

const getCurrentTeam = (players, puuid) => {
  const currentPlayerTeamId = players.find((player) => player.puuid === puuid).teamId

  return players.filter((player) => player.teamId === currentPlayerTeamId)
}


const cleanGameInfo = (players, puuid) => {

  const currentTeam = getCurrentTeam(players, puuid)

  return currentTeam.map((player) => {

    const championInfo = champions.get(player.championId)
    const spell1Info = sSpells.get(player.spell1Id)
    const spell2Info = sSpells.get(player.spell2Id)

    return {...player, championInfo, spell1Info, spell2Info}
  })
}  



/* GET home page. */
router.get('/', async function(req, res, next) {

  if (!champions.get().length || !sSpells.get().length)
    return res.send('error getting stuff');
    
  console.log(req.query)
 // const playerInfo = await getPuuid('GBM Mimi', 'GBM');

 // if (!!!playerInfo || !!!playerInfo.puuid) //check if player exists
 //   return res.send('player not found')

  //const gameInfo = await getGame(playerInfo.puuid, 'euw1');
    const gameInfo = null;

  if (!!!gameInfo)
    return res.status(404).send('not in a game')

    gameInfo = gameInfoJson;



//  console.log(gameInfoJson)
  return res.send(cleanGameInfo(gameInfo.participants, "sD1shWIdsPJ6WR64sulMhUm75GcOG8rWKqOHuA4v6Ggfz9CyougRMQHB2NBSbc0tg8OCie9hKXCHOw"));
 
});

module.exports = router;
