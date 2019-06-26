import express, { static } from 'express';
import userRouter from './routes/user.route';
import categoryRouter from './routes/category.route';
import { urlencoded, json } from 'body-parser';

const goodjob = express();

goodjob.set('view engine', 'ejs');
goodjob.set('views', './views');
goodjob.use('/assets', static('static')); // Get css, img, js, ...
goodjob.use(urlencoded({ extended: false }));
goodjob.use(json())

goodjob.get('/', (req, res) => {
    res.render('index');
});
goodjob.use('/', categoryRouter);
goodjob.use('/user', userRouter);

goodjob.listen(process.env.PORT || 2019, () => {
    console.log('Your NODE.JS Server is running !!');
});
