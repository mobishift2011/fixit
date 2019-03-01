const { describe, before, it } = exports.lab = require('lab').script();
const { expect } = require('code');
const app = require('../app');
const models = require('../models')
const userService = require('../services/user');

const v1 = '/api/v1';
let headers = {};

const request = async (method, api, data) => {
    const req = {
        method: method,
        url: `${v1}${api}`,
        headers: headers
    };
    if (data) {
        if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
            req.payload = data
        }
    }
    return await app.inject(req);
}


describe('User', () => {
    before(async () => {
        const count = await userService.findOrCreate(
            'testuser',
            '123456',
            {
                name: 'tuser',
                mobile: '11111111111',
                role: 1
            });
    });

    it('signIn', async () => {
        const pwd = '12345678';
        const req = {
            method: 'POST',
            url: `${v1}/user/login`,
            payload: {
                'username': 'testuser',
                'password': pwd
            }
        };
        const res = await app.inject(req);
        expect(res.statusCode).to.equal(400);
        req.payload.password = '123456';
        const resOk = await app.inject(req);
        expect(resOk.statusCode).to.equal(200);
        const token = resOk.result;
        expect(token).to.be.not.empty();
        headers['authorization'] = token;
    });
});


describe('ProductMeta', () => {
    before(async () => {
        await models.brand.findOrCreate({ where: { name: 'testbrand' }, default: {} });
    });

    it('brandList', async () => {
        const res = await request('GET', '/brand');
        expect(res.statusCode).to.equal(200);
    });

    it('categoryList', async () => {
        const res = await request('GET', '/category');
        expect(res.statusCode).to.equal(200);
    });

    it('modelList', async () => {
        const res = await request('GET', '/product/model')
        expect(res.statusCode).to.equal(200);
    });

    it('snList', async () => {
        const res = await request('GET', '/product/sn')
        expect(res.statusCode).to.equal(200);
    });
});


describe('Product', () => {
    it('productList', async () => {
        const res = await request('GET', '/product')
        expect(res.statusCode).to.equal(200);
        console.log(`Total products: ${res.result.length}`);
    });
});


describe('Orders', () => {
    it('orderSubmit', async () => {
        const res = await request('POST', '/order', {
            product: 1,
            category: 'maintenance',
            appointed_at: "2019-02-27 00:00"
        });
        expect(res.statusCode).to.equal(200);
    });

    it('orderList', async () => {
        const res = await request('GET', '/order');
        expect(res.statusCode).to.equal(200);
        console.log(`Total orders: ${res.result.length}`);
    });

    it('orderDetail', async () => {
        const res = await request('GET', '/order/1');
        expect(res.statusCode).to.equal(200);
    });
});