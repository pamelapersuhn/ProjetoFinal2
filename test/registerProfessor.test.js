const request = require('supertest');
const{ expect } = require('chai')
const mysql = require('mysql2/promise')
require('dotenv').config()

describe('Registrar Professor', () => {

  let connection

  before(async () => {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1708',
      database: 'somatico'
  });

  await connection.execute("DELETE FROM professores WHERE email = 'grey@gmail.com'")
  })

    //Fecha conexão com BD
    after(async () => {
      await connection.end()
  })

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
                    "email": "gil@teste.com",
                    "senha": "123456"
                     })

            expect(resposta.status).to.equal(400);
                       
        })  
  
    })
})