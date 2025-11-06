const request = require('supertest');
const{ expect } = require('chai');
require('dotenv').config()
const { obtertokenProfessor } = require('../../helpers/autenticacaoProfessor')
const { obtertokenAluno } = require('../../helpers/autenticacaoAluno')


describe('Professor envia mensagem para o aluno', () => {
    let tokenProfessor

        beforeEach(async () => {
            tokenProfessor = await obtertokenProfessor('gil@teste.com','123456','professor')
        })

    describe('POST /api/mensagens', () => {
        it('Deve retornar sucesso com 201 Mensagem enviada', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/mensagens')
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenProfessor)
                .send({
                       "destinatarioId": 1,
                       "texto": "Atenção aluno, esta é uma mensagem enviada pelo teste automatizado"
                    })

                expect(resposta.status).to.equal(201);
        })       
    })
})

describe('Aluno envia mensagem para o professor', () => {
    let tokenAluno

        beforeEach(async () => {
            tokenAluno = await obtertokenAluno('pamela.persuhn@teste.com','123456','aluno')
        })

    describe('POST /api/mensagens', () => {
        it('Deve retornar 201 Mensagem Enviada', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/mensagens')
                .set('Content-Type','application/json')
                .set('Authorization','Bearer '+ tokenAluno)
                .send({
                       "destinatarioId": 1,
                       "texto": "Atenção professor, esta é uma mensagem enviada pelo teste automatizado"
                      })

                expect(resposta.status).to.equal(201);
        })
       
    })

})