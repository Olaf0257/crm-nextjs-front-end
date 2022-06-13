import * as React from 'react'

/* Next */
import Link from 'next/link'
import { useRouter } from 'next/router'

/* Constants */
import routes from 'constants/routes'

/* Fixtures */
import navigation from '../fixtures/navigation'

/* Graphql */
import { useQuery } from '@apollo/client'
import { GET_USER_LOGGED } from 'graphql/queries'

/* Components */
import { Spinner } from 'components'

/* Types */
import { User } from 'types'

/* Local types */
type getUserLogged = { getUserLogged: User }

function Sidebar() {
  const router = useRouter()
  const { pathname } = router

  // Queries
  const { data, loading } = useQuery<getUserLogged>(GET_USER_LOGGED)

  // Methods
  const handleClick = () => {
    localStorage.removeItem('TOKEN')
    router.push(routes.LOGIN)
  }

  // Conditionals
  if (loading) return <Spinner />

  const { first_name, last_name, email } = data.getUserLogged

  return (
    <aside className="relative bg-white-100 dark:bg-black-900">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="sm:w-72 lg:w-96 sm:h-screen py-4">
          <div className="mx-10 mt-10">
            <h1 className="text-blue-800  text-2xl font-bold">
              Hello, {first_name} {last_name}!
            </h1>
            <p className="text-gray-500">{email}</p>
          </div>
          <nav className="mt-10 px-6 ">
            <p className="text-gray-400 dark:text-gray-600 dark:border-gray-600 ml-2 w-full border-b pb-2 border-gray-400 mb-4 text-md font-normal">
              Pages
            </p>
            <ul>
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>
                    <a
                      className={`${
                        pathname === item.link &&
                        'bg-blue-800 text-white shadow-md'
                      } hover:text-white hover:shadow-md hover:bg-blue-800 flex items-center p-2 my-2 transition-colors duration-200 rounded-lg`}
                    >
                      <span className="mx-4 text-lg font-normal">
                        {item.name}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-400 dark:text-gray-600 dark:border-gray-600 ml-2 w-full border-b pb-2 border-gray-400 mb-4 text-md font-normal">
              Charts
            </p>
            <ul>
              <li>
                <Link href={routes.TOP_SELLERS}>
                  <a
                    className={`${
                      pathname === routes.TOP_SELLERS &&
                      'bg-blue-800 text-white shadow-md'
                    } hover:text-white hover:shadow-md hover:bg-blue-800 flex items-center p-2 my-2 transition-colors duration-200 rounded-lg`}
                  >
                    <span className="mx-4 text-lg font-normal">
                      Top sellers
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={routes.TOP_CLIENTS}>
                  <a
                    className={`${
                      pathname === routes.TOP_CLIENTS &&
                      'bg-blue-800 text-white shadow-md'
                    } hover:text-white hover:shadow-md hover:bg-blue-800 flex items-center p-2 my-2 transition-colors duration-200 rounded-lg`}
                  >
                    <span className="mx-4 text-lg font-normal">
                      Top clients
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-gray-400 dark:text-gray-600 dark:border-gray-600 ml-2 w-full border-b pb-2 border-gray-400 mb-4 text-md font-normal">
              Other
            </p>
            <ul>
              <li>
                <button
                  onClick={handleClick}
                  className={`w-full hover:text-white hover:shadow-md hover:bg-blue-800 flex items-center p-2 my-2 transition-colors duration-200 rounded-lg`}
                >
                  <span className="mx-4 text-lg font-normal">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
