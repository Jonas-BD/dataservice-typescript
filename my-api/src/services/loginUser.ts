import { prisma } from "../prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret'

export const loginUser = async (email: string, password: string) => {
    
    const user = await prisma.user.findUnique({
        where: { email},
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            password: true,
            role: true,
        }
    })
    
    if(!user) {
        throw new Error('Bruger ikke fundet')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new Error('Ugyldig password')
    }
    
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        fullname: `${user.firstname} ${user.lastname}`,
        role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1h'}
)
    const { password: _password, ...userWithoutPassword } = user

    return {
        user: userWithoutPassword,
        token
    }
    
}