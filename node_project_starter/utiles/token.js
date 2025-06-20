import jwt from 'jsonwebtoken' //טוקנים יצירה ועימות 
import  {jwtKey} from '../config/configuration.js'

export const createToken = async (payload, expiresIn = '24h') => {
    return await jwt.sign(payload,jwtKey,{ expiresIn})
}
export const verifyToken = async(token) => {
    return await jwt.verify(token,jwtKey)
} 