const { DB } = require('./index')
const { sqlite } = require('./options')

class Mensajes extends DB {
    constructor(tableName){
        super(sqlite, tableName)        
    }

    async createTable(){
        await super.createTable((table) => {            
            table.increments('id').notNullable()
            table.string('email', 100).notNullable()                        
            table.string('mensaje',255).notNullable()
            table.timestamp("fecha").defaultTo(this.instance.fn.now());
            table.primary('id')
        })
    }
}

module.exports = { 
    Mensajes 
}
