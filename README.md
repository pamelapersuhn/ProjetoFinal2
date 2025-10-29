# SOMATICO - API de Controle de Atividades Online para Música

## Descrição
API REST para registro de professores, alunos, aulas, atividades e chat, com autenticação JWT. Focada em cursos de música (instrumentos ou voz) que requerem prática via repetição.

## Funcionalidades
- Registro de professor especialista
- Registro de aluno
- Aulas guiadas pelo professor, com atividades e descrição de conteúdos
- Chat para troca de mensagens entre professor e aluno
- Autenticação JWT para professor e aluno
- Documentação Swagger disponível em `/api-docs`

## Estrutura
- **Camadas:** routes, controllers, service, model
- **Banco de dados:** em memória (JS arrays)
- **Tecnologias:** Express, JWT, Swagger

## Instalação
```bash
npm install
```

## Execução
```bash
node app.js
```

## Endpoints principais
- `POST /api/professor/register` - Cadastro de professor
- `POST /api/aluno/register` - Cadastro de aluno
- `POST /api/login` - Login (professor/aluno)
- `POST /api/aulas` - Professor cria aula
- `POST /api/aulas/:aulaId/atividades` - Professor adiciona atividade
- `GET /api/aulas` - Aluno consulta suas aulas
- `POST /api/mensagens` - Enviar mensagem
- `GET /api/mensagens/:outroId` - Listar mensagens
- `GET /api-docs` - Documentação Swagger

## Autenticação
- JWT obrigatório para todos endpoints protegidos
- Professor tem acesso total; aluno não pode editar informações do professor

## Documentação
Acesse `/api-docs` para visualizar e testar os endpoints via Swagger.

## Observações
- Dados são armazenados em memória para fins de demonstração
- Para produção, recomenda-se uso de banco de dados MySQL
