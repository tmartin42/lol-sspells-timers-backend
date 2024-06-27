class sSpells {
    constuctor() {
        this.sSpells = [];
    }
 
    set(sSpells) {
        this.sSpells = Object.values(sSpells.data);
    }

    get(sSpellId) {

        if(sSpellId)
            return this.sSpells.find((sSpell) => sSpell.key == sSpellId);

        
        return this.sSpells;
    }
 }
 
 let repo = new sSpells();
 module.exports = repo;