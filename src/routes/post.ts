import { Router, Request, Response } from 'express';
import User from '../db/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from '../middlewares/validator';
import { login, register } from '../schemas/post';

const router = Router();

router.post('/register', validator(register), async (req: Request, res: Response) => {
	const user = await User.findOne({
		$or: [{ username: req.body.username }, { email: req.body.email }]
	});

	if (user) {
		res.status(400).send('This user is already exists.');
		return;
	}

	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	const newUser = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword
	});

	await newUser.save();
	res.status(201).send('Success');
	return;
});

router.post('/login', validator(login), async (req: Request, res: Response) => {
	const user = await User.findOne({
		$or: [
			{ username: req.body.user },
			{ email: req.body.user }
		]
	});

	if (!user) {
		res.status(404).send('There is no such a user.');
		return;
	}

	const isSuccess = await bcrypt.compare(req.body.password, user.password);

	if (!isSuccess) {
		res.status(400).send('Invalid email or password.');
		return;
	}

	const token: string = jwt.sign({ id: user.id, name: user.username }, process.env.JWT_SECRET as string, {
		expiresIn: '1d'
	});

	res.status(200).send({ token });
	return;
});

export default router;
