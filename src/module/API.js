const API_ADDRESS = "/api/"
export default {
    getGoodsList:match(API_ADDRESS+'goods'),
    getGoods:match(API_ADDRESS+'goods/${id}'),
    createGoods:match(API_ADDRESS+'goods'),
    updateGoods:match(API_ADDRESS+'goods/${id}'),

    login:match(API_ADDRESS+'user/login'),
    logout:match(API_ADDRESS+'user/logout'),

    getCartItems:match(API_ADDRESS+'cart'),
    createCartItem:match(API_ADDRESS+'cart'),
    updateCartItem:match(API_ADDRESS+'cart/${id}'),
    deleteCartItems:match(API_ADDRESS+'cart/delete'),

    createOrder:match(API_ADDRESS+'order')
}








// curry参数模板替换
function match(s) {
    var reg = /\${[^}]+}/;

    function __match() {
        var args = [].slice.call(arguments);
        var __s = s;
        for (var arg in args) {
            __s = __s.replace(reg, args[arg]);
        }
        function _match() {
            var _s = __s;
            for (var arg in arguments) {
                _s = _s.replace(reg, arguments[arg]);
            }
            if (reg.test(_s)) {
                return __match.apply(null, args.concat([].slice.call(arguments)));
            } else {
                return _s;
            }
        }

        _match.valueOf = _match.toString = function () {
            return __s;
        }
        return _match;
    }

    return __match.apply(null, Array.prototype.slice.call(arguments, 1));
}