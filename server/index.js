import express from 'express';
import logger from 'morgan';
const port = process.env.PORT ?? 3000;

const app = express();

//usarlo en modo de desarrollo
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('?<h1>This is the chat</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
