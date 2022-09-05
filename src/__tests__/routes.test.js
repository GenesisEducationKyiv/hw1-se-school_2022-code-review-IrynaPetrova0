const request = require('supertest');
const app = require('../../app');
const axios =  require('axios');
const MockAdapter =  require('axios-mock-adapter');
const MockFS = require('mock-fs');

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

	// test('should create new subscription', async () => {
	// 	const data = {
	// 		email:'new@gmail.com'
	// 	};
	//
	// 	const resp = await request(app)
	// 		.post('/api/subscribe')
	// 		.send(data);
	//
	// 	expect(resp.status).toBe(200);
	// });


});
