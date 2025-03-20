import { Router, Request, Response } from 'express';
import User from '../db/user';
import { auth } from '../middlewares/authenticator';

const router = Router();

router.delete('/user/:username', auth, async (req: Request, res: Response) => {
	const user = await User.findOneAndDelete({ username: req.params.username });

	if (!user) {
		res.status(500).send('An error occured while deleting the user');
		return;
	}

	res.status(204).send();
});

export default router;
