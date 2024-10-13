import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import cors
import smsRoutes from './routers/sms.router';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();

const corsOptions = {
  origin: ['http://localhost:5173'],
};

app.use(cors(corsOptions));
app.use(express.json({limit:"10mb"}));

app.use('/api/sms', smsRoutes);
app.use(errorHandler);


export default app;
