import { RegisterModel } from "../db/models/user";
import { createUser, getUserInfo } from "../services/auth";
import errInfo from "../constants/errInfo";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import { createMD5 } from "../utils/createMD5";

const {
  registerUserNameExistInfo,
  registerFailInfo
} = errInfo

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