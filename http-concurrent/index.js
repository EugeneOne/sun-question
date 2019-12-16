/*
 * 请求并发数量控制函数实现及具体应用 
 * */ 
const LIST = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const AJAX_LIST = [];
const LIMIT = 2;

LIST.forEach(num => {
    AJAX_LIST.push(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('ajax index: ', num);
            resolve(num)
        }, 0)
    }))
});


const limitAsyncHttp = (AJAX_LIST, LIMIT) => {
    const ASYNC_LIST = [];
    while(LIMIT--) {
        ASYNC_LIST.push(AJAX_LIST.shift());
    };
    while(ASYNC_LIST.length) {
        ASYNC_LIST.shift()().then(num => {
            console.log(num);
        })
    }
}

limitAsyncHttp(AJAX_LIST, LIMIT);


// Promise.all(AJAX_LIST);

