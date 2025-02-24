import React from 'react'
import { ColumnDef } from '@tanstack/react-table'

export type TypesClassNames = {
  className?: string
}

export type UploadFiles = {
  desc: string
  formatFile: string
  mode: 'verify' | 'create'
}

export type DragAndDropFiles = {
  desc: string
  formatFile: string
  error: string | null
  uploading: boolean
  progress: number
  uploadedFile: File | null
  onDragAndDrop: (acceptedFiles: File[]) => void
  rejectedFiles: () => void
  removeFile: () => void
  fileAccept: Record<string, string[]>
}
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export type SearchForms = {
  search?: string
  searchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.ComponentProps<'form'>
