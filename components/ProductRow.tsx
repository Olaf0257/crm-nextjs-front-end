import * as React from 'react'

/* Components */
import { Edit, Trash } from './icons'

/* Swal */
import Swal, { SweetAlertOptions } from 'sweetalert2'

/* Graphql */
import { MutationUpdaterFn, useMutation } from '@apollo/client'
import { DELETE_PRODUCT_BY_ID, GET_ALL_PRODUCTS } from 'graphql/queries'

/* Types */
import { GetProducts, Product } from 'types'

/* Next */
import { useRouter } from 'next/router'

/* Contants */
import routes from 'constants/routes'

/* Utils */
import { formatedPrice } from 'utils'

/* Queries */
type DeleteClientById = { deleteProductById: Product }

function ProductRow({ name, stock, price, id }: Partial<Product>) {
  // Routing
  const router = useRouter()

  // clean cache on delete product
  const updateCacheOnDelete: MutationUpdaterFn<DeleteClientById> = (cache) => {
    const { getProducts: products } = cache.readQuery<GetProducts>({
      query: GET_ALL_PRODUCTS
    })

    cache.writeQuery<GetProducts>({
      query: GET_ALL_PRODUCTS,
      data: {
        getProducts: products.filter((client) => {
          return client.id !== id
        })
      }
    })
  }

  // Mutations
  const [deleteProductById] = useMutation(DELETE_PRODUCT_BY_ID, {
    update: updateCacheOnDelete
  })

  // Handle methods
  const handleDelete = () => {
    const options: SweetAlertOptions = {
      title: 'Are you sure?',
      icon: 'warning',
      text: `You will delete: ${name}`,
      showCancelButton: true,
      cancelButtonColor: 'rgb(239, 68, 68)',
      confirmButtonColor: 'rgb(16, 185, 129)',
      iconColor: 'rgb(239, 68, 68)',
      background: 'rgb(242, 242, 242)',
      confirmButtonText: 'Delete'
    }

    Swal.fire(options)
      .then(({ isConfirmed }) => {
        if (!isConfirmed) return

        deleteProductById({ variables: { id } }).then(() => {
          const options: SweetAlertOptions = {
            title: 'Deleted!',
            text: `This product has been deleted.`,
            icon: 'success',
            iconColor: 'rgb(16, 185, 129)'
          }
          Swal.fire(options)
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleEdit = () => {
    router.push({
      pathname: routes.EDIT_PRODUCT,
      query: { id }
    })
  }

  return (
    <tr>
      <td className="border p-4 dark:border-dark-5">{name}</td>
      <td className="border p-4 dark:border-dark-5 text-center">{stock}</td>
      <td className="border p-4 dark:border-dark-5 text-center">
        {formatedPrice(price)}
      </td>
      <td className="border p-4 dark:border-dark-5">
        <button
          onClick={handleDelete}
          className="w-full text-red-500 flex items-center justify-center"
        >
          <Trash className="w-6" />
        </button>
      </td>
      <td className="border p-4 dark:border-dark-5">
        <button
          onClick={handleEdit}
          className="w-full text-green-500 flex items-center justify-center"
        >
          <Edit className="w-6" />
        </button>
      </td>
    </tr>
  )
}

export default ProductRow
