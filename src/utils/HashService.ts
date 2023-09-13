import bcrypt from "bcryptjs"

class HashService {
    private salt: number;

    constructor() {
        this.salt = 12;
    }

    async hash(password: string): Promise<string> {
        try {
            return await bcrypt.hash(password, this.salt);
        } catch (error) {
            throw error;
        }
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw error;
        }
    }
}

export default HashService;