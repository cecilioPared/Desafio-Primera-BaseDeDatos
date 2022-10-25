const sqlite = {
    client: "sqlite3",
    connection: {
        filename: "./mensajes.sqlite"
    },
    useNullAsDefault: true
}

const mariadb = {
    client: "mysql",
    connection: {
        host: process.env.URI || "127.0.0.1",
        port: process.env.PORT_DB || 3306,
        user: process.env.NODE_USER || "root",
        password: process.env.NODE_PASS || "",
        database: process.env.NODE_DB || "coderhouse"
    }
}

module.exports = {
    sqlite,
    mariadb
}