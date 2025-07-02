export const AuthService = {
    checkUser: (identity_number: string, password: string): "ok" | "invalid_id" | "invalid_password" => {
        // Simulate a user check. In a real application, this would query a database.
        if (identity_number !== "123456789") return "invalid_id";
        if (password !== "password123") return "invalid_password";
        return "ok";
    }
};
