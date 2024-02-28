import React from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface Props {
    name: string;
}

const router = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "All",
      to: "/packages",
    },
  ];

const TabNavigation: React.FC<Props> = ({
    name
}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {router.map((item, index) => (
        <div className="flex justify-center items-center shrink gap-2">
         <Link key={index} to={item.to}
         className="font-inter font-thin"
         >{item.name}
         </Link>
         <IoIosArrowForward />

        </div>
      ))}
        <p className="font-inter text-xl shrink font-thin">{name}</p>
    </div>
  )
}

export default TabNavigation