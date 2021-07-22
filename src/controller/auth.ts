import { RegisterModel } from "../db/models/user";
import { createUser, getUserInfo } from "../services/auth";
import errInfo from "../constants/errInfo";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import { createMD5 } from "../utils/createMD5";
import { createToken } from "../utils/token";

const {
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = errInfo

// 注册controller
export const registerController = async (params: RegisterModel) => {
  const { username, password } = params;
  const userInfo = await getUserInfo({ username })
  if (userInfo) {
    // 用户已存在
    const { code, message } = registerUserNameExistInfo
    return new ErrorResponse(code, message)
  }

  try {
    await createUser({
      ...params,
      password: createMD5(password)
    })
    return new SuccessResponse({})
  } catch (err) {
    // 注册失败
    console.log(err.message, err.stack)
    const { code, message } = registerFailInfo
    return new ErrorResponse(code, message)
  }
}

// 登录controller
interface LoginModel {
  username: string;
  password: string;
}

export const loginController = async (params: LoginModel) => {
  const { username, password } = params;
  // 根据用户名和密码，获取用户信息
  const userInfo = await getUserInfo({ username, password });
  if (userInfo) {
    const { id, username } = userInfo;
    const token = createToken({
      id,
      username
    })
    return new SuccessResponse({ token })
  }
  // 未获取到用户信息，登录失败
  const { code, message } = loginFailInfo
  return new ErrorResponse(code, message);
}