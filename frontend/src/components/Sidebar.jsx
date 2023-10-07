import {menuItem} from './constants.js'

const Sidebar= ()=>{

return(
    <nav className="flex flex-col">
        <div className="text-2xl font-serif text-violet-800 py-4 uppercase tracking-widest ml-4 underline underline-offset-4">LOGO</div>
        {menuItem.map((menuItem)=>
        <div className="list-none text-xs font-mono px-4 py-2 rounded-md cursor-pointer" key={menuItem.type}>
            <h5 className='mb-4 text-slate-400'>{menuItem.type}</h5>
            <Submenu submenuItem={menuItem.submenuItem} />
        </div>)}
    </nav>

)

}

export default Sidebar


const Submenu=({submenuItem})=>{


    return <ul>
        {submenuItem.map(({icon,text,submenu})=>(
            <li className='flex justify-between p-2 items-center text-[rgba(47,43,61,0.65)] hover:bg-[rgba(47,43,61,0.11)]'>
                <div className='flex gap-2 items-center '>
                    <span className='w-6 h-6'>{icon}</span>
                    <span className=''>{text}</span>
                </div>
                {submenu ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                :''}
            </li>
        ))}
    </ul>

}

