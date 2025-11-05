const request = require('supertest');
const postLogin = require('../fixtures/postLoginAluno.json')

const obtertokenAluno = async (email, senha, role) => {
    const bodyLogin = { ...postLogin }

    const respostaLogin = await request(process.env.BASE_URL)
        .post('/api/login')
        .set('Content-Type','application/json')
        .send(bodyLogin)

return respostaLogin.body.token
}

module.exports = {
    obtertokenAluno
}