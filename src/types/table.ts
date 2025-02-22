export type Documents = {
  id: string
  name: string
  status: 'Verified' | 'Transfer' | 'Pending' | 'Rejected'
  date: string
  verifyBy: string
  action: () => void
}
