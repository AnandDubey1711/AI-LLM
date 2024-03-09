import { useState } from 'react';
import Navbar from '../components/Navbars/MainNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReactApexChart from 'react-apexcharts';

const rootStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&usqp=CAU')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  borderRadius: '0.75rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  padding: '2rem',
  textAlign: 'center',
  maxWidth: '80%', // Limiting card width
};

const API_TOKEN = "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";
async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

function Sentiment() {
  const [textInput, setTextInput] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSentimentAnalysis = async () => {
    if (textInput) {
      const result = await query({ "inputs": textInput });
      setSentimentResult(result);

      // Prepare data for the chart
      const sentimentLabels = result[0].map(item => item.label.toUpperCase());
      const sentimentScores = result[0].map(item => Math.round(item.score * 100) / 100);

      setChartOptions({
        labels: sentimentLabels,
        title: {
          text: 'Sentiment Analysis',
          align: 'center',
          style: {
            color: '#2D3748',
            fontSize: '20px',
            fontWeight: 'bold',
          }
        }
      });

      setChartSeries([{
        name: 'Score',
        data: sentimentScores
      }]);
    }
  };

  return (
    <>
      <Navbar />
      <div style={rootStyle}>
        <Card style={cardStyle}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#2D3748',
            marginBottom: '2rem',
            marginTop: '-1rem',
            paddingTop: '0.5rem',
          }}>
            Sentiment <span style={{ color: '#1E40AF' }}>Analysis</span>
          </h1>
          <CardContent>
            <textarea
              style={{
                height: "30vh",
                width: "60vh"
              }}
              placeholder="Enter text for sentiment analysis"
              value={textInput}
              onChange={handleInputChange}
            />
            <br />
            <button
              type="submit"
              onClick={handleSentimentAnalysis}
              style={{
                background: '#1E40AF',
                color: '#fff',
                padding: '0.5rem',
                marginTop: '0.5rem',
                borderRadius: '0.25rem',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              Analyze
            </button>
            {sentimentResult && (
              <div style={{ color: 'black' }}>
                <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Sentiment;
