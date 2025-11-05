const request = require('supertest');
const postLogin = require('../fixtures/postLoginProfessor.json')

const obtertokenProfessor = async (email, senha, role) => {
    const bodyLogin = { ...postLogin }

    const respostaLogin = await request(process.env.BASE_URL)
        .post('/api/login')
        .set('Content-Type','application/json')
        .send(bodyLogin)

return respostaLogin.body.token
}

module.exports = {
    obtertokenProfessor
}