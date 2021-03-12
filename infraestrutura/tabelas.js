//Este arquivo executa funções de criação de tabelas
class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarPaises()
        this.criarEstados()
        this.criarCidades()
        this.criarPessoas()
        this.criarEnderecos()
        
    }

    criarPessoas() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pessoas (cpf varchar(20) NOT NULL, nome varchar(50) NOT NULL, dataNasc varchar(10) NOT NULL, PRIMARY KEY(cpf)) '

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            }
            else {
                console.log('Tabela Pessoas criada com sucesso')
            }
        })
    }

    criarEnderecos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Enderecos (idEndereco int NOT NULL AUTO_INCREMENT, cep varchar(10), logradouro varchar(100) NOT NULL, numero varchar(10) NOT NULL, cpfCliente varchar(20), idCidade int NOT NULL, PRIMARY KEY (idEndereco), FOREIGN KEY (cpfCliente) REFERENCES Pessoas (cpf), FOREIGN KEY (idCidade) REFERENCES Cidades (idCidade) )'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            }
            else {
                console.log('Tabela Enderecos criada com sucesso')
            }
        })
    }

    criarCidades() {
        const sql = 'CREATE TABLE IF NOT EXISTS Cidades (idCidade int NOT NULL AUTO_INCREMENT, nomeCidade varchar(20) NOT NULL, siglaCidade varchar(10) NOT NULL, idEstado int NOT NULL , PRIMARY KEY(idCidade), FOREIGN KEY (idEstado) REFERENCES Estados (idEstado) ) '

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            }
            else {
                console.log('Tabela Cidades criada com sucesso')
            }
        })
    }

    criarEstados() {
        const sql = 'CREATE TABLE IF NOT EXISTS Estados (idEstado int NOT NULL AUTO_INCREMENT, nomeEstado varchar(20) NOT NULL, siglaEstado varchar(10) NOT NULL, idPais int NOT NULL , PRIMARY KEY(idEstado), FOREIGN KEY (idPais) REFERENCES Paises (idPais) ) '

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            }
            else {
                console.log('Tabela Estados criada com sucesso')
            }
        })
    }

    criarPaises() {
        const sql = 'CREATE TABLE IF NOT EXISTS Paises (idPais int NOT NULL AUTO_INCREMENT, nomePais varchar(20) NOT NULL, siglaPais varchar(10) NOT NULL,  PRIMARY KEY(idPais) ) '

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            }
            else {
                console.log('Tabela Paises criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas