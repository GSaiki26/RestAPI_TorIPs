// Lib - Divisão para a definição de bibliotecas.
const http = require('http'); // Faça a importação da lib para a criação do server


// Data - Divisão para guardar as váriaveis globais.
const API = require('./Api.js'); // Importe a lib da API.
const api = new API(); // Instancie a API.
const port = 80; // Declarar a porta que o server irá abrir.

// Functions - Divisão voltada às funções.

// Code - Divisão para código sem função.
http.createServer((req, res) => {
    console.log('A conexão foi estabelecida!');
    // Data
    const method = req.method; const url = req.url; // Variaveis para encurtar o nome.

    // Code
    console.log(`Client acessando ${url}.`);
    if (method == 'GET' && req.url == '/Get_AllIPs') { // Caso faça uma request GET neste caminho, retorne a lista inteira de IPs.
        api.Get_AllIPs().then(ip => { // Promise da API para conseguir todos os IPs.
            res.statusCode = 200; res.write(JSON.stringify(ip)); res.end(); // Retorne o response ao Client caso dê certo.
            console.log('A conexão foi retornada com Status Code: 200\n');
        }).catch((err) => {
            res.statusCode = 500; res.write('Internal Server Error.'); res.end(); // Retorne o response com código 500 (Internal Server erro) ao Client.
            console.log(`A conexão foi retornada com Status Code: 500. Erro: ${err}\n`);
        });
    } else if (method == 'GET' && req.url == '/Get_IPs') {
        api.Get_IPs().then(ip => { // Promise da API para conseguir a lista de IPs censurada.
            res.statusCode = 200; res.write(ip); res.end(); // Retorne o response ao Client caso dê certo.
            console.log('A conexão foi retornada com Status Code: 200!\n');
        }).catch(err=> {
            res.statusCode = 500; res.write('Erro interno no servidor.'); res.end(); // Retorne o response com código 500 (Internal Server erro) ao Client.
            console.log(`A conexão foi retornada com Status Code: 500. Erro: ${err}\n`);
        });
    } else if (method == 'POST' && req.url == '/Ban_IP') {
        console.log(req.headers);
        api.Ban_IP().then(ip => { // Promise da API para o banimento de um IP.
            res.statusCode = 202; res.write('O IP foi banido com sucesso.'); res.end(); // Retorne o response com código 202 (Accepted) ao Client.
        }).catch(err => {
            res.statusCode = 400; res.write('Formato da request incorreta');// Retorne o response com código 202 (Bad Request) ao Client.
        });
    }
    else { // Caso a url não exista na API, retorne erro.
        console.log('Client em um caminho nao especificado!');
        res.statusCode = 303; res.write(`O caminho ${url} nao foi encontrado!\nPor favor, leia a documentacao da API.`);
        res.end(); // Retorne o response ao Client.
        console.log('A conexão foi retornada com Status Code: 303!\n');
    }
    //console.log('A conexão foi retornada!'); não foi colocada aqui por culpa de funções Async.
}).listen(port);
console.log(`A API esta ligada na porta ${port}`);