export default class Http {

    static HOST = 'https://news-at.zhihu.com/api/4/';

    static get(url, body){
        return this.request(url, 'get', body)
    }

    static post(url, body){
        return this.request(url, 'post', body)
    }

    static request(url, method, body){
        let isOk;
        return new Promise((resolve, reject) => {
            fetch(this.HOST + url, {
                method,
                // headers:{"Content-Type": "application/x-www-form-urlencoded"},
                body
            })
                .then((response) => {
                    isOk = !!response.ok;
                    response._bodyText = response._bodyText.replace(/http:\\\/\\\//g, 'https://');
                    return response.json();
                })
                .then((responseData) => {
                    if (isOk) {
                        resolve(responseData);
                    } else {
                        reject(responseData);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}