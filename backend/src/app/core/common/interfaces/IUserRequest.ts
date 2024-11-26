import { Request } from 'express'
import { JwtPayload } from '../types/jwt-payload.type'

export interface IUserRequest extends Request {
	user: JwtPayload
}
