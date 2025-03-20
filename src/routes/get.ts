import { Router, Request, Response } from 'express';
import User from '../db/user';
import Post from '../db/post';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello World');
});

router.get('/users', async (req: Request, res: Response) => {
	const users = await User.find();
	res.status(200).json(users);
});

router.get('/posts', async (req: Request, res: Response) => {
	const posts = await Post.find().populate('user', 'name _id');
	res.status(200).send(posts);
});

export default router;
