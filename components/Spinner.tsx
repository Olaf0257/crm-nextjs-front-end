import * as React from 'react'

function Spinner() {
  return (
    <div className="min-h-screen w-full dark:bg-black-900 flex justify-center items-center">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Spinner
