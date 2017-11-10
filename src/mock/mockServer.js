import Mock from 'mockjs'

const SUCCESS_RESPONSE = {
    status: 200,
    message: 'OK'
}
const API_ADDRESS = '/api/'

Mock.mock(/\/api\/goods[^/]*$/, 'get', {
    status: 200,
    message: 'OK',
    data: {
        'total|20-50': 0,
        'goods|5-10': [
            {
                'goodId|+1': 0,
                name: '@Name',
                'price|20-200.2-2': 0.00
            }
        ]
    }
})
Mock.mock(/\/api\/good\/\d+$/, 'get', {
    status: 200,
    message: 'OK',
    data: {
        'goodId|+1': 0,
        name: '@Name',
        'price|20-200.2-2': 0.00
    }
})
Mock.mock(/\/api\/good\/add$/,'post',SUCCESS_RESPONSE)
Mock.mock(/\/api\/good\/update\/\d+$/, 'post', SUCCESS_RESPONSE)

Mock.mock(/\/api\/user\/login$/,'post',SUCCESS_RESPONSE)
Mock.mock(/\/api\/user\/logout$/,'post',SUCCESS_RESPONSE)

Mock.mock(/\/api\/cart\/total$/,'get',{
    status:200,
    message:'OK',
    'data|1-20':0
})
Mock.mock(/\/api\/carts$/,'get',{
    status:200,
    message:'OK',
    'data|2-5':[{
        'cartId|+1':0,
        'foodId|0-255':0,
        'name':'@Name',
        'num|1-3':0,
        'price|20-200.2-2':0.00
    }]
})
Mock.mock(/\/api\/cart\/add$/,'post',SUCCESS_RESPONSE)
Mock.mock(/\/api\/cart\/update\/\d+$/,'post',SUCCESS_RESPONSE)
Mock.mock(/\/api\/carts\/delete$/,'post',SUCCESS_RESPONSE)

Mock.mock(/\/api\/order$/,'post',SUCCESS_RESPONSE)