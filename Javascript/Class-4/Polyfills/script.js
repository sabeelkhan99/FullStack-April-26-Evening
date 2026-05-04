

const nums = [1, 2, 3, 4, [5, 6], 7, 8, 9];

Array.prototype.myFlat = function () {
    const nums = this;
    const res = [];
    for (let el of nums) {
        if (Array.isArray(el)) {
            res.push(...el);
        }
        else {
            res.push(el);
        }
    }
    return res;
}

// console.log(myFlat(nums));


// Actual way of creating polyfill in production

if (!Array.prototype.flat) {
    Array.prototype.flat = function () {
        const nums = this;
        const res = [];
        for (let el of nums) {
            if (Array.isArray(el)) {
                res.push(...el);
            }
            else {
                res.push(el);
            }
        }
        return res;
    }
}
