import { ISecretaria } from './ISecretaria';
import { ITipo } from './ITipo';
import { IAssunto } from './IAssunto';
import { IManifestante } from "./IManifestante";
import { IEndereco } from "./IEndereco";

export interface IManifestacao{
    idManifestacao?: number;
    observacao?: string;
    hash?: string;
    idTipo?:number;
    idSecretaria?:number;
    idAssunto?:number;
    status?: string;
    emailAnonimo?: string;
    dtInclusao?: Date;
    dtEdicao?: Date;
    tbmanifestante?: IManifestante;
    tbendereco?: IEndereco;
    tbassunto?: IAssunto;
    tbtipo?: ITipo;
    tbsecretaria?: ISecretaria;
}
