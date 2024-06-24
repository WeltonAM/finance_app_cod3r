import { ProvedorCriptografia } from 'core'
import bcrypt from 'bcrypt'

export default class ProvedorBcrypt implements ProvedorCriptografia {
    criptografar(senha: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    comparar(senha: string, senhaCriptografada: string): boolean {
        return bcrypt.compareSync(senha, senhaCriptografada)
    }
}
