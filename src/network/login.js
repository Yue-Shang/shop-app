import {request} from './request'
import ajax from "cube-ui/src/components/upload/ajax";
// 登录页接口
// 1.用户名密码登录
export const reqPwdLogin = ({name,pwd,captcha}) => ajax('/login_pwd',{name, pwd, captcha},'POST')
// 2.发送短信验证码
export const reqSendCode = (phone) => ajax('/sendcode',{phone})
// 3.手机号验证码登录
export const reqSmsLogin = (phone,code) => ajax('/login_sms',{phone, code},'POST')

// 4.根据绘画获取用户信息
export const reqUserInfo = () => ajax('/userinfo')
//5.用户登出
export const reqLogout = () => ajax('/logout')
