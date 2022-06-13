import * as React from 'react'

/* Next */
import { useRouter } from 'next/router'

/* Components */
import { ErrorMessage, Layout } from 'components'

/* Fixtures */
import { createProduct } from 'fixtures/fileds'

/* React hook form */
import { useForm } from 'react-hook-form'

/* Graphql */
import { MutationUpdaterFn, useMutation } from '@apollo/client'
import { CREATE_NEW_PRODUCT, GET_ALL_PRODUCTS } from 'graphql/queries'

/* Constants */
import routes from 'constants/routes'

/* Types */
import { Product, GetProducts } from 'types'

/* Types */
interface Fields {
  name: string
  price: number
  stock: number
}

type CreateProduct = {
  createProduct: Product
}

function NewProduct() {
  // Routing
  const router = useRouter()

  // React hook form
  const { register, errors, handleSubmit } = useForm<Fields>({
    mode: 'onBlur'
  })

  // Update cache
  const updateCache: MutationUpdaterFn<CreateProduct> = (
    cache,
    { data: { createProduct: createdProduct } }
  ) => {
    const { getProducts: products } = cache.readQuery<GetProducts>({
      query: GET_ALL_PRODUCTS
    })

    cache.writeQuery<GetProducts>({
      query: GET_ALL_PRODUCTS,
      data: {
        getProducts: [...products, createdProduct]
      }
    })
  }

  // Mutations
  const [createNewProduct, { loading, error }] = useMutation<CreateProduct>(
    CREATE_NEW_PRODUCT,
    { update: updateCache }
  )

  // JSX Elements
  const fileds = createProduct.map((field, index) => {
    const { name, autoComplete, placeholder, rules, type, ...rest } = field
    return (
      <div key={`${name}-${index}`} className="mb-4">
        {errors[name] && (
          <span className="text-red-500 text-sm">{errors[name].message}</span>
        )}

        <input
          {...rest}
          type={type}
          className="disabled:opacity-50 outline-none mb-2 btn btn-full bg-transparent"
          placeholder={placeholder}
          name={name}
          ref={register(rules)}
          autoComplete={autoComplete}
          disabled={loading}
        />
      </div>
    )
  })

  // Handlers
  const onSubmit = async (inputs: Fields) => {
    const { name, price, stock } = inputs

    return createNewProduct({
      variables: {
        name,
        price: Number(price),
        stock: Number(stock)
      }
    })
      .then(({ data }) => {
        router.push(routes.PRODUCTS)
      })
      .catch(console.error)
  }

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">New Product</h1>
        <div className="my-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fileds}
            <ErrorMessage error={error} />

            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={loading}
              className="mt-8 btn btn-full primary disabled:opacity-50"
            >
              {loading ? 'Creating client...' : 'Create Client'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewProduct
