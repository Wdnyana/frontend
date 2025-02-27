import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { UploadFiles } from '@/types/general-type'
import { SelectTypeDocument } from './step/select-type-document'
import { NameDocument } from './step/name-document'
import { DownloadDocument } from './step/download-document'
import { DragAndDrop } from './step/drag-drop'

export function UploadFile({ desc, formatFile, mode }: UploadFiles) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [uploading, setUploading] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const [selected, setSelectTypeDoc] = useState<string>('')
  const [alert, setAlert] = useState(false)
  const [fileName, setFileName] = useState<string>('')

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

  function removeFileUpload() {
    setUploadedFile(null)
  }

  function handleToDashboard() {
    setFileName('')
    setUploadedFile(null)
    setStep(1)
  }

  function nextStep() {
    if (step === 2 && !selected) {
      setAlert(true)
      return
    }

    if (step === 3 && fileName.trim() === '') {
      setAlert(true)
      return
    }

    setAlert(false)
    setStep((e) => e + 1)
  }

  function prevStep() {
    setStep((e) => e - 1)
  }

  return (
    <div className="mx-auto flex flex-col items-center justify-center space-y-5 md:w-3/4 lg:mx-0 lg:w-1/2 xl:w-[35%]">
      {step === 1 && (
        <>
          <DragAndDrop
            desc={desc}
            formatFile={formatFile}
            error={error}
            uploading={uploading}
            progress={progress}
            uploadedFile={uploadedFile}
            onDragAndDrop={onDragAndDrop}
            rejectedFiles={rejectedFile}
            removeFile={removeFileUpload}
            fileAccept={fileAccept}
          />
        </>
      )}

      {step === 2 && (
        <>
          <SelectTypeDocument
            setSelectTypeDoc={setSelectTypeDoc}
            selected={selected}
            alert={alert}
            setAlert={setAlert}
          />
        </>
      )}

      {step === 3 && (
        <>
          <NameDocument
            fileName={fileName}
            setFileName={setFileName}
            uploadedFile={uploadedFile}
            alert={alert}
            setAlert={setAlert}
          />
        </>
      )}

      {step === 4 && (
        <>
          <DownloadDocument
            fileName={`${fileName}.tt`}
            onReset={handleToDashboard}
            alert={alert}
            setAlert={setAlert}
          />
        </>
      )}

      <div className="mt-4 flex w-full justify-end gap-8">
        <Button
          variant="outline"
          className="cursor-pointer rounded-lg px-10 py-5 font-normal md:text-base"
          onClick={prevStep}
          disabled={step === 1}
        >
          Back
        </Button>

        <Button
          className="cursor-pointer rounded-lg px-10 py-5 font-normal md:text-base"
          onClick={nextStep}
          disabled={
            (step === 1 && (!uploadedFile || uploading || progress < 100)) ||
            // (step === 2 && !selected) ||
            // (step === 3 && fileName === '') ||
            step === 4
          }
        >
          Next
        </Button>
      </div>
    </div>
  )
}
