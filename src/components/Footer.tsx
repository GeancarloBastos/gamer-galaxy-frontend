
import { FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-colorUvaEscura text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="./logo.png" className="h-24 mr-4" alt="Logo" />
            <div>
              <h2 className="text-xl font-bold">Gamer Galaxy</h2>
              <p className="text-gray-400">Conectando você a vários mundos diferentes.</p>
            </div>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="https://www.instagram.com/geanbastos01/?hl=pt-br" className="hover:text-colorAmareloDourado transition duration-150">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="https://github.com/GeancarloBastos" className="hover:text-colorAmareloDourado transition duration-150">
              <FaGithub className="w-6 h-6" />
            </a>
          </div>

          <div className="text-center md:text-right text-gray-400">
            <p>Geancarlo Bastos.</p>
            <p>Leonardo Bonato.</p>
            <p>&copy;2024 Todos os direitos reservados GL.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};