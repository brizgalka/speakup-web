import ErrorHandler from "./errorHandler";

export function ValidateEmail(email: string): boolean {return(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))}

export function validateUsername(username: string): boolean {
    if (username.length < 6) {
        ErrorHandler({
            title: "invalid username",
            text: "Error",
            icon: "error",
            confirmButtonText: "Try again"
        })
        return false
    }
    return true
}
export function validatePassword(password: string): boolean {
    if (password.length < 6) {
        ErrorHandler({
            title: "Password is too short",
            text: "Error",
            icon: "error",
            confirmButtonText: "Try again"
        })
        return false
    }
    return true
}

export function validatePasswordMatch(password: string,passwordAgain: string): boolean {
    if (password != passwordAgain) {
        ErrorHandler({
            title: "Passwords do not match",
            text: "Error",
            icon: "error",
            confirmButtonText: "Try again"
        })
        return false
    }
    return true
}

export function validateEmail(email: string): boolean {
    if (!ValidateEmail(email)) {
        ErrorHandler({
            title: "Invalid email",
            text: "Error",
            icon: "error",
            confirmButtonText: "Try again"
        })
        return false
    }
    return true
}