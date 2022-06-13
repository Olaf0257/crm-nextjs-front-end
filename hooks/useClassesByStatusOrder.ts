import * as React from 'react'
import { StatusesOrder } from 'types'

function useClassesByStatusOrder(statusOrder: StatusesOrder | string) {
  const [classesByStatus, setClassesByStatus] = React.useState('')

  React.useEffect(() => {
    switch (statusOrder) {
      case StatusesOrder.CANCELLED: {
        setClassesByStatus('border-red-800')
        break
      }
      case StatusesOrder.COMPLETED: {
        setClassesByStatus('border-green-700')
        break
      }
      case StatusesOrder.PENDING: {
        setClassesByStatus('border-yellow-600')
        break
      }
    }
  }, [statusOrder])

  return { classesByStatus }
}

export default useClassesByStatusOrder
