import { ComputadorI } from "./computadores"

export enum StatusProposta {
  Pendente = "Pendente",
  Aprovada = "Aprovada",
  Rejeitada = "Rejeitada",
  Cancelada = "Cancelada"
}

export interface PropostaI {
  id: number
  clienteId: string
  computadorId: number
  computador: ComputadorI
  descricao: string
  resposta?: string;  
  status: StatusProposta;  
  createdAt: string
  updatedAt: string | null
}