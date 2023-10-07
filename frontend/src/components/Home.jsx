import BarChart from './BarChart'
import BarChartRegion from './BarChartRegion'
import PieChart from './PieChart'
import Sidebar from './Sidebar'
import AreaChart from './AreaChart'
const Home = ()=>{
return(
    <div className='bg-slate-50 w-[100vw] relative font-display'>
        <main className="flex gap-2" >
            
            <div className="hidden md:block md:fixed md:top-0 md:left-0 md:w-[250px] max-h-screen bg-[#ffffff] overflow-x-auto | sidebar ">
                <Sidebar />
            </div>
        
            <div className='flex flex-col gap-4 w-[100%] md:basis-4/5 md:ml-[265px]'>
                <h1 className="text-2xl md:text-2xl text-center text-violet-800 pt-4 leading-none uppercase tracking-wider">Dashboard <span className="text-red-400">(Assignment)</span></h1>
                <BarChart />
                <div className="flex flex-col gap-4 md:flex-row">
                    <AreaChart />
                    <PieChart />
                </div>
                <BarChartRegion />
            </div>
        </main>
    </div >

)
}

export default Home