import Cpf from '../src/Cpf';

describe('CPF', () => {
    it('should be a valid CPF', () => {
        const cpf = new Cpf('320-410-908-98');
        expect(cpf).toBeTruthy();
    })

    it('should be a invalid CPF', () => {
        expect(() => new Cpf('123.456.789-10')).toThrow(new Error("Invalid cpf"));
    })

    it('nao deve validar um cpf com todos digitos iguais', () => {
        expect(() => new Cpf('111-111-111-11')).toThrow(new Error("Invalid cpf"));
    })

    it('nao deve validar um cpf maior que 11 digitos', () => {
        expect(() => new Cpf('320-410-908-999')).toThrow(new Error("Invalid cpf"));
    })
    it('nao deve validar um cpf menor que 11 digitos', () => {
        expect(() => new Cpf('320-410-908-9')).toThrow(new Error("Invalid cpf"));
    })
    it('nao deve validar um cpf vazio', () => {
        expect(() => new Cpf('')).toThrow(new Error("Invalid cpf"));
    })
})