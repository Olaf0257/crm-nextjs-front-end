import * as React from 'react'

/* Components */
import { ErrorMessage, Layout } from 'components'
import {
  AddProduct,
  SelectClient,
  SelectedProductList,
  Total
} from 'components/orders'

/* Context */
import OrderContext from 'context/orders/context'
import { resetOrderForm } from 'context/orders/actions'

/* Graphql */
import { MutationUpdaterFn, useMutation } from '@apollo/client'
import { GET_MY_ORDERS, CREATE_NEW_ORDER } from 'graphql/queries'

/* Next */
import { useRouter } from 'next/router'

/* Contanst */
import routes from 'constants/routes'

/* Hooks */
import { useValidateNewOrder } from 'hooks'

/* Types */
import { GetMyOrders, Order } from 'types'

/* Local types */
type CreateOrder = { createOrder: Order }

/* Update cache on create a new order */
const updateCacheOnCreateOrder: MutationUpdaterFn<CreateOrder> = (
  cache,
  { data: { createOrder } }
) => {
  const { getMyOrders } = cache.readQuery<GetMyOrders>({ query: GET_MY_ORDERS })

  cache.writeQuery<GetMyOrders>({
    query: GET_MY_ORDERS,
    data: {
      getMyOrders: [...getMyOrders, createOrder]
    }
  })
}

/* Main Component */
function NewOrder() {
  // Context
  const { state, dispatch } = React.useContext(OrderContext)

  // Hooks
  const { isValid } = useValidateNewOrder(state)

  // Queries
  const [createOrder, { error }] = useMutation(CREATE_NEW_ORDER, {
    update: updateCacheOnCreateOrder
  })

  // Routing
  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const products = state.products.reduce((accum, current) => {
      return [...accum, { product: current.id, quantity: current.quantity }]
    }, [])

    createOrder({
      variables: {
        input: {
          products,
          total: state.total,
          client: state.client.id
        }
      }
    })
      .then(() => {
        dispatch(resetOrderForm())
        return router.push(routes.ORDERS)
      })
      .catch(console.error)
  }

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">New Order</h1>
        <div className="my-8">
          <form onSubmit={onSubmit}>
            <SelectClient />
            <AddProduct />
            <SelectedProductList />
            <Total />
            <ErrorMessage className="mt-4" error={error} />

            <button className="btn primary btn-full mt-4" disabled={!isValid}>
              <span className="mx-4">Save</span>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewOrder
