import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FallbackProps {
  type: 'loading' | 'error' | 'empty';
  title?: string;
  description?: string;
  className?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

export function Fallback({
  type,
  title,
  description,
  className,
  showRetry = false,
  onRetry,
}: FallbackProps) {
  const getContent = () => {
    switch (type) {
      case 'loading':
        return {
          icon: <Loader2 className="w-8 h-8 text-[#1F6B5E] animate-spin" />,
          title: title || 'Загрузка...',
          description: description || 'Пожалуйста, подождите',
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-500" />,
          title: title || 'Произошла ошибка',
          description: description || 'Не удалось загрузить данные',
        };
      case 'empty':
        return {
          icon: <AlertCircle className="w-8 h-8 text-grey-400" />,
          title: title || 'Данные отсутствуют',
          description: description || 'На данный момент информация недоступна',
        };
    }
  };

  const content = getContent();

  return (
    <div className={cn('text-center py-12', className)}>
      <div className="w-16 h-16 bg-grey-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {content.icon}
      </div>
      <h3 className="text-xl font-semibold text-grey-900 mb-2">
        {content.title}
      </h3>
      <p className="text-grey-600 max-w-md mx-auto mb-4">
        {content.description}
      </p>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="bg-[#1F6B5E] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#2A8B7A] transition-colors duration-300"
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
}

// Skeleton компонент для загрузки
export function SkeletonGrid({ 
  columns = 3, 
  className 
}: { 
  columns?: number; 
  className?: string; 
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-8', gridCols[columns as keyof typeof gridCols], className)}>
      {[...Array(columns)].map((_, index) => (
        <div key={index} className="bg-white p-8 rounded-xl border border-grey-200 animate-pulse">
          <div className="w-14 h-14 bg-grey-200 rounded-lg mb-6"></div>
          <div className="h-6 bg-grey-200 rounded mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-grey-200 rounded"></div>
            <div className="h-4 bg-grey-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton для списка
export function SkeletonList({ 
  items = 3, 
  className 
}: { 
  items?: number; 
  className?: string; 
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {[...Array(items)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl border border-grey-200 p-6 animate-pulse">
          <div className="h-6 bg-grey-200 rounded mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-grey-200 rounded"></div>
            <div className="h-4 bg-grey-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
