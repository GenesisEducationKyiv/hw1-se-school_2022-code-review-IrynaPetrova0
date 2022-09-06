const request = require('supertest');
const app = require('../../app');
const axios =  require('axios');
const MockAdapter =  require('axios-mock-adapter');
const MockFS = require('mock-fs');
const SubscribeService = require('../services/subscribe.service');
const NodeJSPath = require('path');

const PathAndFileName = NodeJSPath.format( { dir: './src/db', base: 'emails.txt' });

describe('Rout testing', () => {

	beforeEach( () => {
		MockFS({
			'src': {
				'db': {
					'emails.txt': 'test@gmail.com' + '\n'
				}
			}
		});
	});

	afterEach( () => {
		MockFS.restore();
	});

	afterAll(async () => {
		app.close();
	});

	test('should get rate', async () => {
		let mock = new MockAdapter(axios);
		mock
			.onGet('https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH')
			.reply(200, {
				symbol:'BTCUAH',
				price:'777645.00000000'});

		const response = await request(app).get('/api/rate');

		expect(response.status).toBe(200);
		expect(response.text).toBe('777645');
	});

	test('should create new subscription', async () => {
		let data = await SubscribeService.readFile(PathAndFileName);
		expect(data).not.toContain('new@gmail.com');

		const resp = await request(app)
			.post('/api/subscribe/')
			.field('email', 'new@gmail.com');

		expect(resp.status).toBe(200);

		data = await SubscribeService.readFile(PathAndFileName);
		expect(data).toContain('new@gmail.com');
	});
});
