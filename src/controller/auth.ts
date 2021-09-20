import { RegisterModel } from "../db/models/user";
import { createUser, getUserInfo, getUserInfoAndRoles } from "../services/auth";
import errInfo from "../constants/errInfo";
import { createErrorResponse, ErrorResponse, SuccessResponse } from "../utils/Response";
import { createMD5 } from "../utils/createMD5";
import { createToken, getInfoByToken } from "../utils/token";
import { UserTokenInfo } from "./types";

const {
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  getUserInfoFailInfo,
  accountForbiddenFailInfo
} = errInfo

// 注册controller
export const registerController = async (params: RegisterModel) => {
  const { username, password } = params;
  const userInfo = await getUserInfo({ username })
  if (userInfo && !userInfo.status) {
    return createErrorResponse(accountForbiddenFailInfo)
  }
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

// 用户信息
export const userInfoController = async (param = '') => {
  const token = param.split(' ')[1]
  if (token) {
    // 根据token解析token信息
    const tokenInfo = await getInfoByToken<UserTokenInfo>(token)
    if (tokenInfo) {
      const { id } = tokenInfo
      const userInfo = await getUserInfoAndRoles(id)
      return new SuccessResponse(userInfo)
    }
  }
  const { code, message } = getUserInfoFailInfo
  return new ErrorResponse(code, message)
}