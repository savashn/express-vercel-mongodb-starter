import { Request, Response } from 'express';
import User from '../db/user';

export const user = async (req: Request, res: Response): Promise<void> => {
	const user = await User.findOneAndDelete({ username: req.params.username });

	if (!user) {
		res.status(500).send('An error occured while deleting the user');
		return;
	}

	res.status(204).send();
};
