export interface ClienteI {
  id: string
  nome: string
  email: string
  telefone?: string 
  ativo: boolean; 
  createdAt?: string;  
  updatedAt?: string;  
}

export interface ClienteUpdateI {  
  nome?: string;  
  email?: string;  
  telefone?: string;  
  senha?: string;  
}  
