import { Router } from 'express';
import validator from '../middlewares/validator';
import { auth } from '../middlewares/authenticator';
import { passwordSchema } from '../schemas/put';
import { password } from '../controllers/put';

const router = Router();

router.put('/password', auth, validator(passwordSchema), password);

export default router;
