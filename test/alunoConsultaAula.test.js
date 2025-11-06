const request = require('supertest');
const{ expect } = require('chai');
require('dotenv').config()
const { obtertokenAluno } = require('../helpers/autenticacaoAluno')


describe('Aluno consulta a aula', () => {
    let tokenAluno

        beforeEach(async () => {
            tokenAluno = await obtertokenAluno('pamela.persuhn@teste.com','123456','aluno')
        })

    describe('GET /aulas', () => {
        it('Deve retornar status 200 e listar as aulas dos alunos', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/aulas')
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenAluno)

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        })
    })
})

describe('Aluno consulta a aula sem estar autenticado', () => {
    describe('GET /aulas', () => {
        it('Deve retornar status 401 Não autenticado', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/aulas')
                .set('Content-Type','application/json')

            expect(resposta.status).to.equal(401);
        })
    })
})
 