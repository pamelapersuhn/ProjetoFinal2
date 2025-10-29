-- Tabela de Professores
CREATE TABLE professores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de Alunos
CREATE TABLE alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de Aulas
CREATE TABLE aulas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  alunoId INT NOT NULL,
  professorId INT NOT NULL,
  FOREIGN KEY (alunoId) REFERENCES alunos(id),
  FOREIGN KEY (professorId) REFERENCES professores(id)
);

-- Tabela de Atividades
CREATE TABLE atividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao TEXT NOT NULL,
  aulaId INT NOT NULL,
  FOREIGN KEY (aulaId) REFERENCES aulas(id)
);

-- Tabela de Mensagens
CREATE TABLE mensagens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  remetenteId INT NOT NULL,
  destinatarioId INT NOT NULL,
  texto TEXT NOT NULL,
  data DATETIME NOT NULL,
  FOREIGN KEY (remetenteId) REFERENCES alunos(id),
  FOREIGN KEY (destinatarioId) REFERENCES professores(id)
);
