import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AlertCircle, UploadCloud, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UploadFiles } from '@/types/general-type'

export function UploadFile({ desc, formatFile, mode }: UploadFiles) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [uploading, setUploading] = useState<boolean>(false)

  const fileAccept: Record<string, string[]> =
    mode === 'verify'
      ? { 'application/octet-stream': ['.tt'] }
      : { 'text/csv': ['.csv'], 'application/json': ['.json'] }

  function uploadFileProgress(file: File) {
    setUploading(true)
    setProgress(0)

    let processing = 0
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 15) + 5
      processing = Math.min(processing + increment, 100)
      setProgress(processing)

      if (processing >= 100) {
        clearInterval(interval)

        setTimeout(() => {
          setUploadedFile(file)
          setUploading(false)
        }, 500)
      }
    }, 300)
  }

  const onDragAndDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      uploadFileProgress(acceptedFiles[0])
      setError(null)
    }
  }, [])

  const rejectedFile = useCallback(() => {
    setError(
      `Invalid file format. Please upload ${
        mode === 'verify' ? 'a .tt file' : '.csv or .json files'
      }.`,
    )
  }, [mode])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: fileAccept,
    onDrop: onDragAndDrop,
    onDropRejected: rejectedFile,
    multiple: false,
  })

  return (
    <div className="mx-auto flex flex-col items-center justify-center space-y-5 md:w-3/4 lg:mx-0 lg:w-1/2 xl:w-[35%]">
      <div
        {...getRootProps()}
        className={`w-full border-2 px-10 py-20 xl:py-28 ${
          isDragActive
            ? 'border-primary border-dashed'
            : 'border-dashed border-gray-300'
        } cursor-pointer rounded-lg text-center shadow-lg transition-all`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto mb-2" size={40} />
        <p className="mt-5 mb-2 md:text-base">
          {isDragActive ? 'Drop the file here...' : desc}
        </p>
        <p className="md:text-base">
          Supported formats:&ensp;
          <span className="text-primary text-[18px] font-semibold">
            {formatFile}
          </span>
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {uploading && (
        <div className="w-full max-w-lg">
          <div className="mb-2 text-center text-sm font-medium">
            Uploading... {progress}%
          </div>
          <div className="h-2 w-full rounded bg-gray-200">
            <div
              className="h-full rounded bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {uploadedFile && !uploading && (
        <div className="flex w-full max-w-lg items-center justify-between rounded-md border py-1 ps-4 pe-1 shadow-sm">
          <span className="truncate">{uploadedFile.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => setUploadedFile(null)}
          >
            <X className="" size={18} />
          </Button>
        </div>
      )}
    </div>
  )
}
