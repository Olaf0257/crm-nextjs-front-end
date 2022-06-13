/* Components */
import { Layout, ProductRows, Spinner } from '@components'

/* Graphql */
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS } from 'graphql/queries'

/* Next */
import { useRouter } from 'next/router'
import Link from 'next/link'

/* Contants */
import routes from 'constants/routes'

/* Types */
import { GetProducts } from 'types'

function Orders() {
  // Queries
  const { data, loading } = useQuery<GetProducts>(GET_ALL_PRODUCTS)

  // Routing
  const router = useRouter()

  // Conditionals
  if (loading) return <Spinner />

  if (!data) {
    router.push(routes.LOGIN)
  }
  const { getProducts: products } = data
  const areThereProucts = products.length > 0

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Products</h1>
        <Link href={routes.NEW_PRODUCT}>
          <a className="btn primary inline-block mb-5">
            <span className="mx-4">New Product</span>
          </a>
        </Link>
        {areThereProucts ? (
          <div className="overflow-x-scroll">
            <table className="table p-4 dark:bg-black-800 bg-white w-full shadow-md rounded-lg border">
              <thead>
                <tr className="dark:bg-black-900 bg-gray-100">
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal dark:text-white text-black-900">
                    Name
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal dark:text-white text-black-900">
                    Stock
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal dark:text-white text-black-900">
                    Price
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal dark:text-white text-black-900">
                    Delete
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal dark:text-white text-black-900">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                <ProductRows products={products} />
              </tbody>
            </table>
          </div>
        ) : (
          <p>You don't have clients for now.</p>
        )}
      </div>
    </Layout>
  )
}

export default Orders
