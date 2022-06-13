import * as React from 'react'

/* NEXT */
import Link from 'next/link'
import { useRouter } from 'next/router'

/* COMPONENTS */
import { Spinner, Layout, OrderList } from 'components'

/* Constants */
import routes from 'constants/routes'

/* Graphql */
import { useQuery } from '@apollo/client'
import { GET_MY_ORDERS } from 'graphql/queries'

/* Types */
import { GetMyOrders } from 'types'

function Orders(): JSX.Element {
  // Queries
  const { data, loading } = useQuery<GetMyOrders>(GET_MY_ORDERS)

  console.log(data)

  // Routing
  const router = useRouter()

  // Conditionals
  if (loading) return <Spinner />
  if (!data) {
    router.push(routes.HOME)
    return null
  }

  const { getMyOrders } = data

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Orders</h1>
        <Link href={routes.NEW_ORDER}>
          <a className="btn primary inline-block mb-5">
            <span className="mx-4">New Order</span>
          </a>
        </Link>

        <OrderList orders={getMyOrders} />
      </div>
    </Layout>
  )
}

export default Orders
