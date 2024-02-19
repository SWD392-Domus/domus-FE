import React from 'react'
import PackageCombo from './components/PackageCombo'
// import Suggestion from './components/Suggestion'

// interface Props = {}

const CustomizePackage:React.FC = () => {

  return (
    <div className='h-auto flex flex-col justify-center items-center'>
      <h1 className='flex justify-center items-center font-playfair text-4xl p-4'>Package Customization</h1>
      <div className='flex flex-wrap justify-around items-center gap-4 shrink'>
        <PackageCombo/>
        {/* <Suggestion/> */}
      </div>
    </div>
  )
}

export default CustomizePackage