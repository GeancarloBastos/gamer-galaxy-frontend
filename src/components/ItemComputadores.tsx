import { ComputadorI } from "@/utils/types/computadores";  
import Link from "next/link";  

export function ItemComputadores({ data }: { data: ComputadorI }) {  
  return (  
    <div className="w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-colorRoxoEscuro dark:border-colorAmareloDourado">  
      <Link href={`/detalhes/${data.id}`}>  
        <div className="w-full aspect-[16/10] overflow-hidden rounded-t-lg">  
          <img  
            className="w-full h-full object-cover"  
            src={data.foto}  
            alt={`Imagem do ${data.modelo}`}  
          />  
        </div>  
      </Link>  

      {/* Adicionado flex e flex-col para organizar o conteúdo */}  
      <div className="p-6 min-h-[240px] flex flex-col">  
        <div className="flex-1">  
          <h5 className="mb-3 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-colorAmareloDourado">  
            {data.marca.nome} {data.modelo}  
          </h5>   
          <p className="mb-3 ml-3 font-semibold text-white text-xl">  
            R$ {Number(data.preco).toLocaleString("pt-br",  
              { minimumFractionDigits: 2 }  
            )}  
          </p>  
          {/* Modificado para mostrar "Ver mais" quando o texto for maior que 2 linhas */}  
          <p className="mb-4 ml-3 text-sm text-white line-clamp-2">  
            {data.especificacoes}  
            {data.especificacoes.length > 100 &&  
              <span className="text-colorAmareloDourado"> Ver mais...</span>  
            }  
          </p>  
        </div>  
        {/* Container para centralizar o botão */}  
        <div className="flex justify-center mt-auto">  
          <Link  
            href={`/detalhes/${data.id}`}  
            className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-colorUvaEscura bg-colorAmareloDourado rounded-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-colorAmareloDourado"  
          >  
            Ver Detalhes  
            <svg  
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"  
              aria-hidden="true"  
              xmlns="http://www.w3.org/2000/svg"  
              fill="none"  
              viewBox="0 0 14 10"  
            >  
              <path  
                stroke="currentColor"  
                strokeLinecap="round"  
                strokeLinejoin="round"  
                strokeWidth="2"  
                d="M1 5h12m0 0L9 1m4 4L9 9"  
              />  
            </svg>  
          </Link>  
        </div>  
      </div>  
    </div>  
  );  
}