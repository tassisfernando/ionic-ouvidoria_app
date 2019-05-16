import { IUnidade } from "./IUnidade";
import { IAssunto } from "./IAssunto";

export interface ISecretaria{
    idSecretaria?: number;
    nmSecretaria: string;
    tbunidade: IUnidade[];
    tbassunto: IAssunto[];
}