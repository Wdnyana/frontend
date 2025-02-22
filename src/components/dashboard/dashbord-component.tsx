import { SearchForm } from '@/components/ui/search-form'
import { columns } from './table/columns'
import { DataTable } from './table/data-table'
import { dataDummy } from '@/assets/data/dummy-data'

export function DashboardComponent() {
  return (
    <>
      <div className="mb-7 flex w-full items-center justify-between">
        <div className="">
          <h2>Document</h2>
          <p className="md:text-base">View and manage your documents</p>
        </div>

        <div className="xl:w-1/4">
          <SearchForm />
        </div>
      </div>
      <div className="">
        <DataTable columns={columns} data={dataDummy} />
      </div>
    </>
  )
}
