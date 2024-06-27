
const axios = require('axios');

const apiKey = require('./apiKey.json').key;


const getSummonerAndChampions = async (gameName, tagLine) => {
    console.log('lol')

    const APIDDRAGON = axios.create({
        baseURL: "https://ddragon.leagueoflegends.com/"
    });
    //
    const versions = await APIDDRAGON.get('/api/versions.json').catch(err => null)//.then(response => console.log(response.data) )
    if (!versions.data)
        return 'api is down'

    const champions = await APIDDRAGON.get(`cdn/${versions.data[0]}/data/en_US/champion.json`).catch(err =>{console.log(err); return {data: {data: {}}}})

    const sSpells = await APIDDRAGON.get(`cdn/${versions.data[0]}/data/en_US/summoner.json`).catch(err => ({data: {data: {}}}))

    return {champions: champions.data, sSpells: sSpells.data}
}

module.exports = {getSummonerAndChampions}