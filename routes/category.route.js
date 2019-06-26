import { Router } from 'express';
import { findjob, createjob } from '../controllers/category.controller';
import ctrlHome from '../controllers/user.controller';

const router = Router();

router.get('/nguoi-tim-viec', findjob);

router.get('/viec-tim-nguoi', createjob);

export default router;
