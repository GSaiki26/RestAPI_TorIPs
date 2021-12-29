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

    //     await Db_Connect().then(async con => {
    //         try { // Tente executar a quarry.
    //             result = await con.query(querry);
    //             console.log(`A querry ${querry} foi executada com sucesso!`);
    //             code = 202;
    //         } catch (err) { // Em caso de erro, escreva o erro no console, e retorne 500;
    //             if (err.toString().indexOf('Duplicate entry') != -1) { // Caso seja encontrado este trecho do erro, o ip já foi adicionado.
    //                 console.log('O ip informado já foi adicionado!');
    //                 code = 406;
    //             } else {
    //                 console.log(`A querry não foi executada devido a um erro. Erro: ${err}`);
    //                 code = 500;
    //             }
    //         }
    //     });
    //     return [result, code];
    // }
}
async function Db_Connect() { // Função que retornará a conexão com o banco de dados.
    console.log('Iniciando Db_Connect()...');
    // Code
    let con;
    try {
        // Create the string de conexão com o banco de dados.
        let conString = "postgres://pg_user:pg_password@pg-con:5432/pg_db";

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