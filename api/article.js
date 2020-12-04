import request from "../utils/request";

//获取公共文章列表
export const getArticles = data => {
    return request({
        method: 'POST',
        url: '/api/articles',
        data
    })
};
