const request = require('supertest');
const{ expect } = require('chai');
require('dotenv').config()
const { obtertokenProfessor } = require('../../helpers/autenticacaoProfessor')
const { obtertokenAluno } = require('../../helpers/autenticacaoAluno')


describe('Professor cria a aula', () => {
    let tokenProfessor

        beforeEach(async () => {
            tokenProfessor = await obtertokenProfessor('gil@teste.com','123456','professor')
        })

    describe('POST /aulas', () => {
        it('Deve retornar sucesso com 201 Aula criada', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/aulas')
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenProfessor)
                .send({
                       "titulo": "Aula teste automatizado",
                       "descricao": "Aula criada durante o teste automatizado",
                       "alunoId": 1
                      })

                expect(resposta.status).to.equal(201);
        })       
    })
})

    
describe('Professor tenta criar a aula sem estar logado', () => {

    describe('POST /aulas', () => {
        it('Deve retornar 401 Não autenticado', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/aulas')
                .set('Content-Type','application/json')
                .send({
                       "titulo": "Aula teste automatizado sem o token",
                       "descricao": "Aula criada durante o teste automatizado sem o token",
                       "alunoId": 1
                      })

                expect(resposta.status).to.equal(401);
        })

       
    })
})

describe('Aluno tenta criar aula', () => {
    let tokenAluno

        beforeEach(async () => {
            tokenAluno = await obtertokenAluno('pamela.persuhn@teste.com','123456','aluno')
        })

    describe('POST /aulas', () => {
        it('Deve retornar 403 Acesso negado', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/aulas')
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenAluno)
                .send({
                       "titulo": "Aula teste automatizado criada pelo aluno",
                       "descricao": "Aula criada durante o teste automatizado pelo aluno",
                       "alunoId": 1
                      })

                expect(resposta.status).to.equal(403);
        })
       
    })

})

