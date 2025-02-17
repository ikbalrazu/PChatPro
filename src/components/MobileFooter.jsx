import React from 'react'
import { useRoutes } from 'react-router-dom'
import Conversation from './conversation/Conversation';

const MobileFooter = () => {
    // const routes = useRoutes();
    const {isOpen} = Conversation();

    if(isOpen){
        return null;
    }

  return (
    <div 
    className="
    fixed 
    justify-between 
    w-full 
    bottom-0 
    z-40 
    flex 
    items-center 
    bg-white 
    border-t-[1px] 
    lg:hidden
    md:hidden
    "
    >
      <h1>item1</h1>
      <h1>item2</h1>
    {/* {routes.map((route)=>(
        <MobileItems
        key={route.href}
        href={route.href}
        active={route.active}
        icon={route.icon}
        onClick = {route.onClick}
        >

        </MobileItems>
    ))} */}
    </div>
  )
}

export default MobileFooter