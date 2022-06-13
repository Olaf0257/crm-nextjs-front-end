import * as React from 'react'

/* Components */
import { ClientRow } from '.'

/* Types */
import { Client } from 'types'
interface Props {
  clients: Client[]
}

function ClientRows({ clients }: Props): JSX.Element {
  return (
    <React.Fragment>
      {clients.map((client) => {
        const { id, first_name, last_name, company, email } = client
        return (
          <ClientRow
            key={id}
            id={id}
            first_name={first_name}
            last_name={last_name}
            company={company}
            email={email}
          />
        )
      })}
    </React.Fragment>
  )
}

export default ClientRows
