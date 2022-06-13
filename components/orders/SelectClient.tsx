import * as React from 'react'

/* Components */
import Select, { Styles } from 'react-select'

/* Graphql */
import { useQuery } from '@apollo/client'
import { GET_MY_CLIENTS } from 'graphql/queries'

/* Types */
import { Client, GetMyClients } from 'types'

/* Context */
import OrderContext from 'context/orders/context'
import { selectClient } from 'context/orders/actions'

// Types
type CustomStyles = Partial<Styles<Partial<Client>, false>>

// Styles
const customStyles: CustomStyles = {
  control: function (provided) {
    return {
      ...provided,
      backgroundColor: '#1f1f1f'
    }
  },
  option: function (base) {
    return {
      ...base,
      backgroundColor: '#1f1f1f'
    }
  },
  menu: function (base) {
    return {
      ...base,
      backgroundColor: '#1f1f1f'
    }
  },
  singleValue: function (base) {
    return {
      ...base,
      color: 'white'
    }
  }
}

function SelectClient(): JSX.Element {
  // Context
  const { dispatch } = React.useContext(OrderContext)

  // Queries
  const { data } = useQuery<GetMyClients>(GET_MY_CLIENTS)

  // Methods
  const onChangeClient = (client: Client): void => {
    dispatch(selectClient(client))
  }

  const clients = data?.getMyClients

  return (
    <React.Fragment>
      <Select
        className="mb-4"
        onChange={onChangeClient}
        getOptionLabel={(client) => `${client.first_name} ${client.last_name}`}
        getOptionValue={(client) => client.id}
        styles={customStyles}
        options={clients}
        placeholder="Select the client"
        noOptionsMessage={() => 'Client not found'}
      />
    </React.Fragment>
  )
}

export default SelectClient
