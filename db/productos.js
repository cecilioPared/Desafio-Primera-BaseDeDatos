const { DB } = require('./index')
const { mariadb } = require('./options')


class Productos extends DB {
    constructor(tableName){
        super(mariadb, tableName)        
    }

    async createTable(){
        await super.createTable((table) => {            
            table.increments('id').notNullable()
            table.string('nombre', 100).notNullable()            
            table.integer('precio').notNullable()
            table.string('url',255).notNullable()      
            table.primary('id')
        })
    }
}

module.exports = { 
    Productos 
}
