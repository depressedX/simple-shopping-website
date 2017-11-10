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
        'items|5-10': [
            {
                'id|+1': 0,
                name: '@Name',
                'price|20-200.2-2': 0.00
            }
        ]
    }
})
Mock.mock(/\/api\/goods\/\d+$/, 'get', {
    status: 200,
    message: 'OK',
    data: {
        'id|+1': 0,
        name: '@Name',
        'price|20-200.2-2': 0.00
    }
})
Mock.mock(/\/api\/goods$/,'post',SUCCESS_RESPONSE)
Mock.mock(/\/api\/goods\/\d+$/, 'post', SUCCESS_RESPONSE)

Mock.mock(/\/api\/user\/login$/,'post',SUCCESS_RESPONSE)
Mock.mock(/\/api\/user\/logout$/,'post',SUCCESS_RESPONSE)

Mock.mock(/\/api\/cart$/,'get',{
    status:200,
    message:'OK',
    'data|2-5':[{
        'id|+1':0,
        'foodsId|0-255':0,
        'name':'@Name',
        'num|1-3':0,
        'price|20-200.2-2':0.00
    }]
})
Mock.mock(/\/api\/cart$/,'post',SUCCESS_RESPONSE)
Mock.mock(/\/api\/cart\/\d+$/,'post',SUCCESS_RESPONSE)
Mock.mock(/\/api\/cart\/delete$/,'post',SUCCESS_RESPONSE)

Mock.mock(/\/api\/order$/,'post',SUCCESS_RESPONSE)