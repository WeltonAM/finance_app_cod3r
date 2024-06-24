import jwt from 'jsonwebtoken'

export default class ProvedorJWT {
    constructor(private segredo: string) {}

    gerar(payload: string | object): string {
        return jwt.sign(payload, this.segredo, { expiresIn: '15d' })
    }

    validar(token: string): string | object {
        return jwt.verify(token, this.segredo)
    }
}
