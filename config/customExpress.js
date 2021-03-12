//Este arquivo é responsável por configurar a framework e bibliotecas
const express = require('express') //framework
const consign = require('consign') //junta controladores
const bodyParser = require('body-parser') //conversor de requisiçoes json
const cors = require('cors');


module.exports = () => {
    const app = express()

    app.use((req, res, next) => {
        //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
        res.header("Access-Control-Allow-Origin", "*");
        //Quais são os métodos que a conexão pode realizar na API
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST, PATCH, DELETE');
        app.use(cors());
        next();
    });

    app.use(bodyParser.urlencoded({extended: true})) //converte e lê formularios urlencoded
    app.use(bodyParser.json()) //converte e lê formulários json

    consign()
        .include('controllers')
        .into(app)

    return app
}