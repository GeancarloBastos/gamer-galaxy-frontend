'use client'
import './page.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { PropostaI } from "@/utils/types/propostas";
import { Clock, Check, MessageSquare } from 'lucide-react';

export default function Propostas() {
  const [propostas, setPropostas] = useState<PropostaI[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas/${cliente.id}`)
      const dados = await response.json()
      setPropostas(dados)
    }
    buscaDados()
  }, [])

  function dataDMA(data: string) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  return (
    <div className="relative mb-12">
      <div className="max-w-4xl mx-auto text-center py-8">
        <div className="inline-block relative">
          <h1 className="text-4xl font-bold text-colorAmareloDourado   
                     bg-colorRoxoEscuro px-16 py-6 rounded-md  
                     border-2 border-colorAmareloDourado  
                     shadow-[0_0_20px_rgba(255,215,0,0.3)]  
                     animate-pulse">
            <span className="relative z-10">⚡ MINHAS PROPOSTAS ⚡</span>
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600   
                      rounded-lg blur-sm opacity-75 -z-10"></div>
        </div>
        <div className="mt-4 text-colorAmareloDourado/80 font-gaming">
          Gerencie suas negociações em andamento
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ml-5">
        {propostas.map(proposta => (
          <div key={proposta.id}
            className="bg-colorRoxoEscuro rounded-xl overflow-hidden shadow-lg border border-colorAmareloDourado/20 hover:shadow-2xl transition-all duration-300">
            {/* Cabeçalho do Card */}
            <div className="relative">
              <img
                src={proposta.computador.foto}
                alt={proposta.computador.modelo}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-colorRoxoEscuro to-transparent p-4">
                <h3 className="text-colorAmareloDourado text-xl font-bold">
                  {proposta.computador.modelo}
                </h3>
              </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6 space-y-4">
              {/* Proposta */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-colorAmareloDourado/80">
                  <MessageSquare size={18} />
                  <span className="text-sm font-medium">Proposta</span>
                </div>
                <p className="text-colorAmareloDourado font-medium">
                  {proposta.descricao}
                </p>
                <div className="flex items-center gap-2 text-colorAmareloDourado/60 text-sm">
                  <Clock size={14} />
                  <span>Enviado em {dataDMA(proposta.createdAt)}</span>
                </div>
              </div>

              {/* Resposta */}
              <div className="space-y-2 border-t border-colorAmareloDourado/10 pt-4">
                <div className="flex items-center gap-2 text-colorAmareloDourado/80">
                  <Check size={18} />
                  <span className="text-sm font-medium">Status</span>
                </div>
                {proposta.resposta ? (
                  <div>
                    <p className="text-colorAmareloDourado font-medium">
                      {proposta.resposta}
                    </p>
                    <div className="flex items-center gap-2 text-colorAmareloDourado/60 text-sm mt-2">
                      <Clock size={14} />
                      <span>Respondido em {dataDMA(proposta.updatedAt as string)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-colorAmareloDourado/10 p-3 rounded-lg">
                    <Clock size={18} className="text-colorAmareloDourado/60" />
                    <span className="text-colorAmareloDourado/80">Aguardando resposta...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}