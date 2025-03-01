import { useState, useCallback } from 'react'

export function useUploadHandler(mode: 'verify' | 'create') {
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
      processing = Math.min(
        processing + Math.floor(Math.random() * 15) + 5,
        100,
      )
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
      `Invalid file format. Please upload ${mode === 'verify' ? 'a .tt file' : '.csv or .json files'}.`,
    )
  }, [mode])

  function removeFileUpload() {
    setUploadedFile(null)
  }

  return {
    uploadedFile,
    error,
    progress,
    uploading,
    fileAccept,
    onDragAndDrop,
    rejectedFile,
    removeFileUpload,
  }
}
