const request = require('supertest');
const{ expect } = require('chai')
require('dotenv').config()

describe('Registrar Professor', () => {
    describe('POST /professor/register', () => {
        it('Deve retornar 201 Professor registrado com sucesso!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/professor/register')
                .set('Content-Type','application/json')
                .send({
                    "nome": "Grey Persuhn",
                    "email": "grey@gmail.com",
                    "senha": "123456"
                     })

            expect(resposta.status).to.equal(201);
                       
        })

        it('Deve retornar 400 Email já cadastrado!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/professor/register')
                .set('Content-Type','application/json')
                .send({
                    "nome": "Lara Persuhn",
                    "email": "grey@gmail.com",
                    "senha": "123456"
                     })

            expect(resposta.status).to.equal(400);
                       
        })
  
  
    })
})