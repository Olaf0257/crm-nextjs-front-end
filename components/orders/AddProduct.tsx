import * as React from 'react'

/* Components */
import Select, { Styles } from 'react-select'

/* Graphql */
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS } from 'graphql/queries'

/* Types */
import { GetProducts, Product, ProductWithQuantity } from 'types'

/* Context */
import OrderContext from 'context/orders/context'
import { addProduct, updateTotal } from 'context/orders/actions'

// Types
type CustomStyles = Partial<Styles<Partial<Product>, false>>

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

/* Queries */

function AddProduct(): JSX.Element {
  // Context
  const { dispatch } = React.useContext(OrderContext)

  // Queries
  const { data } = useQuery<GetProducts>(GET_ALL_PRODUCTS)

  // Methods
  const onChangeProducts = (products: ProductWithQuantity[]): void => {
    dispatch(addProduct(products))
    dispatch(updateTotal())
  }

  const products = data?.getProducts

  return (
    <React.Fragment>
      <Select
        className="mb-4"
        isMulti={true}
        onChange={onChangeProducts}
        getOptionLabel={(product) => `${product.name} (${product.stock})`}
        getOptionValue={(product) => product.id}
        styles={customStyles}
        options={products}
        placeholder="Select the product"
        noOptionsMessage={({ inputValue }) => `${inputValue} not found.`}
      />
    </React.Fragment>
  )
}

export default AddProduct
