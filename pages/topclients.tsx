import * as React from 'react'

/* Components */
import { Layout, Spinner } from 'components'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

/* Graphql */
import { useQuery } from '@apollo/client'
import { GET_TOP_CLIENTS } from 'graphql/queries'
import { GetTopClients } from 'types'

/************************** Main component *****************************/
function TopSellers() {
  const { data, loading, startPolling, stopPolling } = useQuery<GetTopClients>(
    GET_TOP_CLIENTS
  )

  // Effects
  React.useEffect(() => {
    startPolling(100)

    return () => stopPolling()
  }, [])

  // Conditionals
  if (loading) return <Spinner />
  const { getTopClients } = data

  const clientsForChar = new Array(getTopClients.length)

  getTopClients.map((client, index) => {
    clientsForChar[index] = {
      ...client.client[0],
      total: client.total,
      totalOrders: client.totalOrders
    }
  })

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Top Clients</h1>
        <div className="my-8">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              width={500}
              height={500}
              data={clientsForChar}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="first_name" />
              <YAxis />
              <Tooltip labelStyle={{ color: 'black' }} />
              <Legend />
              <Bar dataKey="total" fill="rgb(30, 64, 175)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  )
}

export default TopSellers
