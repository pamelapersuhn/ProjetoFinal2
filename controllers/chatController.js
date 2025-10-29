const pool = require('../models/db');


// Enviar mensagem
async function enviarMensagem(req, res) {
  const { destinatarioId, texto } = req.body;
  try {
    const data = new Date();
    const [result] = await pool.query(
      'INSERT INTO mensagens (remetenteId, destinatarioId, texto, data) VALUES (?, ?, ?, ?)',
      [req.user.id, destinatarioId, texto, data]
    );
    const mensagem = {
      id: result.insertId,
      remetenteId: req.user.id,
      destinatarioId,
      texto,
      data
    };
    res.status(201).json(mensagem);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar mensagem', error: err.message });
  }
}


// Listar mensagens entre professor e aluno
async function listarMensagens(req, res) {
  const { outroId } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM mensagens WHERE (remetenteId = ? AND destinatarioId = ?) OR (remetenteId = ? AND destinatarioId = ?) ORDER BY data ASC',
      [req.user.id, outroId, outroId, req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar mensagens', error: err.message });
  }
}

module.exports = { enviarMensagem, listarMensagens };
