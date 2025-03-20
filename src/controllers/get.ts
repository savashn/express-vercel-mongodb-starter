import { Request, Response } from 'express';
import User from '../db/user';
import Post from '../db/post';

export const helloWorld = (req: Request, res: Response): void => {
	res.status(200).send('Hello World');
};

export const users = async (req: Request, res: Response): Promise<void> => {
	const users = await User.find();
	res.status(200).json(users);
};

export const posts = async (req: Request, res: Response): Promise<void> => {
	const posts = await Post.find().populate('user', 'name _id');
	res.status(200).send(posts);
};
