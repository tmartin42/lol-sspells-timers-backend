class champions {
    constuctor() {
        this.champions = [];
    }
 
    set(champions) {
       // console.log('set', Object.values(champions.data))
        this.champions = Object.values(champions.data);
    }
    
    get(championId) {
        if (championId) {
            return this.champions.find((champion) => champion.key == championId);
        }

        return this.champions;
    }
 }
 
 let repo = new champions();
 module.exports = repo;