const request = require('supertest');
const{ expect } = require('chai')
const mysql = require('mysql2/promise')
require('dotenv').config()

describe('Registrar Aluno', () => {

  let connection

  before(async () => {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1708',
      database: 'somatico'
  });

  await connection.execute("DELETE FROM alunos WHERE email = 'saulo-silva@gmail.com'");
});

    //Fecha conexão com BD
    after(async () => {
      await connection.end()
  })

    describe('POST /aluno/register', () => {
        it('Deve retornar 201 Aluno registrado com sucesso!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/aluno/register')
                .set('Content-Type','application/json')
                .send({
                    "nome": "Saulo Silva",
                    "email": "saulo-silva@gmail.com",
                    "senha": "123456"
                     })

            expect(resposta.status).to.equal(201);
                       
        })

        it('Deve retornar 400 Email já cadastrado!', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/aluno/register')
                .set('Content-Type','application/json')
                .send({
                    "nome": "Jose Maria",
                    "email": "jose@gmail.com",
                    "senha": "123456"
                     })

            expect(resposta.status).to.equal(400);
                       
        })  
  
    })
})