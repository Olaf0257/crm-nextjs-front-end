import * as React from 'react'

/* Components */
import { ErrorMessage, Layout, Spinner } from 'components'

/* Next */
import { useRouter } from 'next/router'

/* React hook form */
import { useForm } from 'react-hook-form'

/* Swal */
import Swal, { SweetAlertOptions } from 'sweetalert2'

/* Fixtures */
import { createClientFields } from 'fixtures/fileds'

/* Graphql */
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_CLIENT_BY_ID, GET_CLIENT_BY_ID } from 'graphql/queries'

/* Constants */
import routes from 'constants/routes'

/* Types */
import { Client } from 'types'

/* Types */
type GetClientById = { getClientById: Client }
type UpdateClientById = { updateClientById: Client }

function EditClient() {
  // Routing
  const router = useRouter()
  const { id } = router.query

  // Mutations
  const [
    updateClient,
    { loading: editingClient }
  ] = useMutation<UpdateClientById>(UPDATE_CLIENT_BY_ID)

  // Queries
  const { data, error, loading: gettingData } = useQuery<GetClientById>(
    GET_CLIENT_BY_ID,
    {
      variables: { id }
    }
  )

  // Methods
  const onSubmit = async (inputs: Client): Promise<void> => {
    const { first_name, last_name, phone_number, company, email } = inputs

    return await updateClient({
      variables: {
        id,
        input: {
          first_name,
          last_name,
          phone_number,
          company,
          email
        }
      }
    })
      .then(({ data }) => {
        return router.push(routes.HOME)
      })
      .then(() => {
        const options: SweetAlertOptions = {
          title: 'Updated!',
          icon: 'success',
          text: `Your client was updated successfully.`,
          confirmButtonColor: 'rgb(16, 185, 129)',
          iconColor: 'rgb(16, 185, 129)',
          background: 'rgb(242, 242, 242)',
          confirmButtonText: 'Okay'
        }
        Swal.fire(options)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // react hook form
  const { handleSubmit, register, errors } = useForm<Client>({
    mode: 'onBlur'
  })

  // Condifionals
  if (gettingData) return <Spinner />

  if (!data && !data.getClientById) {
    router.push(routes.NEW_CLIENT)
    return null
  }

  // JSX
  const fields = createClientFields.map((field, index) => {
    const { name, autoComplete, placeholder, rules, type } = field
    return (
      <div key={`${name}-${index}`} className="mb-4">
        {errors[name] && (
          <span className="text-red-500 text-sm">{errors[name].message}</span>
        )}

        <input
          type={type}
          className="disabled:opacity-50 outline-none mb-2 btn btn-full bg-transparent"
          placeholder={placeholder}
          name={name}
          ref={register(rules)}
          autoComplete={autoComplete}
          disabled={editingClient}
          defaultValue={data.getClientById[name] || ''}
        />
      </div>
    )
  })

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">Edit Client</h1>

        <div className="my-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields}
            <ErrorMessage error={error} />

            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={editingClient}
              className="mt-8 btn btn-full primary disabled:opacity-50"
            >
              {editingClient ? 'Creating client...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default EditClient
