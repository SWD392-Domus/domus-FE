import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx';
const WEBSITE_NAME: string = "Domus";


const WebsiteName : React.FC = () => {
    const [isHidden, setIsHidden] = useState(false);
  return (
    <div 
    className= "relative w-[355px] items-center justify-center flex text-white tracking-tighter font-bold text-3xl font-openSans">
        <div 
        className={clsx(`h-[1px] w-[355px] bg-yellowCustom absolute bottom-[19px] right-[190px]`,
          isHidden && "hidden"
        )}
        
        />
        <h1 className="">{WEBSITE_NAME.toUpperCase()}</h1>
    </div>
  )
}

export default WebsiteName