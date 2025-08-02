const {Pool} =require('pg');
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
};

console.log('Configuracion de DB:',{
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    port: dbConfig.port
});

const Pool = new Pool(dbConfig);

//Test the initial connection
Pool.connect((err,client, release)=>{
    if(err){
        console.error('Error al conectar a PostgreSQL: ',err);
        return;
    }else{
        console.log('Conexion exitosa a PostgreSQL');
        release();
    }
});

module.exports = {
    query: (text,params)=> Pool.query(text,params),pool
}