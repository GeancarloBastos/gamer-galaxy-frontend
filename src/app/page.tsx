'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemComputadores } from "@/components/ItemComputadores";
import { ComputadorI } from "@/utils/types/computadores";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useClienteStore } from "@/context/cliente";
import Avaliacoes from "@/components/Avaliacoes";
import FAQ from "@/components/Faq";

export default function Home() {
  const [computadores, setComputadores] = useState<ComputadorI[]>([])
  const { logaCliente } = useClienteStore()

  useEffect(() => {
    async function buscaCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string
      buscaCliente(idClienteLocal)
    } async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/computadores`)
      const dados = await response.json()
      setComputadores(dados)
    }
    buscaDados()
  }, [])

  const listaComputadores = computadores.map(computador => (
    <ItemComputadores data={computador} key={computador.id} />
  ))

  return (
    <main>
      {/* Seção do vídeo com overlay */}
      <div className="relative h-[500px]">
        <video
          className="w-full h-full object-cover"
          src="/video-hd_1920_1080_30fps.mp4"
          autoPlay
          loop
          muted playsInline
        />
        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Texto sobre o vídeo */}
        <div className="absolute ml-16 top-1/2 left-8 md:left-16 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4  max-w-xl">
            Encontre o Computador Ideal
          </h1>
          <p className="text-lg md:text-xl  max-w-xl">
            As melhores ofertas em computadores e notebooks você encontra aqui
          </p>
          <div className="mt-16">
            <InputPesquisa setComputadores={setComputadores} />
          </div>
        </div>
      </div>


      {/* Seção de Produtos */}
      <section className="max-w-screen-xl mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold leading-none tracking-tight text-black md:text-3xl lg:text-4xl text-center">
          Produtos em Destaque
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listaComputadores}
        </div>
      </section><Toaster position="top-right" richColors /><div className="mt-16">
        <Avaliacoes />
        <FAQ />
      </div>
    </main>
  );
}