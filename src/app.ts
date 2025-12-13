import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Task Management API is running' });
});

export default app;
