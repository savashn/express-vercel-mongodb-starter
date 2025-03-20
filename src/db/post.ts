import { Schema, model, Types } from 'mongoose';

interface IPost {
	post: string;
	user: Types.ObjectId;
}

const postSchema = new Schema<IPost>(
	{
		post: { type: String, required: true },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

const Post = model<IPost>('Post', postSchema);

export default Post;
