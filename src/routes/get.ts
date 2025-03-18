import { Router, Request, Response } from 'express';
import User from '../db/user';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello World');
	return;
});

router.get('/users', async (req: Request, res: Response) => {
	const users = await User.find();
	res.status(200).json(users);
	return;
});

export default router;
