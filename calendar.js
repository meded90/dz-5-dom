
var slice = Array.prototype.slice;
function partial(fn) {
    'use strict';
    var args = slice.call(arguments, 1);
    return function () {
        return fn.apply(this, args.concat(slice.call(arguments)));
    };
}
function isMore(a, b) {
    'use strict';
    return a > b;
}
function isLess(a, b) {
    'use strict';
    return a < b;
}
function isEqual(a, b) {
    'use strict';
    return a === b;
}
function getRandomInt(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var nowDate = new Date();
var isMoreNow = partial(isMore, nowDate);
var isLessNow = partial(isLess, nowDate);

function searchAnArray(array, str) {
    'use strict';
    var Equal = partial(isEqual, str);
    return array.reduce(
        function (sum, x) {
            return sum + new Equal(x);

        },
        0
    );
}
