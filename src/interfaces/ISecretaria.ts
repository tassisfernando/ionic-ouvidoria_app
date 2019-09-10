import { IUnidade } from "./IUnidade";
import { IAssunto } from "./IAssunto";

export interface ISecretaria{
    idSecretaria?: number;
    nmSecretaria: string;
    tb_unidade: IUnidade[];
    tb_assunto: IAssunto[];
}
