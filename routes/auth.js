const express = require('express');
const router = express.Router();
const { registerProfessor, registerAluno, login } = require('../controllers/authController');

router.post('/professor/register', registerProfessor);
router.post('/aluno/register', registerAluno);
router.post('/login', login);

module.exports = router;
