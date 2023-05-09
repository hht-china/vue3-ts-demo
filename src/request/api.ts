import service from "@/request/index";
import {ILoginForm} from "@/type/LoginForm";

// 登录接口
export function login(data: ILoginForm) {
    return service({
        ///loginfalse 可以测试失败
        url: "/login",
        method: "POST",
        data
    })
}
// 商品列表接口
export function getGoodsList(){
    return service({
        url: "/getGoodsList",
        method: "GET"
    })
}
