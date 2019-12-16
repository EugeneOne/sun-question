/*
 * 请求并发数量控制函数实现及具体应用 
 * */ 
const LIST = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const AJAX_LIST = [];
const LIMIT = 2;
LIST.forEach(num => {
    AJAX_LIST.push(() => new Promise((resolve, reject) => {
        console.log('发送请求, 序号: ', num);
        setTimeout(() => {
            console.log('response: ', num);
            resolve(num)
        }, Math.random() * 1000)
    }))
});


const limitAsyncHttp = (AJAX_LIST, LIMIT) => {
    let ASYNC_LIST = [].concat(AJAX_LIST);
    let limit = LIMIT;
    const handler = () => {
        if(ASYNC_LIST.length) {
            ASYNC_LIST.shift()().then(num => {
                handler();
            })
        } else {
            return;
        }

    }
    while(limit--) {
        handler();
    }
}

limitAsyncHttp(AJAX_LIST, LIMIT);

