"use client"  
import { ComputadorI } from "@/utils/types/computadores";  
import { FotoI } from "@/utils/types/fotos";  
import { useParams } from "next/navigation"  
import { useEffect, useState } from "react";  
import { useClienteStore } from "@/context/cliente";  
import { useForm } from "react-hook-form"  
import { toast } from 'sonner'  

type Inputs = {  
  descricao: string  
}  

export default function Detalhes() {  
  const params = useParams()  
  const { cliente } = useClienteStore()  

  const [computador, setComputador] = useState<ComputadorI | null>(null)  
  const [fotos, setFotos] = useState<FotoI[]>([])  
  const [isLoading, setIsLoading] = useState(true)  
  const [error, setError] = useState<string | null>(null)  

  const { register, handleSubmit, reset } = useForm<Inputs>()  

  useEffect(() => {  
    if (!params.computador_id) return;  

    async function buscaDados() {  
      try {  
        setIsLoading(true)  
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/computadores/${params.computador_id}`)  
        if (!response.ok) throw new Error('Falha ao carregar dadosdo computador')  
        const dados = await response.json()  
        setComputador(dados)} catch (err) {  
        setError('Erro ao carregar dados do computador')  
        toast.error('Erro ao carregar dados do computador')  
      } finally {  
        setIsLoading(false)  
      }  
    }  

    async function buscaFotos() {  
      try {  
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.computador_id}`)  
        if (!response.ok) throw new Error('Falha ao carregar fotos')  
        const dados = await response.json()  
        setFotos(dados)  
      } catch (err) {  
        toast.error('Erro ao carregar fotos')  
      }  
    }  

    buscaDados()  
    buscaFotos()  
  }, [params.computador_id])  

  const listaFotos = fotos.map(foto => (  
    <div key={foto.id} className="relative">  
      <img   
        className="h-auto max-w-80 rounded-lg w-full"  
        src={`data:image/jpg;base64, ${foto.codigoFoto}`}  
        alt={foto.descricao}title={foto.descricao}  
      />  
    </div>  
  ))  

  async function enviaProposta(data: Inputs) {  
    try {  
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas`, {  
        headers: {  
          "Content-Type": "application/json"  
        },  
        method: "POST",  
        body: JSON.stringify({  
          clienteId: cliente.id,  
          computadorId: Number(params.computador_id),  
          descricao: data.descricao  
        })  
      })  

      if (response.status === 201) {  
        toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")  
        reset()  
      } else {  
        throw new Error('Falha ao enviar proposta')  
      }  
    } catch (err) {  
      toast.error("Erro... Não foi possível enviar sua proposta")  
    }  
  }  

  if (isLoading) {  
    return <div className="flex justify-center items-center min-h-screen">  
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>  
    </div>  
  }  

  if (error || !computador) {  
    return <div className="text-center text-red-500 p-4">{error || 'Dados não encontrados'}</div>  
  }  

  return (  
    <>  
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">  
        <img  
          className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"  
          src={computador.foto}   
          alt={`Foto do ${computador.modelo}`}/>  
        <div className="flex flex-col justify-between p-4 leading-normal">  
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">  
            {computador.marca.nome} {computador.modelo}  
          </h5>  
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">  
            Ano: {computador.ano} - {computador.tipo}
          </h5>  
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">  
            Preço R$: {Number(computador.preco)  
              .toLocaleString("pt-br", { minimumFractionDigits: 2 })}  
          </h5>  
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  
            {computador.especificacoes}  
          </p>  

          {cliente.id ? (  
            <>  
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">  
                Gostou deste Computador? Faça uma Proposta!  
              </h3>  
              <form onSubmit={handleSubmit(enviaProposta)} className="mt-4">  
                <input   
                  type="text"   
                  className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"   
                  value={`${cliente.nome} (${cliente.email})`}   
                  disabled   
                  readOnly  
                />  
                <textarea   
                  className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                  placeholder="Descreva a sua proposta"  
                  required  
                  {...register("descricao")}  
                />  
                <button   
                  type="submit"   
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  
                >  
                  Enviar Proposta  
                </button>  
              </form>  
            </>  
          ) : (  
            <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">  
              ** Faça login para fazer proposta para este computador  
            </h3>  
          )}  
        </div>  
      </section>  

      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">  
        {listaFotos}  
      </div>  
    </>  
  )  
}