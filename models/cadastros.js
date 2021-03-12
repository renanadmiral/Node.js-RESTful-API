const conexao = require('../infraestrutura/conexao')

class Pessoas {
    adicionaPessoa(pessoas, res) {
        const cpfValido = pessoas.cpf.length === 11
        const nomeValido = pessoas.nome.length >= 5
        const nascValido = pessoas.dataNasc.length === 10

        const validacoes = [
            {
                nome: 'cpf',
                valido: cpfValido,
                mensagem: 'CPF inválido. O CPF deve conter apenas números, não use pontos e traço'
            },
        
            {
                nome: 'nome',
                valido: nomeValido,
                mensagem: 'O nome cadastrado deve ser maior que 5 caracteres'
            },

            {
                nome: 'dataNasc',
                valido: nascValido,
                mensagem: 'Data inválida'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO Pessoas SET ? '

            conexao.query(sql, pessoas, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(pessoas)
                }
            })

        }

       
    }

    adicionaEndereco (enderecos, res){
        const sql = 'INSERT INTO Enderecos SET ?'

        conexao.query(sql, enderecos, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(enderecos)

            }
        })
    }

    adicionaCidade (cidades, res){
        const sql = 'INSERT INTO Cidades SET ?'

        conexao.query(sql, cidades, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(cidades)

            }
        })
    }

    adicionaEstado (estados, res){
        const sql = 'INSERT INTO Estados SET ?'

        conexao.query(sql, estados, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(estados)

            }
        })
    }

    adicionaPais (paises, res){
        const sql = 'INSERT INTO Paises SET ?'

        conexao.query(sql, paises, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(paises)

            }
        })
    }

    lista(res){
        const sql = 'SELECT * FROM Pessoas'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorCpf(cpf, res){
        const sql = `SELECT p.cpf, p.nome, p.dataNasc, e.cep, e.logradouro, e.numero, c.siglaCidade, c. nomeCidade, es.siglaEstado, es.nomeEstado, pa.siglaPais, pa.nomePais
         FROM Pessoas as p LEFT JOIN Enderecos e ON p.cpf = e.cpfCliente INNER JOIN Cidades c ON e.idCidade = c.idCidade INNER JOIN Estados es ON c.idEstado = es.idEstado
          INNER JOIN Paises pa ON es.idPais = pa.idPais WHERE p.cpf = ${cpf}`

        conexao.query(sql, (erro, resultados) => {
            const pessoa = resultados
            if(erro) {
                res.status(400).json(erro)
            } else {
               if(pessoa.length === 0) {
                    res.status(404).json({erro: "Registro não encontrado"})

                    
                } else {
                    res.status(200).json({cpf: pessoa[0].cpf, nome: pessoa[0].nome, dataNasc: pessoa[0].dataNasc, endereco: {cep: pessoa[0].cep, logradouro: pessoa[0].logradouro, numero: pessoa[0].numero, cidade:{nome: pessoa[0].nomeCidade, sigla: pessoa[0].siglaCidade}, estado:{nome: pessoa[0].nomeEstado ,sigla: pessoa[0].siglaEstado}, pais:{nome: pessoa[0].nomePais,sigla: pessoa[0].siglaPais }  } })

                }
            }
        })
    }

    altera(cpf, valores, res) {      
        const sql = 'UPDATE Pessoas SET ? WHERE cpf=?'

        conexao.query(sql, [valores, cpf], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, cpf})
            }
        })
    }

    deleta(cpf, res) {
        const sql = 'DELETE FROM Pessoas WHERE cpf=?'

        conexao.query(sql, cpf, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({cpf})
            }
        })
    }
}

module.exports = new Pessoas