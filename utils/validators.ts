import { cpf as cpfValidator } from "cpf-cnpj-validator";

export function isValidCpf(value: string) {
    return cpfValidator.isValid(value.replace(/\D/g, ""));
}

export function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function hasUppercase(value: string) {
    return /[A-Z]/.test(value);
}

export function hasSpecialCharacter(value: string) {
    return /[^A-Za-z0-9]/.test(value);
}