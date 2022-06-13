/* Components */
import * as React from 'react'

/* Components */
import { ClientRows, Layout, Spinner } from '@components'

/* Next */
import { useRouter } from 'next/router'
import Link from 'next/link'

/* Apollo */
import { useQuery } from '@apollo/client'
import { GET_MY_CLIENTS } from 'graphql/queries'

/* Contants */
import routes from 'constants/routes'

/* Types */
import { GetMyClients } from 'types'

function Home(): JSX.Element {
  // Queries
  const { data, loading } = useQuery<GetMyClients>(GET_MY_CLIENTS)

  // Routing
  const router = useRouter()

  // Conditionals
  if (loading) return <Spinner />

  // Redirect
  if (!data) {
    router.push(routes.LOGIN)
    return null
  }

  //
  const { getMyClients: clients } = data
  const areThereClients = clients.length > 0

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Clients</h1>
        <Link href={routes.NEW_CLIENT}>
          <a className="btn primary inline-block mb-5">
            <span className="mx-4">New Client</span>
          </a>
        </Link>
        {areThereClients ? (
          <div className="overflow-x-scroll">
            <table className="table p-4 dark:bg-black-800 bg-white w-full shadow-md rounded-lg border">
              <thead>
                <tr className="dark:bg-black-900 bg-gray-100">
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal dark:text-white text-black-900">
                    Fullname
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal dark:text-white text-black-900">
                    Company
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal dark:text-white text-black-900">
                    Email
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
                <ClientRows clients={clients} />
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

export default Home
