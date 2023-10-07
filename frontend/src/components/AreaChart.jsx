import {React,useState,useEffect} from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  
    

const AreaChart = () => {

      const [data, setData] = useState([]);

    const [sectors, setSectors] = useState([]);
    const [selectedSector, setSelectedSector] = useState('Energy');

      
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/sectors');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSectors(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/sectors?sector=${selectedSector}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setData(data);
                // console.log(data)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedSector]);

    const handleSectorDropdownChange = (event) => {
      setSelectedSector(event.target.value);
      // console.log(event.target.value);
    };


    const filteredData = data.filter(x=>x.published_year!=null);
    const yearLabels = filteredData.map((x)=>x.published_year);
    const average_intensity = filteredData.map(x=>Number(x.average_intensity));
    const average_relevance = filteredData.map(x=>Number(x.average_relevance));
    const average_likelihood = filteredData.map(x=>Number(x.average_likelihood));

    // console.log(average_intensity,average_relevance,average_likelihood,yearLabels)
   

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Intensity, Relevance, Likelihood',
          },
        },
      };
      
    const dataset = {
        labels:yearLabels,
        datasets: [
          {
            fill: true,
            label: 'Intensity',
            data: average_intensity,
            borderColor: 'rgb(53, 235, 223)',
            backgroundColor: 'rgba(53, 235, 223, 0.1)',
          },
          {
            fill: true,
            label: 'Relevance',
            data: average_relevance ,
            borderColor: 'rgb(230, 19, 19)',
            backgroundColor: 'rgba(162, 53, 53, 0.096)',
          },
          {
            fill: true,
            label: 'Likelihood',
            data: average_likelihood,
            borderColor: 'rgb(123, 235, 53)',
            backgroundColor: 'rgba(123, 235, 53, 0.045)',
          },
        ],
      };
    

  return (
    <div className=" p-4 bg-white shadow-lg py-4 basis-2/3">
      <h2 className='text-lg text-violet-500 text-center mb-4'>Sector analysis using Intensity, Relevance and Likelihood Parameters</h2>
            <div>
                <label className='text-sm'>Sector:</label>
                <select value={selectedSector} onChange={handleSectorDropdownChange} className="border-2 border-violet-300 px-2 py-1 ml-2">
                    {sectors.map((r)=>r && <option key={r} value={r.includes("&") ? r.replace(/&/g,'%26'):r}>{r}</option>)}
                </select>
            </div>
         <Line options={options} data={dataset} />
    </div>
  );
};

export default AreaChart;
