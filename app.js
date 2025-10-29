const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./resources/swagger.json');

app.use(express.json());

// Swagger UI endpoint

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importando rotas
const authRoutes = require('./routes/auth');
const aulaRoutes = require('./routes/aula');
const chatRoutes = require('./routes/chat');

app.use('/api', authRoutes);
app.use('/api', aulaRoutes);
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
