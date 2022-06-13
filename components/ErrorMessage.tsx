import * as React from 'react'
import { ApolloError } from '@apollo/client'

/* Types */
interface Props {
  error: ApolloError
  className?: string
}

function ErrorMessage({ error, className }: Props): JSX.Element {
  if (!error) return null
  return <span className={`message error ${className}`}>{error.message}</span>
}

export default ErrorMessage
