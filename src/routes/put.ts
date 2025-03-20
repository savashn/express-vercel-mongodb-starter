import { Router, Request, Response } from 'express';
import User from '../db/user';
import bcrypt from 'bcrypt';
import validator from '../middlewares/validator';
import { auth } from '../middlewares/authenticator';
import { password } from '../schemas/put';

const router = Router();

router.put(
	'/password',
	auth,
	validator(password),
	async (req: Request, res: Response) => {
		if (!req.user) {
			res.status(405).send('Not allowed');
			return;
		}

		const userId = req.user.id;

		const user = await User.findById(userId);

		if (!user) {
			res.status(404).send('User not found');
			return;
		}

		const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);

		if (!isMatch) {
			res.status(400).send('Incorrect old password');
			return;
		}

		const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

		user.password = hashedPassword;

		await user.save();

		res.status(200).send('Password updated successfully');
	}
);

export default router;
