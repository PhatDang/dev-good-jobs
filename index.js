import express from 'express';
import userRouter from './routes/user.route';
import categoryRouter from './routes/category.route';
import bodyParser from 'body-parser';

const goodjob = express();
const PORT = 2019;

goodjob.use('/assets', express.static('static'));
goodjob.set('view engine', 'ejs');
goodjob.set('views', './views');

goodjob.use(bodyParser.urlencoded({ extended: false }));
goodjob.use(bodyParser.json())

goodjob.get('/', (req, res) => {
    res.render('index');
});

goodjob.use('/', categoryRouter);
goodjob.use('/user', userRouter);

goodjob.listen(PORT, () => {
    console.log(`Your NODE.JS Server is running on port ${PORT}` || 2019);
});
