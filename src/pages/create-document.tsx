import { UploadFile } from '@/components/dashboard/upload-file'
import DashboardLayout from '@/components/layout/dashboard/dashboard-layout'

const text = 'Drag & drop or click to upload your file configuration here'
const formatFiles = '.csv, .json'

export default function CreateDocument() {
  return (
    <DashboardLayout>
      <div className="flex h-full w-full flex-col justify-center">
        <div className="-mt-52">
          <h2>Create and Revoke Document</h2>
          <p className="md:text-base">
            Upload or drag and drop your document below to create or revoke a
            document.
          </p>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
          <UploadFile mode="create" desc={text} formatFile={formatFiles} />
          <div className="h-full w-auto border">dasd</div>
        </div>
      </div>
    </DashboardLayout>
  )
}
