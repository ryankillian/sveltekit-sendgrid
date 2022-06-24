import client, { type ClientResponse, type MailDataRequired } from '@sendgrid/mail';
import type { RequestHandler } from '@sveltejs/kit';
import dotenv from 'dotenv';
dotenv.config();

const SENDER_EMAIL = process.env['SENDER_EMAIL'];
const SENDER_NAME = process.env['SENDER_NAME'];

const API_KEY = process.env['API_KEY'];

client.setApiKey(API_KEY as string);

export const post: RequestHandler = async ({ request }) => {
	const { to } = await request.json();
	return {
		body: {
			success: await sendEmail(to)
		}
	};
};

export async function sendEmail(to: string) {
	const message = {
		to,
		from: {
			email: SENDER_EMAIL,
			name: SENDER_NAME
		},
		subject: 'message from Sendgrid',
		text: 'Test message from Sendgrid',
		html: '<h1>HTML Message from Sendgrid</h1>'
	};

	try {
		const response: [ClientResponse, {}] = await client.send(message as MailDataRequired);
		return response[0]?.statusCode === 202;
	} catch (error) {
		console.log(error);
		return false;
	}
}
