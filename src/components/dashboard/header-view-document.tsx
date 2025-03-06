import { BadgeCheck } from 'lucide-react'

export function HeaderViewDocument() {
  return (
    <div className="w-auto">
      <h2 className="font-medium">
        Issued by
        <span className="text-primary capitalize">
          &ensp;SANDBOX.TRADETRUST.IO
        </span>
      </h2>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <BadgeCheck className="text-green-700" />
          <p>Document has been issued.</p>
        </div>

        <div className="flex items-center gap-2">
          <BadgeCheck className="text-green-700" />
          <p>Document issuer has been identified.</p>
        </div>

        <div className="flex items-center gap-2">
          <BadgeCheck className="text-green-700" />
          <p>Document has not been tampered with.</p>
        </div>
      </div>
    </div>
  )
}
