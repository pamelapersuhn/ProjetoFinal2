const request = require('supertest');
const{ expect } = require('chai');
require('dotenv').config()
const { obtertokenProfessor } = require('../../helpers/autenticacaoProfessor')
const { obtertokenAluno } = require('../../helpers/autenticacaoAluno')

describe('Professor adiciona atividade nas aulas', () => {
    let tokenProfessor

        beforeEach(async () => {
            tokenProfessor = await obtertokenProfessor('gil@teste.com','123456','professor')
        })

    describe('POST /atividades', () => {
        it('Deve retornar sucesso com 201 Atividade criada', async () => {
            const aulaId = 1
            
            const resposta = await request(process.env.BASE_URL)
                .post(`/api/aulas/${aulaId}/atividades`)
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenProfessor)
                .send({
                       "descricao": "Atividade criada durante o teste automatizado",
                      })

                expect(resposta.status).to.equal(201);
        })

        it('Deve retornar 404 Aula não encontrada', async () => {
            const aulaId = 9999
            
            const resposta = await request(process.env.BASE_URL)
                .post(`/api/aulas/${aulaId}/atividades`)
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenProfessor)
                .send({
                       "descricao": "Atividade criada durante o teste automatizado porém não deve ser encontrada",
                      })

                expect(resposta.status).to.equal(404);
        })

       
    })

    

})

describe('Aluno tenta adicionar atividade nas aulas', () => {
    let tokenAluno

        beforeEach(async () => {
            tokenAluno = await obtertokenAluno('pamela.persuhn@teste.com','123456','aluno')
        })

    describe('POST /atividades', () => {
        it('Deve retornar 403 Acesso negado', async () => {
            const aulaId = 1
            
            const resposta = await request(process.env.BASE_URL)
                .post(`/api/aulas/${aulaId}/atividades`)
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenAluno)
                .send({
                       "descricao": "Atividade criada durante o teste automatizado por um aluno",
                      })

                expect(resposta.status).to.equal(403);
        })
     
    })

})