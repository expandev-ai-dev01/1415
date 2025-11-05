/**
 * @page SpeciesCreatePage
 * @summary Page for creating new dinosaur species
 * @domain species
 * @type form-page
 * @category management
 *
 * @routing
 * - Path: /species/create
 * - Guards: None (public for educational platform)
 *
 * @layout
 * - Centered form layout
 * - Success/error feedback
 * - Navigation back to list
 *
 * @data
 * - Sources: Species API
 * - Validation: Real-time client-side validation
 * - Submission: POST /api/v1/internal/species
 */

import { useNavigate } from 'react-router-dom';
import { SpeciesForm } from '@/domain/species/components/SpeciesForm';
import { useSpeciesCreate } from '@/domain/species/hooks/useSpeciesCreate';
import type { SpeciesFormData } from '@/domain/species/types';
import type { SpeciesCreatePageProps } from './types';

export const SpeciesCreatePage = (props: SpeciesCreatePageProps) => {
  const navigate = useNavigate();

  const { create, isCreating } = useSpeciesCreate({
    onSuccess: () => {
      alert('Espécie criada com sucesso!');
      navigate('/species');
    },
    onError: (error: Error) => {
      alert(`Erro ao criar espécie: ${error.message}`);
    },
  });

  const handleSubmit = async (data: SpeciesFormData) => {
    await create(data);
  };

  const handleCancel = () => {
    navigate('/species');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nova Espécie de Dinossauro</h1>
            <p className="text-gray-600">
              Cadastre uma nova espécie de dinossauro no catálogo educativo
            </p>
          </div>

          <SpeciesForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isCreating} />
        </div>
      </div>
    </div>
  );
};

export default SpeciesCreatePage;
