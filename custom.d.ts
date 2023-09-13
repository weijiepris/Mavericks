declare module 'express-session' {
    interface Session {
        user: { id: number; email: string }; // Define your custom session properties here
    }
}