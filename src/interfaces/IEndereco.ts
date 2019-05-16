export interface IEndereco{
    idEndereco?: number;
    logradouro: string;
    bairro: string;
    numero: number;
    cep?: string;
    complemento?: string;
    dtInclusao?: Date;  
    dtEdicao?: Date;
    idUsuario?: number;
    idUnidade?: number;
}