import React from 'react'
import { Link } from 'react-router-dom';

const WEBSITE_NAME: string = "Domus";


const WebsiteName : React.FC = () => {
  return (
    <Link to="/" 
    className= "w-[355px] max-[456px]:w-auto items-center justify-center flex text-white tracking-tighter font-bold text-3xl font-openSans">
        <h1 className="">{WEBSITE_NAME.toUpperCase()}</h1>
    </Link>
  )
}

export default WebsiteName