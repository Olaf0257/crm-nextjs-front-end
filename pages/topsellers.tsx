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
import { GET_TOP_SELLERS } from 'graphql/queries'
import { GetTopSellers } from 'types'

/************************** Main component *****************************/
function TopSellers() {
  const { data, loading, startPolling, stopPolling } = useQuery<GetTopSellers>(
    GET_TOP_SELLERS
  )

  // Effects
  React.useEffect(() => {
    startPolling(100)

    return () => stopPolling()
  }, [])

  // Conditionals
  if (loading) return <Spinner />
  const { getTopSellers } = data

  const sellersForChar = new Array(getTopSellers.length)

  getTopSellers.map((seller, index) => {
    sellersForChar[index] = {
      ...seller.seller[0],
      total: seller.total,
      totalOrders: seller.totalOrders
    }
  })

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Top Sellers</h1>
        <div className="my-8">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              width={500}
              height={500}
              data={sellersForChar}
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
