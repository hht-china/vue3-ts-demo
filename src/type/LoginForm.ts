/**
 * 表单数据model
 */
export interface ILoginForm{
    username: string
    password: string
}
// 为什么要用接口，在定义属性，ts这样写的含义是什么
export class LoginForm{
    loginForm: ILoginForm = {
        username: '',
        password: ''
    }
}
