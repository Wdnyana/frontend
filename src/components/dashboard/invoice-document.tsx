import { Download, Printer } from 'lucide-react'
import { Button } from '../ui/button'

export function InvoiceDocument() {
  return (
    <>
      <div className="flex w-full">
        <h3 className="block rounded-tl-md rounded-tr-md border-2 border-b-0 px-4 py-2">
          Invoice template
        </h3>
        <div className="flex-grow border-b-2" />
      </div>
      <div className="mt-5">
        <div className="flex w-full justify-end gap-3">
          <Button className="h-11 w-11 cursor-pointer">
            <Download />
          </Button>

          <Button className="h-11 w-11 cursor-pointer">
            <Printer />
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <p>Mulai disini</p>
      </div>
    </>
  )
}
