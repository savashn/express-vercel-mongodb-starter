import { Router } from 'express';
import { helloWorld, posts, users } from '../controllers/get';

const router = Router();

router.get('/', helloWorld);
router.get('/users', users);
router.get('/posts', posts);

export default router;
