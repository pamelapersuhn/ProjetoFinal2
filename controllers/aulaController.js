const pool = require('../models/db');


// Professor cria aula
async function criarAula(req, res) {
  const { titulo, descricao, alunoId } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO aulas (titulo, descricao, alunoId, professorId) VALUES (?, ?, ?, ?)',
      [titulo, descricao, alunoId, req.user.id]
    );
    const aula = {
      id: result.insertId,
      titulo,
      descricao,
      alunoId,
      professorId: req.user.id,
      atividades: []
    };
    res.status(201).json(aula);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar aula', error: err.message });
  }
}


// Professor adiciona atividade
async function adicionarAtividade(req, res) {
  const { aulaId } = req.params;
  const { descricao } = req.body;
  try {
    // Verifica se aula existe e pertence ao professor
    const [aulasRows] = await pool.query('SELECT * FROM aulas WHERE id = ?', [aulaId]);
    const aula = aulasRows[0];
    if (!aula) return res.status(404).json({ message: 'Aula não encontrada' });
    if (aula.professorId !== req.user.id) return res.status(403).json({ message: 'Acesso negado' });
    const [result] = await pool.query('INSERT INTO atividades (descricao, aulaId) VALUES (?, ?)', [descricao, aulaId]);
    const atividade = { id: result.insertId, descricao, aulaId: Number(aulaId) };
    res.status(201).json(atividade);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar atividade', error: err.message });
  }
}


// Aluno consulta suas aulas
async function consultarAulasAluno(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM aulas WHERE alunoId = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao consultar aulas', error: err.message });
  }
}

module.exports = { criarAula, adicionarAtividade, consultarAulasAluno };
