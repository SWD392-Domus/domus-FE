import React from 'react'

const WEBSITE_NAME: string = "Domus";


const WebsiteName : React.FC = () => {
  return (
    <div 
    className= "w-[355px] max-[456px]:w-auto items-center justify-center flex text-white tracking-tighter font-bold text-3xl font-openSans">
        <h1 className="">{WEBSITE_NAME.toUpperCase()}</h1>
    </div>
  )
}

export default WebsiteName