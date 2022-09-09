const SubscribeService = require('../services/subscribe.service');
const MockFS = require('mock-fs');
const NodeJSPath = require('path');

const PathAndFileName = NodeJSPath.format( { dir: './src/db', base: 'emails.txt' });
describe('tests for subscribe service part', () => {
	afterEach( () => {
		MockFS.restore();
	});
	beforeEach( () => {
		MockFS({
			'src': {
				'db': {
					'emails.txt': 'test@gmail.com' + '\n'
				}
			}
		});
	});

	test('data should be read from file', async () => {
		const data = await SubscribeService.readFile(PathAndFileName);
		expect(data).toContain('test@gmail.com');
	});

	test('subscription was successfully created', async () => {
		let data = await SubscribeService.readFile(PathAndFileName);
		expect(data).toContain('test@gmail.com');

		await SubscribeService.subscribe('new@gmail.com');
		data = await SubscribeService.readFile(PathAndFileName);
		expect(data).toContain('new@gmail.com');
	});

	test('should be thrown error that subscription already exists', async () => {
		let data = await SubscribeService.readFile(PathAndFileName);
		console.log(data);
		expect(data).toContain('test@gmail.com');

		try {
			await SubscribeService.subscribe('test@gmail.com');
		} catch (e) {
			expect(e.message).toBe('409 The subscription is already active for this email address.');
		}
	});

	test('should be thrown error that email has wrong format', async () => {
		try {
			await SubscribeService.subscribe('wrongFormat');
		} catch (e) {
			expect(e.message).toBe('400 Email is empty or was used invalid format.');
		}
	});
});

