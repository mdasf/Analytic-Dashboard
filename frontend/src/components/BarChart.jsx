import {React,useState,useEffect} from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const [data, setData] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedSector, setSelectedSector] = useState('Energy');
    const [selectedTopic, setSelectedTopic] = useState('oil');

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:5000/sectors`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setSectors(data);
          }   catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      fetchData();
    }, [])

    

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:5000/topics?sector=${selectedSector}`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setTopics(data);
              setSelectedTopic(()=>data[0])
          } catch (error) {
              console.error('Error fetching regions:', error);
      }
      };
      fetchData();
    }, [selectedSector])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                !selectedTopic ?
                     response = await fetch(`http://localhost:5000/source-relevance?sector=${selectedSector}`)
                :
                 response = await fetch(`http://localhost:5000/source-relevance?sector=${selectedSector}&topic=${selectedTopic}`);
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
    }, [selectedSector,selectedTopic]);

    const handleSectorDropdownChange = (event) => {
      setSelectedSector(event.target.value);
    };
  
    const handleTopicDropdownChange = (event) => {
      setSelectedTopic(event.target.value);
    };

    let sortedData = data.sort((a,b)=>b.relevance-a.relevance);
    const labels = sortedData.map(x=>x.source);
    const relevance = sortedData.map(x=>x.relevance);

  const dataset = {
      labels: labels,
      datasets: [
        {
          label: 'Relavance',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: relevance,
        },
      ],
  };

  const options = {
      scales: {
            x: {
                  type: 'category', 
                  title: {
                    display: true,
                    text: 'Source', 
                  },
            },
            y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Relavance', 
                  },
            },
      },
};

  return (
    <div className="p-4 bg-white shadow-lg grow-1">
      <h2 className='text-lg text-violet-600 text-center mb-8'>Source-Relevance Analysis for Each Sector and Topic</h2>
      <div className='flex flex-col items-center gap-4 mb-8 md:flex-row md:items-center md:gap-8'>
            <div>
                <label className='text-sm mr-2'>Sector:</label  >
                <select value={selectedSector} onChange={handleSectorDropdownChange} className="border-2 border-violet-300 px-2 py-1">
                    {sectors.map((r)=>r && <option key={r} value={r.includes("&") ? r.replace(/&/g,'%26'):r}>{r}</option>)}
                </select>
            </div>
            <div>
                <label className='text-sm mr-2'>Topic:</label>
                <select value={selectedTopic} onChange={handleTopicDropdownChange} className="border-2 border-violet-300 px-2 py-1">
                   {topics.length>0 ?
                   topics.map((r)=>r && <option value={r} key={r}>{r}</option>)
                   : <option>-No Topic-</option>
                   }
                </select>
            </div>
        </div>
      <Bar data={dataset} options={options} />
    </div>
  );
};

export default BarChart;
