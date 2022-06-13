import { StatusesOrder } from 'types'

interface StatusOptions {
  value: StatusesOrder
  label: string
}

const statusOptions: StatusOptions[] = [
  {
    value: StatusesOrder.COMPLETED,
    label: 'Completed'
  },
  {
    label: 'Cancelled',
    value: StatusesOrder.CANCELLED
  },
  {
    label: 'Pending',
    value: StatusesOrder.PENDING
  }
]

export default statusOptions
