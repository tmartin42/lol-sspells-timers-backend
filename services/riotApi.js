

const axios = require('axios');

const apiKey = require('./apiKey.json').key;


const getPuuid = async (gameName, tagLine) => {
    console.log('lol')

    const APIEUROPE = axios.create({
        baseURL: "https://europe.api.riotgames.com"
    });
    
    //API.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Sigma%20Grindsett/punch?api_key=RGAPI-ee614323-fa97-4649-abfb-8e0e78eaa2aa").then(response => console.log(response.data) )
    const res = await APIEUROPE.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${apiKey}`, {api_key: apiKey}).catch(err => err)//.then(response => console.log(response.data) )

    return res.data
}


const getGame = async (puuid, server) => {
    console.log('lol')

    const APIDYNAMIC = axios.create({
        baseURL: `https://${server}.api.riotgames.com/lol`
    });
    //API.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Sigma%20Grindsett/punch?api_key=RGAPI-ee614323-fa97-4649-abfb-8e0e78eaa2aa").then(response => console.log(response.data) )
    const res = await APIDYNAMIC.get(`/spectator/v5/active-games/by-summoner/${puuid}?api_key=${apiKey}`, {api_key: apiKey}).catch(err => err)//.then(response => console.log(response.data) )

    return res.data
}


//https://euw1.api.riotgames.com/lol/riot/account/v1/accounts/by-riot-id/Sigma%20GrindSett/punch?api_key=RGAPI-ee614323-fa97-4649-abfb-8e0e78eaa2aa
module.exports = {getPuuid, getGame}