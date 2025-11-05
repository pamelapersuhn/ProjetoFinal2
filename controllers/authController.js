const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../services/auth');
const pool = require('../models/db');


// Registro de professor
async function registerProfessor(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const [rows] = await pool.query('SELECT id FROM professores WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const hash = bcrypt.hashSync(senha, 8);
    const [result] = await pool.query('INSERT INTO professores (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash]);
    res.status(201).json({ id: result.insertId, nome, email });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar professor', error: err.message });
  }
}


// Registro de aluno
async function registerAluno(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const [rows] = await pool.query('SELECT id FROM alunos WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const hash = bcrypt.hashSync(senha, 8);
    const [result] = await pool.query('INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash]);
    res.status(201).json({ id: result.insertId, nome, email });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar aluno', error: err.message });
  }
}


// Login
async function login(req, res) {
  const { email, senha, role } = req.body;
  let user;
  try {
    if (role === 'professor') {
      const [rows] = await pool.query('SELECT * FROM professores WHERE email = ?', [email]);
      user = rows[0];
    } else if (role === 'aluno') {
      const [rows] = await pool.query('SELECT * FROM alunos WHERE email = ?', [email]);
      user = rows[0];
    } else {
      return res.status(400).json({ message: 'Role inválido' });
    }
    if (!user || !bcrypt.compareSync(senha, user.senha)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  const token = jwt.sign({ id: user.id, role }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
  }
}

module.exports = { registerProfessor, registerAluno, login };
