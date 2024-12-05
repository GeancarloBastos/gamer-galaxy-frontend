"use client"  
import Link from "next/link";  
import { useClienteStore } from "@/context/cliente";  
import { useRouter } from "next/navigation";  
import { useState } from "react";  
import { User, LogOut, Settings, Gamepad2, ChevronDown } from 'lucide-react';  


export default function Header() {  
  const { cliente, deslogaCliente } = useClienteStore()  
  const router = useRouter()  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)  

  function sairCliente() {  
    deslogaCliente()  
    if (localStorage.getItem("client_key")) {  
      localStorage.removeItem("client_key")  
    }  
    router.push("/login")  
  }  

  return (  
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 border-b-2 border-colorAmareloDourado/30 shadow-lg">  
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">  
        {/* Logo e Nome */}  
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse group">  
          <div className="relative">  
            <img src="./logo.png" className="h-24 transition-transform duration-300 group-hover:scale-110" alt="logo" />  
            <div className="absolute inset-0 bg-colorAmareloDourado/20 rounded-full filter blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>  
          </div>  
          <span className="self-center text-3xl font-bold text-white group-hover:text-colorAmareloDourado transition-colors duration-300 relative">  
            Gamer Galaxy  
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-colorAmareloDourado transition-all duration-300 group-hover:w-full"></span>  
          </span>  
        </Link>  

        {/* Menu área */}  
        <div className="flex items-center space-x-6 rtl:space-x-reverse">  
          {cliente.id ? (  
            <div className="relative">  
              {/* Botão do usuário */}  
              <button  
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
                className="flex items-center space-x-2 bg-purple-700/50 px-4 py-2 rounded-lg border border-colorAmareloDourado/30 hover:bg-purple-600/50 transition-all duration-300"  
              >  
                <User className="w-5 h-5 text-colorAmareloDourado" />  
                <span className="text-colorAmareloDourado font-gaming">  
                  {cliente.nome}  
                </span>  
                <ChevronDown className={`w-4 h-4 text-colorAmareloDourado transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />  
              </button>  

              {/* Dropdown Menu */}  
              {isDropdownOpen && (  
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-purple-800 border border-colorAmareloDourado/30 py-1 z-50">  
                  <Link  
                    href="/propostas"  
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-colorAmareloDourado hover:bg-purple-700 transition-colors duration-200"  
                  >  
                    <Gamepad2 className="w-4 h-4" />  
                    <span>Minhas Propostas</span>  
                  </Link>  
                  <Link  
                    href="/perfil"  
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-colorAmareloDourado hover:bg-purple-700 transition-colors duration-200"  
                  >  
                    <Settings className="w-4 h-4" />  
                    <span>Configurações</span>  
                  </Link>  
                  <button  
                    onClick={sairCliente}  
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-purple-700 w-full text-left transition-colors duration-200"  
                  >  
                    <LogOut className="w-4 h-4" />  
                    <span>Sair</span>  
                  </button>  
                </div>  
              )}  
            </div>  
          ) : (  
            <Link  
              href="/login"  
              className="relative group"  
            >  
              <span className="relative z-10 px-6 py-2 font-gaming text-xl text-colorAmareloDourado border-2 border-colorAmareloDourado rounded-lg   
                             hover:bg-colorAmareloDourado hover:text-purple-800 transition-all duration-300   
                             flex items-center space-x-2">  
                <User className="w-5 h-5" />  
                <span>Entrar</span>  
              </span>  
              <div className="absolute inset-0 bg-colorAmareloDourado/20 rounded-lg filter blur-sm scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>  
            </Link>  
          )}  
        </div>  
      </div>  
    </nav>  
  )  
}