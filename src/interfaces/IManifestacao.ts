import { IManifestante } from "./IManifestante";
import { IEndereco } from "./IEndereco";

export interface IManifestacao{
    idManifestacao?: number;
    descricao?: string;
    hash?: string;
    idTipo?:number;
    idSecretaria?:number;
    idAssunto?:number;
    status?: string;
    tbmanifestante?: IManifestante;
    tbendereco?: IEndereco;
    emailAnonimo?: string;
    dtInclusao?: Date;
    dtEdicao?: Date;
}
