import { Router } from 'express';
import { signIn, signUp, signInValid } from '../controllers/user.controller';

const router = Router();

router.get('/sign-in', signIn);

router.get('/sign-up', signUp);

router.post('/success', signInValid);

export default router;
