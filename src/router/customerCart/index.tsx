import React from 'react'
import PackageCombo from './components/PackageCombo'
import Suggestion from './components/Suggestion'

// interface Props = {}

const CustomerCart: React.FC = () => {

  return (
    <div className='h-auto flex flex-col justify-center items-center mb-20'>
      <h1 className='flex justify-center text-4xl p-4 font-semibold'>Request For Quotation</h1>
      <div className='flex flex-wrap justify-around gap-20'>
        <PackageCombo />
        <Suggestion />
      </div>
    </div>
  )
}

export default CustomerCart