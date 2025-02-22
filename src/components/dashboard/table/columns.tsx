'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Documents } from '@/types/table'
import { ColumnDef } from '@tanstack/react-table'
import { Download } from 'lucide-react'

function backgroundStatus(status: string) {
  switch (status) {
    case 'Verified':
    case 'Transfer':
      return 'bg-green-800 text-white'
    case 'Pending':
      return 'bg-yellow-800 text-white'
    case 'Rejected':
      return 'bg-red-800 text-white'
    default:
      return 'bg-gray-800 text-white'
  }
}

export const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: 'name',
    header: 'Document Name',
    cell: ({ row }) => <div className="max-w-[150px]">{row.original.name}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge
            className={`rounded-md px-3 py-1 ${backgroundStatus(row.original.status)}`}
          >
            {row.original.status}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return <p className="text-center">{row.original.date}</p>
    },
  },
  {
    accessorKey: 'verifyBy',
    header: 'Verified By',
    cell: ({ row }) => {
      return <p className="text-center">{row.original.verifyBy}</p>
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Button
            variant="outline"
            size="icon"
            onClick={row.original.action}
            className="cursor-pointer"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      )
    },
  },
]
