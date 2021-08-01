import crypto from 'crypto'
import { userSecret } from '../config/auth'

export const createMD5 = (content:any) => {
  const md5 = crypto.createHash('md5')
  return md5.update(`${content}_${userSecret}`).digest('hex')
}