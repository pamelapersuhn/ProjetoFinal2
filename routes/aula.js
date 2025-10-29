const express = require('express');
const router = express.Router();
const { criarAula, adicionarAtividade, consultarAulasAluno } = require('../controllers/aulaController');
const { authenticateToken, authorizeRole } = require('../services/auth');

// Professor cria aula
router.post('/aulas', authenticateToken, authorizeRole('professor'), criarAula);
// Professor adiciona atividade
router.post('/aulas/:aulaId/atividades', authenticateToken, authorizeRole('professor'), adicionarAtividade);
// Aluno consulta suas aulas
router.get('/aulas', authenticateToken, authorizeRole('aluno'), consultarAulasAluno);

module.exports = router;
