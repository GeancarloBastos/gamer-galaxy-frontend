'use client'  
import { useState, useEffect } from 'react'  
import { useClienteStore } from "@/context/cliente"  
import { useRouter } from 'next/navigation'  
import { User, Mail, Phone, Lock, Save, Loader } from 'lucide-react'  

export default function Perfil() {  
  const { cliente } = useClienteStore()  
  const router = useRouter()  
  const [isLoading, setIsLoading] = useState(false)  
  const [message, setMessage] = useState({ type: '', text: '' })  
  
  const [formData, setFormData] = useState({  
    nome: '',  
    email: '',  
    telefone: '',  
    senha: '',  
    confirmarSenha: ''  
  })  

  useEffect(() => {  
    if (!cliente.id) {  
      router.push('/login')  
      return  
    }  
    
    // Preenche o formulário com os dados atuais  
    setFormData(prev => ({  
      ...prev,  
      nome: cliente.nome,  
      email: cliente.email,  
      telefone: cliente.telefone || '',  
    }))  
  }, [cliente])  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const { name, value } = e.target  
    setFormData(prev => ({  
      ...prev,  
      [name]: value  
    }))  
  }  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault()  
    setIsLoading(true)  
    setMessage({ type: '', text: '' })  

    // Validação básica  
    if (formData.senha !== formData.confirmarSenha) {  
      setMessage({ type: 'error', text: 'As senhas não coincidem' })  
      setIsLoading(false)  
      return  
    }  

    try {  
      const payload = {  
        nome: formData.nome,  
        email: formData.email,  
        telefone: formData.telefone,  
        ...(formData.senha && { senha: formData.senha })  
      }  

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}`, {  
        method: 'PATCH',  
        headers: {  
          'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(payload)  
      })  

      if (response.ok) {  
        setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' })  
        // Limpar campos de senha  
        setFormData(prev => ({  
          ...prev,  
          senha: '',  
          confirmarSenha: ''  
        }))  
      } else {  
        throw new Error('Erro ao atualizar perfil')  
      }  
    } catch (error) {  
      setMessage({ type: 'error', text: 'Erro ao atualizar perfil. Tente novamente.' })  
    } finally {  
      setIsLoading(false)  
    }  
  }  

  return (  
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">  
      <div className="max-w-2xl mx-auto">  
        {/* Cabeçalho */}  
        <div className="text-center mb-8">  
          <h1 className="text-3xl font-bold text-colorAmareloDourado">  
            Configurações do Perfil  
          </h1>  
          <p className="mt-2 text-colorAmareloDourado/60">  
            Atualize suas informações pessoais  
          </p>  
        </div>  

        {/* Formulário */}  
        <form onSubmit={handleSubmit} className="space-y-6 bg-purple-800/50 p-8 rounded-lg border border-colorAmareloDourado/20">  
          {/* Mensagem de feedback */}  
          {message.text && (  
            <div className={`p-4 rounded-lg ${  
              message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'  
            }`}>  
              {message.text}  
            </div>  
          )}  

          {/* Campo Nome */}  
          <div>  
            <label className="block text-colorAmareloDourado mb-2 text-sm font-medium">  
              Nome  
            </label>  
            <div className="relative">  
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-colorAmareloDourado/50 w-5 h-5" />  
              <input  
                type="text"  
                name="nome"  
                value={formData.nome}  
                onChange={handleChange}  
                className="bg-purple-900/50 text-colorAmareloDourado w-full pl-12 pr-4 py-2.5 rounded-lg border border-colorAmareloDourado/20 focus:ring-2 focus:ring-colorAmareloDourado/50 focus:border-transparent"  
                required  
              />  
            </div>  
          </div>  

          {/* Campo Email */}  
          <div>  
            <label className="block text-colorAmareloDourado mb-2 text-sm font-medium">  
              Email  
            </label>  
            <div className="relative">  
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-colorAmareloDourado/50 w-5 h-5" />  
              <input  
                type="email"  
                name="email"  
                value={formData.email}  
                onChange={handleChange}  
                className="bg-purple-900/50 text-colorAmareloDourado w-full pl-12 pr-4 py-2.5 rounded-lg border border-colorAmareloDourado/20 focus:ring-2 focus:ring-colorAmareloDourado/50 focus:border-transparent"  
                required  
              />  
            </div>  
          </div>  

          {/* Campo Telefone */}  
          <div>  
            <label className="block text-colorAmareloDourado mb-2 text-sm font-medium">  
              Telefone  
            </label>  
            <div className="relative">  
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-colorAmareloDourado/50 w-5 h-5" />  
              <input  
                type="tel"  
                name="telefone"  
                value={formData.telefone}  
                onChange={handleChange}  
                className="bg-purple-900/50 text-colorAmareloDourado w-full pl-12 pr-4 py-2.5 rounded-lg border border-colorAmareloDourado/20 focus:ring-2 focus:ring-colorAmareloDourado/50 focus:border-transparent"  
              />  
            </div>  
          </div>  

          {/* Campo Senha */}  
          <div>  
            <label className="block text-colorAmareloDourado mb-2 text-sm font-medium">  
              Nova Senha (opcional)  
            </label>  
            <div className="relative">  
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-colorAmareloDourado/50 w-5 h-5" />  
              <input  
                type="password"  
                name="senha"  
                value={formData.senha}  
                onChange={handleChange}  
                className="bg-purple-900/50 text-colorAmareloDourado w-full pl-12 pr-4 py-2.5 rounded-lg border border-colorAmareloDourado/20 focus:ring-2 focus:ring-colorAmareloDourado/50 focus:border-transparent"  
              />  
            </div>  
          </div>  

          {/* Campo Confirmar Senha */}  
          <div>  
            <label className="block text-colorAmareloDourado mb-2 text-sm font-medium">  
              Confirmar Nova Senha  
            </label>  
            <div className="relative">  
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-colorAmareloDourado/50 w-5 h-5" />  
              <input  
                type="password"  
                name="confirmarSenha"  
                value={formData.confirmarSenha}  
                onChange={handleChange}  
                className="bg-purple-900/50 text-colorAmareloDourado w-full pl-12 pr-4 py-2.5 rounded-lg border border-colorAmareloDourado/20 focus:ring-2 focus:ring-colorAmareloDourado/50 focus:border-transparent"  
              />  
            </div>  
          </div>  

          {/* Botão Submit */}  
          <button  
            type="submit"  
            disabled={isLoading}  
            className="w-full flex items-center justify-center gap-2 bg-colorAmareloDourado text-purple-900 py-3 px-4 rounded-lg font-medium hover:bg-colorAmareloDourado/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colorAmareloDourado disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"  
          >  
            {isLoading ? (  
              <>  
                <Loader className="w-5 h-5 animate-spin" />  
                Salvando...  
              </>  
            ) : (  
              <>  
                <Save className="w-5 h-5" />  
                Salvar Alterações  
              </>  
            )}  
          </button>  
        </form>  
      </div>  
    </div>  
  )  
}