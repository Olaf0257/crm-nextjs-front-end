import * as React from 'react'

/* Components */
import { ErrorMessage, Layout } from '@components/index'

/* Hooks */
import { useForm } from 'react-hook-form'

/* Constants */
import routes from 'constants/routes'

/* Next */
import Link from 'next/link'
import { useRouter } from 'next/router'

/* Fixtures */
import { loginFields } from 'fixtures/fileds'

/* Apollo */
import { useMutation } from '@apollo/client'
import { LOGIN } from 'graphql/queries'

/* Types */
interface Inputs {
  email: string
  password: string
}

type Login = { login: { accessToken: string } }

function Login() {
  // Routing
  const router = useRouter()

  // Graphql
  const [logIn, { loading, error }] = useMutation<Login>(LOGIN)

  // React-hook-form
  const { register, handleSubmit, errors, clearErrors } = useForm<Inputs>({
    mode: 'onBlur'
  })

  /* Methods */
  const onSubmit = async (e: Inputs): Promise<void> => {
    clearErrors()

    return logIn({
      variables: {
        email: e.email,
        password: e.password
      }
    })
      .then(({ data }) => {
        // Guardar en el local storage
        const { accessToken } = data.login

        if (!accessToken) throw new Error('Missing access token')
        localStorage.setItem('TOKEN', accessToken)
      })
      .then(() => {
        setTimeout(() => {
          router.push(routes.HOME)
        }, 100)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Let's go! Log in.</h1>
      <h3 className="text-xl">
        Welcome back. <br /> You've been missed!
      </h3>
      <div className="my-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginFields.map((field, index) => {
            const { name, type, autoComplete, placeholder, rules } = field
            return (
              <div key={`${name}-${index}`}>
                {errors[name] && (
                  <span className="text-red-500 text-sm">
                    {errors[name].message}
                  </span>
                )}
                <input
                  disabled={loading}
                  type={type}
                  className={`disabled:opacity-50 outline-none mb-2 btn btn-full bg-transparent ${
                    errors[name] ? 'border-red-500' : ''
                  }`}
                  placeholder={placeholder}
                  name={name}
                  ref={register(rules)}
                  autoComplete={autoComplete}
                />
              </div>
            )
          })}

          <ErrorMessage error={error} />
          <p className="mt-24 mb-4 text-center text-gray-400">
            Don't have an account?{' '}
            <Link href={routes.SIGNUP}>
              <a className="dark:text-white-100 font-semibold">Register</a>
            </Link>
          </p>

          <button
            disabled={loading}
            type="submit"
            className="primary btn btn-full disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
