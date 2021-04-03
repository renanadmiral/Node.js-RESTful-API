//Este arquivo controla a rota cadastros
const Pessoas = require('../models/cadastros')

module.exports = app => {
    app.get('/cadastros',(req, res) => {
        Pessoas.lista(res)
    })

    app.get('/cadastros/pessoas/:cpf', (req, res) => {
       const cpf = req.params.cpf

       Pessoas.buscaPorCpf(cpf, res)
    })

    app.post('/cadastros/pessoas', (req, res) =>{
        const pessoas = req.body

        Pessoas.adicionaPessoa(pessoas, res)
    })

    app.post('/cadastros/enderecos', (req, res) => {
        const enderecos = req.body

        Pessoas.adicionaEndereco(enderecos, res)
    })

    app.post('/cadastros/cidades', (req, res) => {
        const cidades = req.body

        Pessoas.adicionaCidade(cidades, res)
    })

    app.post('/cadastros/estados', (req, res) => {
        const estados = req.body

        Pessoas.adicionaEstado(estados, res)
    })

    app.post('/cadastros/paises', (req, res) => {
        const paises = req.body

        Pessoas.adicionaPais(paises, res)
    })


    app.patch('/cadastros/pessoas/:cpf', (req, res) => {
        const cpf = req.params.cpf
        const valores = req.body

       Pessoas.altera(cpf, valores, res)
    })

    app.delete('/cadastros/pessoas/:cpf', (req, res) => {
        const cpf = req.params.cpf

        Pessoas.deleta(cpf, res)
    })

}
