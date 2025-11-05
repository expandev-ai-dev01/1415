/**
 * @page SpeciesListPage
 * @summary Page displaying list of all dinosaur species
 * @domain species
 * @type list-page
 * @category management
 *
 * @routing
 * - Path: /species
 * - Guards: None (public for educational platform)
 *
 * @layout
 * - Header with create button
 * - Species list with cards
 * - Loading and error states
 *
 * @data
 * - Sources: Species API
 * - Loading: Skeleton loading states
 * - Caching: 2 minutes stale time
 */

import { useNavigate } from 'react-router-dom';
import { useSpeciesList } from '@/domain/species/hooks/useSpeciesList';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { SpeciesListPageProps } from './types';

export const SpeciesListPage = (props: SpeciesListPageProps) => {
  const navigate = useNavigate();
  const { data: species, isLoading, error, refetch } = useSpeciesList();

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar espécies"
        message={error.message}
        onRetry={() => refetch()}
        onBack={() => navigate('/')}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Espécies</h1>
            <p className="text-gray-600">Explore as espécies de dinossauros cadastradas</p>
          </div>
          <button
            onClick={() => navigate('/species/create')}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Nova Espécie
          </button>
        </div>

        {species && species.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">Nenhuma espécie cadastrada ainda</p>
            <button
              onClick={() => navigate('/species/create')}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Cadastrar Primeira Espécie
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {species?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/species/${item.id}`)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 italic">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Cadastrado em: {new Date(item.dateCreated).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeciesListPage;
