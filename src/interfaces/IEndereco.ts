export interface IEndereco{
    idEndereco?: number;
    logradouro: string;
    bairro: string;
    numero: string;
    cep?: string;
    complemento?: string;
    dtInclusao?: Date;
    dtEdicao?: Date;
    idUsuario?: number;
    idUnidade?: number;
    mapa?: string;

}
