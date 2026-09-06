export function formatCpf(value: string) {
    const cpf = value.replace(/\D/g, "").slice(0, 11);

    return cpf
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}