"use client"  
import { useForm } from "react-hook-form"  
import { useRouter } from "next/navigation"  
import { useClienteStore } from "@/context/cliente"  
import { useState } from "react"  
import { toast } from "react-hot-toast"  

type Inputs = {  
  email: string  
  senha: string  
  manter: boolean  
}  

type ForgotPasswordInputs = {  
  email: string  
}  

export default function Login() {  
  const { register, handleSubmit } = useForm<Inputs>()  
  const { logaCliente } = useClienteStore()  
  const router = useRouter()  
  const [showForgotPassword, setShowForgotPassword] = useState(false)  
  const [isLoading, setIsLoading] = useState(false)  
  const { register: registerForgot, handleSubmit: handleSubmitForgot } = useForm<ForgotPasswordInputs>()  

  async function verificaLogin(data: Inputs) {  
    try {  
      setIsLoading(true)  
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/login`, {  
        headers: {  
          "Content-Type": "application/json"  
        },  
        method: "POST",  
        body: JSON.stringify({ email: data.email, senha: data.senha })  
      })  

      if (response.status == 200) {  
        const dados = await response.json()  
        logaCliente(dados)  

        if (data.manter) {  
          localStorage.setItem("client_key", dados.id)  
        } else {  
          if (localStorage.getItem("client_key")) {  
            localStorage.removeItem("client_key")  
          }  
        }     

        router.push("/")  
        toast.success(`Bem-vindo(a), ${dados.nome}!`)  
      } else {  
        toast.error("Email ou senha incorretos")  
      }  
    } catch (error) {  
      toast.error("Erro ao fazer login. Tente novamente.")  
    } finally {  
      setIsLoading(false)  
    }  
  }  

  async function handleForgotPassword(data: ForgotPasswordInputs) {  
    try {  
      setIsLoading(true)  
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/forgot-password`, {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ email: data.email })  
      })  
      
      const responseData = await response.json()  
      
      if (response.ok) {  
        toast.success(responseData.mensagem)  
        setShowForgotPassword(false)  
      } else {  
        toast.error(responseData.erro)  
      }  
    } catch (error) {  
      toast.error('Erro ao processar solicitação')  
    } finally {  
      setIsLoading(false)  
    }  
  }  

  return (  
    <section className="bg-orange-100 dark:bg-gray-900">  
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">  
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-colorRoxoEscuro dark:border-gray-600">  
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">  
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">  
              {showForgotPassword ? "Recuperar Senha" : "Informe seus Dados de Acesso"}  
            </h1>  

            {!showForgotPassword ? (  
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(verificaLogin)}>  
                <div>  
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  
                    E-mail do Cliente:  
                  </label>  
                  <input   
                    type="email"   
                    id="email"   
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   
                    placeholder="name@company.com"   
                    required   
                    {...register("email")}   
                  />  
                </div>  
                <div>  
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  
                    Senha de Acesso:  
                  </label>  
                  <input   
                    type="password"   
                    id="password"   
                    placeholder="••••••••"   
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   
                    required   
                    {...register("senha")}   
                  />  
                </div>  
                <div className="flex items-center justify-between">  
                  <div className="flex items-start">  
                    <div className="flex items-center h-5">  
                      <input   
                        id="remember"   
                        type="checkbox"   
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"   
                        {...register("manter")}   
                      />  
                    </div>  
                    <div className="ml-3 text-sm">  
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">  
                        Manter Conectado  
                      </label>  
                    </div>  
                  </div>  
                  <button  
                    type="button"  
                    onClick={() => setShowForgotPassword(true)}  
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"  
                  >  
                    Esqueceu sua senha?  
                  </button>  
                </div>  
                <button   
                  type="submit"   
                  disabled={isLoading}  
                  className="w-full text-colorRoxoEscuro font-bold bg-colorAmareloDourado hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"  
                >  
                  {isLoading ? "Carregando..." : "Entrar"}  
                </button>  
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">  
                  Você não está cadastrado? {" "}  
                  <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">  
                    Cadastre-se  
                  </a>  
                </p>  
              </form>  
            ) : (  
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitForgot(handleForgotPassword)}>  
                <div>  
                  <label htmlFor="forgot-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  
                    Informe seu e-mail cadastrado:  
                  </label>  
                  <input   
                    type="email"   
                    id="forgot-email"   
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   
                    placeholder="name@company.com"   
                    required   
                    {...registerForgot("email")}   
                  />  
                </div>  
                <button   
                  type="submit"   
                  disabled={isLoading}  
                  className="w-full text-colorRoxoEscuro font-bold bg-colorAmareloDourado hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"  
                >  
                  {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}  
                </button>  
                <button  
                  type="button"  
                  onClick={() => setShowForgotPassword(false)}  
                  className="w-full text-gray-500 hover:text-gray-700 text-sm dark:text-gray-400 dark:hover:text-gray-300"  
                >  
                  Voltar para o login  
                </button>  
              </form>  
            )}  
          </div>  
        </div>  
      </div>  
    </section>  
  )  
}