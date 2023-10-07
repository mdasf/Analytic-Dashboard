import {React,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {

      const [data, setData] = useState([]);
      const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/insights-per-source');
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
    }, []);


    // const totalInsights = data.reduce((acc,o)=>acc+o.total_insights_per_source,0);
    let slicedData = data.slice(0,10);
    // const others = {source:'others',total_insights_per_source:totalInsights - slicedData.reduce((acc,o)=>acc+o.total_insights_per_source,0)};
    // slicedData.push(others);

    const insightsPerSource = slicedData.map(item=>(item.total_insights_per_source));///totalInsights)*100
    const labels = slicedData.map(item=>item.source);

     const dataset = {
      labels: labels,
      datasets: [
        {
          label: '# of insights',
          data: insightsPerSource,
          backgroundColor: ['rgba(255, 229, 229, 0.562)', 'rgba(250, 203, 234, 0.444)', 'rgba(190, 255, 247, 0.435)','rgba(120, 214, 198, 0.427)','rgba(33, 156, 144, 0.441)','rgba(120, 214, 198, 0.518)','rgba(255, 105, 105, 0.566)','rgba(121, 172, 120, 0.526)','rgba(236, 238, 129, 0.524)','rgba(211, 222, 50, 0.541)'],
             borderColor: [
            '#FFE5E5', '#FACBEA', '#BEFFF7','#78D6C6','#219C90','#78D6C6','#FF6969','#79AC78','#ECEE81','#D2DE32'
          ],
          borderWidth: 1,
        },
      ],
    };

    const handlePieClick = (event, elements) => {

        if (elements.length > 0) {
        console.log(elements);
          const clickedIndex = elements[0].index;
          const label = dataset.labels[clickedIndex];
          navigate(`/insights?source=${label}`);
        }
      };
//md:w-[65%] w-[70%] sm:w-[30%] py-4 sm:basis-1/3
  return (
    <div className="bg-white shadow-lg w-full xl:basis-1/3 mx-auto ">
      <h2 className='text-lg text-violet-500 text-center'>Top 10 Insights Contributor <span className='text-xs block'>(Click to see insights)</span> </h2>
      <div className="w-[70%]  md:w-full mx-auto">
        <Pie className='hover:cursor-pointer mx-auto' data={dataset}  options={{
            onClick: handlePieClick,
          }}  />
      </div>
    </div>
  );
};

export default PieChart;
