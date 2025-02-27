import { UploadFile } from '@/components/dashboard/upload-file'
import DashboardLayout from '@/components/layout/dashboard/dashboard-layout'

const text = 'Drag & drop or click your TradeTrust file to view its contents'
const formatFiles = '.tt'

export default function VerifyDocument() {
  return (
    <DashboardLayout>
      <div className="mt-5 flex h-full w-full flex-col justify-start">
        <h1>Verify Document</h1>
        <p className="md:text-base">
          Upload or drag and drop your document below to verify it.
        </p>

        <div className="mt-24 flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
          <UploadFile mode="verify" desc={text} formatFile={formatFiles} />
          <div className="h-full w-auto border">dasd</div>
        </div>
      </div>
    </DashboardLayout>
  )
}
