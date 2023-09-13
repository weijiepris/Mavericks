import jwt from 'jsonwebtoken';

class JwtService {
    private secretKey: string;
    private refreshSecretKey: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';
        this.refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY || 'default-refresh-secret-key';
    }

    // Sign an access token
    async signAccessToken(payload: object, expiresIn: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secretKey, { expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token as string);
                }
            });
        });
    }

    // Verify an access token
    async verifyAccessToken(token: string): Promise<object> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded as object);
                }
            });
        });
    }

    // Sign a refresh token
    async signRefreshToken(payload: object, expiresIn: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.refreshSecretKey, { expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token as string);
                }
            });
        });
    }

    // Verify a refresh token
    async verifyRefreshToken(token: string): Promise<object> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.refreshSecretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded as object);
                }
            });
        });
    }
}

export default JwtService;
