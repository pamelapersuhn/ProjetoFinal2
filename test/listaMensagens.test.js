const request = require('supertest');
const{ expect } = require('chai');
require('dotenv').config()
const { obtertokenAluno } = require('../helpers/autenticacaoAluno')
const { obtertokenProfessor } = require('../helpers/autenticacaoProfessor')


describe('Aluno consulta suas mensagens', () => {
    let tokenAluno

        beforeEach(async () => {
            tokenAluno = await obtertokenAluno('pamela.persuhn@teste.com','123456','aluno')
        })

    describe('GET /api/mensagens', () => {
        it('Deve retornar status 200 e listar as mensagens do aluno', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/mensagens/{outroId}')
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenAluno)

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        })
    })
})

describe('Professor consulta suas mensagens', () => {
    let tokenProfessor

        beforeEach(async () => {
            tokenProfessor = await obtertokenProfessor('gil@teste.com','123456','professor')
        })

    describe('GET /api/mensagens', () => {
        it('Deve retornar status 200 e listar as mensagens do professor', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/mensagens/{outroId}')
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenProfessor)

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        })
    })
})

