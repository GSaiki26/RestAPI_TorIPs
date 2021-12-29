// Libs
const { Client } = require('pg');

// Functions
class Db { // Classe que será retornada ao require.
    async Db_Execute(querry) { // Função para a comunicação com o banco de dados.
        console.log('Iniciando Db_Execute()...');
        // Code 
        let code, result;
        try {
            let con = await Db_Connect();
            code = await con.query(querry);
            result = code.rows;
            console.log('Comunicação com o banco de dados realizada com sucesso!');
        } catch (err) {
            console.log(`Erro ao comunicar-se com o banco de dados. Erro: ${err}`);
        }
        return result;
    }
}
async function Db_Connect() { // Função que retornará a conexão com o banco de dados.
    console.log('Iniciando Db_Connect()...');
    // Code
    let con;
    try {
        // Create the string de conexão com o banco de dados.
        let conString = "postgres://user:password@pg-con:5432/db";

        con = new Client({
            connectionString: conString});
        await con.connect();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (err) {
        console.log(`Erro ao conectar-se ao Banco de Dados. Erro: ${err}`);
    }
    return con;
}
// Code
module.exports = new Db(); // O modulo exportado será uma instância de Db.