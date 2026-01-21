import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 30 },
    { duration: '20s', target: 30 },
    { duration: '20s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(90)<3000','max<5000'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {

    const randomId = Math.floor(Math.random() * 1000000);
    const nome = `Aluno_${randomId}`;
    const email = `aluno_${randomId}@teste.com`;
    const senha = `senha_${randomId}`;

    const url = 'http://localhost:3000/api/aluno/register'

    const payload = JSON.stringify({
     nome: nome,
    email: email,
    senha: senha,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
    
  const res = http.post(url, payload, params)

  check(res, {
    'Validar que o status é 201': (r) => r.status === 201
  })

  sleep(1)

}