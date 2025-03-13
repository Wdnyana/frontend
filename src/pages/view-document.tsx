import { HeaderViewDocument } from '@/components/dashboard/header-view-document'
import { InvoiceDocument } from '@/components/dashboard/invoice-document'
import { NFTDocument } from '@/components/dashboard/nft-document'
import DashboardLayout from '@/components/layout/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { LoginEmailOTP } from '@/types/general-type'

export default function ViewDocument({ token, setToken, type }: LoginEmailOTP) {
  return (
    <DashboardLayout>
      <div className="mt-5 h-full w-full">
        {type?.type === 'nft' ? (
          <>
            <div className="flex w-full flex-col items-center justify-between md:flex-row">
              <HeaderViewDocument />

              <div className="flex flex-col">
                <h3 className="text-primary mb-4">NFT information:</h3>

                <a
                  href="https://ui.shadcn.com/docs/components/input-otp"
                  className="mb-3 font-medium hover:text-blue-400 md:text-base"
                >
                  View NFT Registry
                </a>

                <a
                  href="https://ui.shadcn.com/docs/components/input-otp"
                  className="mb-3 font-medium hover:text-blue-400 md:text-base"
                >
                  View Endorsement Chain
                </a>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex gap-3">
                <p className="bg-accent inline-block rounded-md px-4 py-2 text-orange-400 md:text-base">
                  Transferable
                </p>
                <p className="bg-accent inline-block rounded-md px-4 py-2 text-orange-400 md:text-base">
                  Transferable
                </p>
              </div>

              <div className="mt-10 flex lg:gap-36">
                <div className="flex flex-col">
                  <h4 className="text-gray-600">Owner:</h4>
                  <a
                    href="https://stability.blockscout.com/address/0x7d7C1C8B4eB6edD23BCA43F4d032EBb21c9258F9"
                    className="py-1 text-blue-700 md:text-base"
                  >
                    0x0464Ed822C6BcCAbd1CE8a7812451881F934355C
                  </a>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-gray-600">Holder:</h4>
                  <a
                    href="https://stability.blockscout.com/address/0x7d7C1C8B4eB6edD23BCA43F4d032EBb21c9258F9"
                    className="py-1 text-blue-700 md:text-base"
                  >
                    0x9c1d83d39574ab4d3817f5A942d4b0d149fdd6BD
                  </a>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Button className="cursor-pointer md:py-5">
                  Connect Wallet
                </Button>
              </div>
            </div>

            <div className="mt-20 w-full">
              <NFTDocument />
            </div>
          </>
        ) : (
          <>
            <HeaderViewDocument />

            <div className="mt-20 w-full">
              <InvoiceDocument />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
