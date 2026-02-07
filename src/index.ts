import _ from 'lodash';
import express from 'express';
import dotenv from 'dotenv';
import packageRouter from './routes/package';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', packageRouter);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
