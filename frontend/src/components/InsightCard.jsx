import React from 'react'
import {Link} from 'react-router-dom'

function InsightCard({title,country,region,published,url,insight,sector,topic,source,start_year,end_year,intensity,relevance,added}) {

  return (
    <div className='max-w-full flex flex-col gap-4 justify-between cursor-pointer  mx-2 px-4 md:px-12 py-8 text-sm md:text-sm bg-white shadow-md text-black border-l-4 border-red-400'>

        <div  className="flex flex-col gap-2 md:flex-row md:gap-4 text-xs">
             <p className='uppercase'><span className='text-slate-500 '>Sector: </span>{sector}</p>
             <p className='uppercase'><span className='text-slate-500 '>Topic: </span>{topic}</p>
        </div>
   
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-4 justify-between">
            <p className='uppercase tracking-wider text-xs text-red-500'>{insight}</p>
            <div className="flex justify-between flex-col gap-1 md:flex-row md:gap-4 ">
                {country!=='' && <p><span className='text-slate-500'>Country: </span>{country}</p>}
                {region!=='' && <p><span className='text-slate-500'>Region: </span>{region}</p>}
                {intensity!=='' && <p><span className='text-slate-500'>Intensity: </span>{intensity}</p>}
                {relevance!=='' && <p><span className='text-slate-500'>Relavance: </span>{relevance}</p>}
            </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 justify-between md:items-center cursor-pointer">
            <p className='text-base md:w-3/5'>{title}</p>
            <p className='text-xs text-slate-400'>Published: {published}</p>
            <p className='text-xs text-slate-400'>StartYear: {start_year}</p>
            <p className='text-xs text-slate-400'>EndYear: {end_year}</p>
            <p className='text-xs text-slate-400'>Added: {added}</p>
            <Link to={url} className="bg-teal-500 px-4 py-2 rounded-full max-w-max " >Open</Link>
        </div>
    </div>

  )
}

export default InsightCard