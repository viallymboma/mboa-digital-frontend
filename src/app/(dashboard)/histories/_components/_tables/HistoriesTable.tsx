import React from 'react';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import GenericTable from '@/app/_components/tables/GenericTable';
import { useHistories } from '@/hooks/useHistories';

import { historiesColumns } from './HistoriesTableElements';

const HistoriesTable = () => {
  const t = useTranslations('histories');
  const { histories, isLoading, error } = useHistories();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{t('table.error')}</div>;
  }

  return (
    <GenericTable
      data={histories}
      columns={historiesColumns}
      title={t('table.title')}
      description={t('table.description')}
      defaultPageSize={7}
      onReorder={(reorderedData) => reorderedData}
    />
  );
};

export default HistoriesTable;
