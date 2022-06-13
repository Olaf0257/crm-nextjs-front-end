/* React */
import * as React from 'react'

/* Graphql */
import { useQuery } from '@apollo/client'
import { GET_USER_LOGGED } from 'graphql/queries'

/* Next */
import { useRouter } from 'next/router'

/* Constants */
import routes from 'constants/routes'

/* Types */
import { User } from 'types'

/* Components */
import Spinner from './Spinner'

type GetUserLogged = { getUserLogged: User }

function Header(): JSX.Element {
  // grapql queries
  const { data, loading } = useQuery<GetUserLogged>(GET_USER_LOGGED)

  // rouring
  const router = useRouter()

  // Methods
  const handleClick = () => {
    localStorage.removeItem('TOKEN')
    router.push(routes.LOGIN)
  }

  // Conditionals
  if (loading) return <Spinner />

  // Redirect
  if (!data) {
    router.push(routes.LOGIN)
    return null
  }

  const {
    getUserLogged: { first_name, last_name }
  } = data

  return (
    <header className="border-b border-blue-800 shadow-md p-5">
      <div className="flex justify-between items-center">
        <h1>
          Welcome, {first_name} {last_name}!
        </h1>
        <button onClick={handleClick} className="btn primary">
          <span className="mx-4">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Header
