const API_ADDRESS = "/api/"
export default {
    getGoodList:match(API_ADDRESS+'goods'),
    getGood:match(API_ADDRESS+'good/${id}'),
    createGood:match(API_ADDRESS+'good/add'),
    updateGood:match(API_ADDRESS+'good/update/${id}'),

    login:match(API_ADDRESS+'user/login'),
    logout:match(API_ADDRESS+'user/logout'),

    getCartNum:match(API_ADDRESS+'cart/total'),
    getCarts:match(API_ADDRESS+'carts'),
    createCart:match(API_ADDRESS+'cart/add'),
    updateCart:match(API_ADDRESS+'cart/update/${id}'),
    deleteCarts:match(API_ADDRESS+'cart/delete'),

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