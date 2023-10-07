import {React,useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import InsightCard from './InsightCard'
function Insights() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get('source');
    const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:5000/insights?source=${source}`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }

              const data = await response.json();
              console.log(data);
              setData(data);



          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, [source]);

  return (
    <>
        <h1 className='text-xl md:text-4xl text-center my-8 p-8 '>Insights published by <span className='text-red-400'>{source} ({data.length})</span></h1>
        <div className='flex flex-col gap-4 md:p-8 py-4 px-2 bg-slate-100'>
            {data.map((insight)=>{
                return <InsightCard {...insight}/>
            })}
        </div>      
    </>
  )
}

export default Insights