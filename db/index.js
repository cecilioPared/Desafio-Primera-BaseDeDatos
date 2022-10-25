const knex = require("knex")
class DB {
    constructor(options, table){
        this.options = options
        this.table = table
    }

    async createTable(tableSchema){
        try {
            this.instance = knex(this.options) 
            const exist = await this.instance.schema.hasTable(this.table)
            if(exist) {
              console.log(`La tabla ${this.table} ya existe.`)
              return
            }                        
            await this.instance.schema.createTable(this.table, tableSchema)
        } catch (error) {
            console.log(`Hubo un error al crear la tabla  ${this.table}`)
            throw Error(`error: ${error.message}`)
        } finally {
            await this.instance.destroy()
        }
    }

    async getData(){
        let data;
        try {
            this.instance = knex(this.options) 
            if (await this.instance.schema.hasTable(this.table))
                data = await this.instance(this.table).select()                
        } catch (error) {
            console.log(`Hubo un error al consultar datos de la tabla ${this.table}` )
            throw Error(`error: ${error.message}`)
        } finally {
            await this.instance.destroy()
            return data
        }
    }

    async insertData(data){
        try {
            this.instance = knex(this.options) 
            if(await this.instance.schema.hasTable(this.table)){
                console.log(`intentando guardar datos en tabla: ${this.table}`)
                await this.instance(this.table).insert(data)
                console.log(`intentando guardar datos en tabla: ${this.table}`)
            }
        } catch (error) {
            console.log(`Hubo un error al guardar registro en la tabla ${this.table}` )
            throw Error(`error: ${error.message}`)
        } finally {
            await this.instance.destroy()
        }
    }
}

module.exports = { 
    DB 
}