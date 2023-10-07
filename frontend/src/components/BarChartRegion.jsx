import {React,useState,useEffect} from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChartRegion = () => {

      const [data, setData] = useState([]);
      const [region, setRegion] = useState([]);
      const [selectedRegion, setSelectedRegion] = useState('World');
      const [selectedYear, setSelectedYear] = useState(0);

      useEffect(() => {
        const fetchRegion = async () => {
            try {
                const response = await fetch(`http://localhost:5000/regions`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRegion(data);
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };
        fetchRegion();
      }, [])
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                !selectedYear ?
                     response = await fetch(`http://localhost:5000/sector-wise-insights?region=${selectedRegion}`)
                :
                 response = await fetch(`http://localhost:5000/sector-wise-insights?region=${selectedRegion}&year=${selectedYear}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setData(data);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedRegion,selectedYear]);

    data.sort((a,b)=>b.total_insights_per_sector-a.total_insights_per_sector);
    const labels = data.map(x=>x.sector ? x.sector : 'General');
    const insightsCountPerSector = data.map(x=>x.total_insights_per_sector);

  const dataset = {
    labels: labels,
    datasets: [
      {
        label: 'Total Insights Per Sector',
        backgroundColor: 'rgba(165, 192, 75, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(85, 192, 75, 0.453)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: insightsCountPerSector,
      },
    ],
  };

  const options = {
      scales: {
            x: {
                beginAtZero: true,
                  type: 'category', 
                  title: {
                    display: true,
                    text: 'Sector', 
                  },
            },
            y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Total  Insights  Per Sector', 
                  },
                  suggestedMax: 50,   
                  suggestedMin: 0,    
                  stepSize: 2,    
            },
      },
};

const handleRegionDropdownChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleYearDropdownChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div className="px-2 md:px-8 py-4 bg-white shadow-lg">
      <h2 className='text-lg text-violet-600 text-center mb-8'>Insight Analysis of Each Sector in a Particular Region</h2>
        <div className='flex flex-col items-center gap-4 mb-8 md:flex-row md:items-center md:gap-8'>
            <div>
                <label className='text-sm mr-4'>Region:</label>
                <select value={selectedRegion} onChange={handleRegionDropdownChange} className="border-2 border-violet-300 px-2 py-1">
                    {region.map((r)=>r && <option key={r} value={r}>{r}</option>)}
                </select>
            </div>
            <div>
                <label className='text-sm mr-4'>Year</label>
                <select value={selectedYear} onChange={handleYearDropdownChange} className="border-2 border-violet-300 px-2 py-1">
                    <option value="">--Select--</option>
                    <option value='2016'>2016</option>
                    <option value='2017'>2017</option>
                    <option value='2018'>2018</option>
                </select>
            </div>
         </div>
      <Bar data={dataset} options={options} />
    </div>
  );
};

export default BarChartRegion;
