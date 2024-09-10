var rl = require('readline-sync')
//erica, liuji, isabela, eduarda, miguel, pedro, francisco e alexandre 
export let bancoContas: Array<Conta> = []
export class Cliente {
    public nome: string;
    public cpf: number;
    public idade: number;
    public senha: number;
    constructor(nome: string, cpf: number, idade: number, senha: number) {
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
        this.senha = senha;

    }

    public setCadastroUsuario(): void {
        this.nome = rl.question('Digite seu nome: ')
        this.cpf = rl.questionInt('Digite seu CPF: ')
        this.idade = rl.questionInt(' Digite sua idade: ')
        this.senha = rl.questionInt(' Digite sua senha: ')
        console.log(`Nome: ${this.nome}, CPF: ${this.cpf}, Idade: ${this.idade}`)
    }

    public getVerUsuario(): void {
        console.log(`Cliente: ${this.nome}, Numero da conta: ${this.cpf}`)
    }

    public login(nome: string, senha: number): string {
        let nomeUsuario = rl.question('Insira seu nome:')
        let senhaUsuario = rl.question('Insira sua senha:')
        if (nome === nomeUsuario && senha === senhaUsuario) {
            return `nome de login :${this.nome} \n senha de login é: ${this.senha}`
        } else {
            return `login invalido, tente novamente!`
        }
        //usar o find no array de contas baseado no nome do cliente ou alguma info
    }
}

//CHAMAR O LOGIN DESSA FORMA:
let user: Cliente = new Cliente("p", 3, 5, 15) //TROCAR ISSO PARA O SISTEMA DE CADASTRO
user.login(user.nome, user.senha) //EXEMPLO  DO CASE DE LOGIN

export class Conta {
    public nome: string
    public senha: number
    public saldo: number
    public idade: number
    public cpf: number
    public historico: Array<string> = []
    constructor(nome: string, senha: number, saldo: number, idade: number, cpf: number) {
        this.nome = nome
        this.senha = senha
        this.saldo = saldo
        this.idade = idade
        this.cpf = cpf
    }

    public setSaldo(): void {
        this.saldo = rl.questionInt('Digite o valor do seu deposito: ')
        console.log(`O seu saldo é ${this.saldo}`)
    }

    public getSaldo(): void {
        console.log(`Seu saldo é ${this.saldo}`)
    }

    public saque(todosSaques: string): void {
        let valorSaque = rl.questionInt('Digite o valor que deseja sacar: ')
        if (valorSaque <= this.saldo) {
            this.saldo -= valorSaque
            console.log(`Seu novo saldo é ${this.saldo}`)
        } else {
            console.log('Saldo insuficiente')
        }
        this.historico.push(todosSaques)
    }

    public deposito(): void {
        let valorDeposito = rl.questionInt('Digite o valor que deseja depositar: ')
        this.saldo += valorDeposito
        console.log(`Seu novo saldo é ${this.saldo}`)
    }

    transferencias(outraConta: Conta, valorTransferencia: number): void {
        if (this.saldo > valorTransferencia) {
            this.saldo -= valorTransferencia
            outraConta.saldo += valorTransferencia
            console.log(`A quantia de ${valorTransferencia} foi transferida. Seu novo saldo é ${this.saldo}`)
        } else {
            console.log('Saldo insuficiente')
        }

    }

    public geraExtrato(): void {
        console.log(`Cliente :${this.nome} \n o saldo do cliente é: ${this.saldo}, \n Numero da Conta: ${this.cpf}`)
    }


}
export class ContaPoupanca extends Conta {
    constructor(nome: string, senha: number, saldo: number, idade: number, cpf: number) {
        super(nome, senha, saldo, idade, cpf)
    }

    public jurosPoupanca(): void {
        let valorPoupanca = rl.questionInt('Digite o valor que deseja aplicar: ')
        let tempo = rl.questionInt('Digite o tempo em anos: ')
        let juros = valorPoupanca * 0.05 * tempo
        console.log(`Seu juros é ${juros}`)
    }

    public rendimentos(): void {
        let valorRendimento = rl.questionInt('Digite o valor que deseja aplicar: ')
        let tempo = rl.questionInt('Digite o tempo em anos: ')
        let rendimento = valorRendimento * 0.50 * tempo
        console.log(`Seu rendimento é ${rendimento}`)
    }

    public getSaldo(): void {
        console.log(`Seu saldo é ${this.saldo}`)

    }

}

export class ContaCorrente extends Conta {
    constructor(nome: string, senha:number, saldo:number, idade:number, cpf: number) {
        super(nome, senha, saldo, idade, cpf)
        }

    public jurosAnual(): void {
        let valorJuros = rl.questionInt('Digite o valor que deseja aplicar: ')
        let tempo = rl.questionInt('Digite o tempo em anos: ')
        let juros = valorJuros * 0.05 * tempo
        console.log(`Seu juros é ${juros}`)
    }

    public getContaCorrente(): void {
        console.log(this.nome, )
    }

    public setContaCorrente(): void {
        let valorDeposito = rl.questionInt('Digite o valor que deseja depositar: ')
        this.saldo += valorDeposito
        console.log(`Seu novo saldo é ${this.saldo}`)
    }
}

export function criarConta(usuario: Cliente): void{

    let opt = rl.questionInt(`
        1 - Conta Corrente
        2 - Conta Poupança
        0 - Finalizar
    `)

    switch(opt){
        case 0:
            console.log("Encerrando criação de conta");
            process.exit(0)
        case 1:
            let novaContaC = new ContaCorrente(usuario.nome, usuario.senha, 0, usuario.idade, usuario.cpf)
            console.log(`Conta Corrente criada com sucesso`)
            bancoContas.push(novaContaC)
        case 2:
            let novaContaP = new ContaPoupanca(usuario.nome, usuario.senha, 0, usuario.idade, usuario.cpf)
            console.log(`Conta Poupança criada com sucesso`)
            bancoContas.push(novaContaP)
    }
}
//let novaConta = criarConta(cliente)
export function addConta(user: Conta): void{
    this.bancoContas.push(user)
}

//na transferencia você irá ter de printar todas as contas e escolher uma para transferir (usando o find)
//passar a conta por parâmetro e o valor também

//menus:
//menu 1) cadastro e login
//menu 2) menu da conta corrente ou conta poupança - fazer verificação do tipo de conta (if else)
//menu 3) atividades da conta: saque, transf, deposito etc



