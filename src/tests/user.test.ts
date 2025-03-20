import request from 'supertest';
import app from '../../api/index';
import { describe, it, expect } from '@jest/globals';

describe('Create a user, login, return and delete.', () => {
	let testAuthToken: string;

	it('Should create a test user', async () => {
		const newUser = {
			name: 'Test User',
			username: 'testuser',
			password: 'testuserpassword',
			email: 'example@example.com'
		};

		const res = await request(app).post('/post/register').send(newUser);

		expect(res.status).toBe(201);
		expect(res.text).toEqual('Success');
	});

	it('Should login to test user account', async () => {
		const user = {
			user: 'example@example.com',
			password: 'testuserpassword'
		};

		const res = await request(app).post('/post/login').send(user);

		expect(res.status).toBe(200);
		expect(typeof res.text).toBe('string');
		testAuthToken = res.text;
	});

	it('Should return a list of users', async () => {
		const res = await request(app).get('/users');

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBeGreaterThan(0);
		expect(res.body[0]).toHaveProperty('email');
		expect(res.body[0]).toHaveProperty('password');
	});

	it('Should change the password of the test user', async () => {
		const data = {
			oldPassword: 'testuserpassword',
			newPassword: 'testuserpasswordnew'
		};

		const res = await request(app)
			.put('/put/password')
			.set('x-auth-token', testAuthToken)
			.send(data);

		expect(res.status).toBe(200);
		expect(res.text).toEqual('Password updated successfully');
	});

	it('Should delete the user created in test', async () => {
		const res = await request(app)
			.delete('/delete/user/testuser')
			.set('x-auth-token', testAuthToken);

		expect(res.status).toBe(204);
	});
});
