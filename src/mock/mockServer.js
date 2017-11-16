import Mock from 'mockjs'

const SUCCESS_RESPONSE = {
    status: 200,
    message: 'OK'
}

let Random = Mock.Random

Random.extend({
    itemname: function (date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})

const itemList = Mock.mock({
    'items|20-50': [
        {
            'itemId|+1': 0,
            name: '@itemname@integer(1,50)',
            'price|20-200.2-2': 0.00,
            'added|3-1':true
        }
    ]
}).items

function getUrlParam(url, param) {
    var r = new RegExp("\\?(?:.+&)?" + param + "=(.*?)(?:&.*)?$");
    var m = url.toString().match(r);
    return m ? m[1] : ""; //如果需要处理中文，可以用返回decodeURLComponent(m[1])
}

// 分页获取商品
Mock.mock(/\/api\/items[^/]*$/, 'get', (options) => {
    let page = parseInt(getUrlParam(options.url, 'page'))
    let rows = parseInt(getUrlParam(options.url, 'rows'))
    console.log(`pagination from ${(page - 1) * rows} to ${Math.min((page - 1) * rows + rows, itemList.length)}`)
    let goods = itemList.slice((page - 1) * rows, Math.min((page - 1) * rows + rows, itemList.length))
    return {
        status: 200,
        message: 'OK',
        data: goods
    }
})


Mock.mock(/\/api\/item\/add$/, 'post', (options)=>{
    return SUCCESS_RESPONSE
})
Mock.mock(/\/api\/item\/update\/\d+$/, 'post', (options)=>{

})
Mock.mock(/\/api\/item\/total$/, 'get', {
    status:200,
    message:'OK',
    data:itemList.length
})
Mock.mock(/\/api\/item\/\d+$/,'get',(options)=>{
    let itemId = Number(options.url.toString().match(/\d+$/)[0])
    for(let key in itemList){
        if (itemList[key].itemId === itemId){
            return {
                status:200,
                message:'OK',
                data:itemList[key]
            }
        }
    }
    return{
        status:400
    }
})

Mock.mock(/\/api\/user\/login$/, 'post', SUCCESS_RESPONSE)
Mock.mock(/\/api\/user\/logout$/, 'post', SUCCESS_RESPONSE)

Mock.mock(/\/api\/cart\/total$/, 'get', {
        status: 200,
        message: 'OK',
        'data|1-20': 0
    }
)
Mock.mock(/\/api\/carts$/, 'get',  {
        status: 200,
        message: 'OK',
        'data|4-8': [{
            'cartId|+1': 0,
            'itemId|0-255': 0,
            'name': '@Name',
            'num|1-3': 0,
            'price|20-200.2-2': 0.00
        }]
    }
)
Mock.mock(/\/api\/cart\/add$/, 'post', SUCCESS_RESPONSE)
Mock.mock(/\/api\/cart\/update\/\d+$/, 'post', SUCCESS_RESPONSE)
Mock.mock(/\/api\/carts\/delete$/, 'post', SUCCESS_RESPONSE)

Mock.mock(/\/api\/order$/, 'post', SUCCESS_RESPONSE)