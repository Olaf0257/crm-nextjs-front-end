import * as React from 'react'

/* Components */
import { Layout, ErrorMessage } from 'components'

/* Constants */
import routes from 'constants/routes'

/* Fixtures */
import { signupFields } from 'fixtures/fileds'

/* Next */
import Link from 'next/link'
import { useRouter } from 'next/router'

/* Hooks */
import { useForm } from 'react-hook-form'

/* Graphql */
import { useMutation } from '@apollo/client'
import { CREATE_NEW_USER } from 'graphql/queries'

/* Types */
interface Inputs {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
}

function Signup() {
  // States
  const router = useRouter()

  // React-hook-form
  const {
    register,
    handleSubmit,
    clearErrors,
    errors,
    setError
  } = useForm<Inputs>({ mode: 'onBlur' })
  const [createNewUser, { loading, error }] = useMutation(CREATE_NEW_USER)

  /* Methods */
  const onSubmit = async (inputs: Inputs): Promise<void> => {
    clearErrors()
    const { confirm_password, password, email, first_name, last_name } = inputs

    if (confirm_password !== password) {
      setError('confirm_password', {
        message: 'The passwords are not the same.',
        shouldFocus: true
      })

      return null
    }

    return createNewUser({
      variables: {
        input: {
          first_name,
          last_name,
          email,
          password
        }
      }
    })
      .then(() => {
        router.push(routes.LOGIN)
      })
      .catch(console.error)
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Let's sign you in.</h1>
      <h3 className="text-xl">Welcome to our house!</h3>
      <div className="my-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {signupFields.map((field, index) => {
            const { name, autoComplete, rules, type, placeholder } = field
            return (
              <div key={`${name}-${index}`}>
                {errors[name] && (
                  <span className="text-red-500 text-sm">
                    {errors[name].message}
                  </span>
                )}
                <input
                  type={type}
                  disabled={loading}
                  className={`disabled:opacity-50 outline-none btn btn-full mb-2 bg-transparent ${
                    errors[name] ? 'border-red-500' : ''
                  }`}
                  placeholder={placeholder}
                  name={name}
                  autoComplete={autoComplete}
                  ref={register(rules)}
                />
              </div>
            )
          })}
          <ErrorMessage error={error} />

          <p className="mt-8 mb-4 text-center text-gray-400">
            I already have an{' '}
            <Link href={routes.LOGIN}>
              <a className="dark:text-white-100 font-semibold">account</a>
            </Link>
            !
          </p>
          <button
            disabled={loading}
            className="primary btn btn-full disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign up'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Signup
