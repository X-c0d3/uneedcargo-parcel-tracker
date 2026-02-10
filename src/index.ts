import _ from 'lodash';
import express from 'express';
import packageRouter from './routes/package';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api', packageRouter);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
