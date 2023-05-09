import axios from 'axios'

// const baseUrl = "https://www.fastmock.site/mock/1c44e46272784eafc7ea2694e9727455/api"
//const baseUrl ="http://localhost:8081/api"
const mockType = 'cbzMock'  // fastMock
const baseUrl = mockType === 'cbzMock' ? 'https://mock.presstime.cn/mock/63569fbbbee0a00099ca48a1/api/vue-ts-mall-demo' : 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api'
// 初始化axios实例和配置信息，就像java操作http接口差不多
const service = axios.create({
    baseURL: baseUrl,
    timeout: 2000,
    headers: {
        "Content-type" : "application/json;charset=utf-8"
    }
})

//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if(localStorage.getItem("token")){
        config.headers.token = localStorage.getItem("token") || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use(({ data }) => {
    const code : number = data.data.code
    if(code != 200){
        return Promise.reject(data)
    }
    return data
},(err) => {
    console.log(err)
})

export default service
