import { columns } from './table/columns'
import { DataTable } from './table/data-table'
import { dataDummy } from '@/assets/data/dummy-data'

export function DashboardComponent() {
  return (
    <>
      <DataTable columns={columns} data={dataDummy} />
    </>
  )
}
