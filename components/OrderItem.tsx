import * as React from 'react'

/* Types */
import { GetMyOrders, Order, StatusesOrder } from 'types'

/* Fixtures */
import statusOptions from 'fixtures/statusOptions'

/* Utils */
import { formatedPrice } from 'utils'

/* Hooks */
import { useClassesByStatusOrder } from 'hooks'

/* Swal */
import Swal, { SweetAlertOptions } from 'sweetalert2'

/* Graphql */
import { MutationUpdaterFn, useMutation } from '@apollo/client'
import {
  GET_MY_ORDERS,
  UPDATE_ORDER_BY_ID,
  DELETE_ORDER_BY_ID
} from 'graphql/queries'

/* Local Types */
type Props = Partial<Order>
type ChangeSelect = React.ChangeEvent<HTMLSelectElement>
type UpdateOrderById = {
  updateOrderById: {
    status: StatusesOrder
    id: string
  }
}

type DeleteOrderById = { deleteOrderById: { id: string } }

/* Update cachen on delete a order */
const updateCacheOnDeleteOrder: MutationUpdaterFn<DeleteOrderById> = (
  cache,
  { data: { deleteOrderById } }
) => {
  const { getMyOrders } = cache.readQuery<GetMyOrders>({ query: GET_MY_ORDERS })

  cache.writeQuery<GetMyOrders>({
    query: GET_MY_ORDERS,
    data: {
      getMyOrders: [
        ...getMyOrders.filter((order) => order.id !== deleteOrderById.id)
      ]
    }
  })
}

/************************ Main Component *************************/
function OrderItem({
  client,
  products,
  status,
  total,
  id
}: Props): JSX.Element {
  // States
  const [statusOrder, setStatusOrder] = React.useState<string>(status)

  // Hooks
  const { classesByStatus } = useClassesByStatusOrder(statusOrder)

  // Mutations
  const [updateOrderById] = useMutation<UpdateOrderById>(UPDATE_ORDER_BY_ID)

  const [deleteOrderById] = useMutation<DeleteOrderById>(DELETE_ORDER_BY_ID, {
    update: updateCacheOnDeleteOrder
  })

  // Destructuring
  const { first_name, last_name, email, phone_number } = client

  // Methods
  const onChangeStatus = (e: ChangeSelect): void => {
    const newStatus = e.target.value

    if (newStatus === statusOrder) return

    updateOrderById({
      variables: {
        input: {
          status: newStatus
        },
        id
      }
    })
      .then(({ data }) => {
        setStatusOrder(data.updateOrderById.status)
      })
      .catch(console.error)
  }

  const onDeleteOrder = (): void => {
    const options: SweetAlertOptions = {
      title: 'Are you sure?',
      icon: 'warning',
      text: `You will delete this order`,
      showCancelButton: true,
      cancelButtonColor: 'rgb(239, 68, 68)',
      confirmButtonColor: 'rgb(16, 185, 129)',
      iconColor: 'rgb(239, 68, 68)',
      background: 'rgb(242, 242, 242)',
      confirmButtonText: 'Delete'
    }

    Swal.fire(options)
      .then(({ isConfirmed }) => {
        if (!isConfirmed) return

        deleteOrderById({ variables: { id } }).then(() => {
          const options: SweetAlertOptions = {
            title: 'Deleted!',
            text: `This order has been deleted.`,
            icon: 'success',
            iconColor: 'rgb(16, 185, 129)'
          }
          Swal.fire(options)
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <li
      className={`p-4 w-full bg-black-900 mb-2 rounded-lg border-t ${classesByStatus}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <h2 className="text-2xl font-semibold">
            <span className="font-light">Client: </span>
            {first_name} {last_name}
          </h2>
          <div className="my-4">
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-2">{email}</span>
            </p>

            {phone_number && (
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="ml-2">{phone_number}</span>
              </p>
            )}
          </div>

          <select
            onChange={onChangeStatus}
            className="btn primary mt-4"
            value={statusOrder}
          >
            {statusOptions.map((option) => {
              return (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              )
            })}
          </select>
        </div>
        <div className="">
          <h3 className="font-semibold">Summary:</h3>
          <div className="text-gray-400">
            {products.map((product, index) => {
              return (
                <div className="mb-2" key={`${product.product.id}${index}`}>
                  <p>Product: {product.product.name}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              )
            })}
          </div>

          <p className="mt-4 font-semibold">
            Total a pagar:
            <span className="font-light"> {formatedPrice(total)}</span>
          </p>

          <button onClick={onDeleteOrder} className="btn error mt-4">
            <span className="px-4">DELETE</span>
          </button>
        </div>
      </div>
    </li>
  )
}

export default OrderItem
