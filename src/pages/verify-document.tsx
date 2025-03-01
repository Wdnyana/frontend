import { UploadFile } from '@/components/dashboard/upload-file'
import DashboardLayout from '@/components/layout/dashboard/dashboard-layout'
import { SelectForm } from '@/components/ui/select-form'
import { useState } from 'react'

const text = 'Drag & drop or click your TradeTrust file to view its contents'
const formatFiles = '.tt'

export default function VerifyDocument() {
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null)
  const [alertView, setAlertView] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const handleSelectExchange = (value: string) => {
    setSelectedExchange(value)
    setAlertView(false)
  }

  const handleUploadSuccess = () => {
    setIsUploaded(true)
  }

  return (
    <DashboardLayout>
      {!isUploaded ? (
        <div className="mt-5 flex h-full w-full flex-col justify-start">
          <h1>Verify Document</h1>
          <p className="md:text-base">
            Upload or drag and drop your document below to verify it.
          </p>

          <div className="mt-20 mb-5 flex items-center gap-3">
            <p>Verify your document on</p>
            <SelectForm onSelect={handleSelectExchange} error={alertView} />
          </div>
          <div className="lg flex flex-col-reverse justify-center gap-10 lg:flex-row lg:justify-between">
            <UploadFile
              mode="verify"
              desc={text}
              formatFile={formatFiles}
              selectedExchange={selectedExchange}
              alertView={alertView}
              setAlertView={setAlertView}
              onUploadSuccess={handleUploadSuccess}
            />
            <div className="h-full w-auto border">dasd</div>
          </div>
        </div>
      ) : (
        <DocumentView />
      )}
    </DashboardLayout>
  )
}
