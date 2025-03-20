import { Router } from 'express';
import { auth } from '../middlewares/authenticator';
import { user } from '../controllers/delete';

const router = Router();

router.delete('/user/:username', auth, user);

export default router;
