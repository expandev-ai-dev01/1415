/**
 * @module species/components/SpeciesForm/variants
 * @summary Style variants for SpeciesForm component
 */

import { clsx } from 'clsx';

export interface SpeciesFormVariantProps {
  className?: string;
}

export function getSpeciesFormClassName(props: SpeciesFormVariantProps): string {
  const { className } = props;

  return clsx('space-y-6', className);
}

export function getInputClassName(hasError: boolean): string {
  return clsx(
    'w-full px-4 py-2 border rounded-md transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'border-red-500 focus:ring-red-500': hasError,
      'border-gray-300 focus:ring-blue-500 focus:border-blue-500': !hasError,
    }
  );
}

export function getLabelClassName(): string {
  return 'block text-sm font-medium text-gray-700 mb-1';
}

export function getErrorClassName(): string {
  return 'text-sm text-red-600 mt-1';
}

export function getHelpTextClassName(): string {
  return 'text-sm text-gray-500 mt-1';
}

export function getCharCountClassName(isOverLimit: boolean): string {
  return clsx('text-xs mt-1', {
    'text-red-600': isOverLimit,
    'text-gray-500': !isOverLimit,
  });
}

export function getButtonClassName(variant: 'primary' | 'secondary', disabled: boolean): string {
  return clsx(
    'px-6 py-2 rounded-md font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500':
        variant === 'primary' && !disabled,
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500':
        variant === 'secondary' && !disabled,
      'opacity-50 cursor-not-allowed': disabled,
    }
  );
}
