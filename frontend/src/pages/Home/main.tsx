import { useNavigate } from 'react-router-dom';

/**
 * @page HomePage
 * @summary Home page - welcome page for Ensina Dino platform
 * @domain core
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-700 mb-4">Ensina Dino</h1>
          <p className="text-xl text-gray-700 mb-8">
            Plataforma Educativa Interativa sobre Dinossauros
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">
              Bem-vindo ao Ensina Dino! Uma plataforma completa para aprender sobre dinossauros e
              paleontologia de forma interativa e divertida.
            </p>

            <button
              onClick={() => navigate('/species')}
              className="mb-12 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Explorar Catálogo de Espécies
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-green-600 mb-2">Catálogo de Espécies</h3>
                <p className="text-gray-600 text-sm">
                  Explore centenas de espécies de dinossauros com informações detalhadas
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-green-600 mb-2">
                  Atividades Interativas
                </h3>
                <p className="text-gray-600 text-sm">
                  Aprenda brincando com jogos e atividades educativas
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-green-600 mb-2">Recursos Educativos</h3>
                <p className="text-gray-600 text-sm">
                  Materiais adaptados para diferentes faixas etárias
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
