const express = require('express');
const router = express.Router();
const { enviarMensagem, listarMensagens } = require('../controllers/chatController');
const { authenticateToken } = require('../services/auth');

// Enviar mensagem
router.post('/mensagens', authenticateToken, enviarMensagem);
// Listar mensagens entre professor e aluno
router.get('/mensagens/:outroId', authenticateToken, listarMensagens);

module.exports = router;
