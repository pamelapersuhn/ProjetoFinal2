const request = require('supertest');
const{ expect } = require('chai')
require('dotenv').config()

describe('Login', () => {
    describe('POST /Login', () => {
        it('Login de Aluno: Deve retornar 200 com token em string quando usar credenciais validas!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type','application/json')
                .send({
                    "email": "pamela.persuhn@teste.com",
                    "senha": "123456",
                    "role": "aluno"
                     })

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
            
        })

        it('Login de Aluno: Deve retornar 400 Role inválido!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type','application/json')
                .send({
                    "email": "pamela.persuhn@teste.com",
                    "senha": "123456",
                    "role": "invalido"
                     })

            expect(resposta.status).to.equal(400);
                        
        })

        
        it('Login de Aluno: Deve retornar 401 Credenciais inválidas!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type','application/json')
                .send({
                    "email": "pamela.persuhn@teste.com",
                    "senha": "999999",
                    "role": "aluno"
                     })

            expect(resposta.status).to.equal(401);
                        
        })

        it('Login de Professor: Deve retornar 200 com token em string quando usar credenciais validas!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type','application/json')
                .send({
                    "email": "gil@teste.com",
                    "senha": "123456",
                    "role": "professor"
                     })

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
                        
        })

        it('Login de Professor: Deve retornar 400 Role inválido!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type','application/json')
                .send({
                    "email": "gil@teste.com",
                    "senha": "123456",
                    "role": "role"
                     })

            expect(resposta.status).to.equal(400);
                        
        })

        it('Login de Professor: Deve retornar 401 Credenciais invalidas!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type','application/json')
                .send({
                    "email": "gil@teste.com",
                    "senha": "999999",
                    "role": "professor"
                     })

            expect(resposta.status).to.equal(401);
                        
        })      
    })
})