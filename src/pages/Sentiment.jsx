import { useState } from 'react';
import {createTheme} from "@mui/material/styles";
import Navbar from '../components/Navbars/MainNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const useStyles = createTheme((theme)=>({
  root: {
    backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&usqp=CAU')`, // Replace 'path_to_your_image.jpg' with the actual path to your image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensures the background covers the entire viewport height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  card: {
    background: '#fff',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

    backgroundColor: 'white',
    padding: theme.spacing(5),
    textAlign: 'center',
  },
}));

const API_TOKEN = "Token_Api";
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
  // const classes = useStyles(); // Apply styles
  const [textInput, setTextInput] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSentimentAnalysis = async () => {
    if (textInput) {
      const result = await query({ "inputs": textInput });
      setSentimentResult(result);
    }
  };

  return (
    <>
      <Navbar />
      <div className={useStyles.root}>
        <Card className={useStyles.card}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#2D3748',
            marginBottom: '2rem',
            marginTop: '-1rem',
            paddingTop: '0.5rem',

          }}>
            Sentiment <span style={{ color: '#1E40AF' }}>Analysis</span>
          </h1>          <CardContent>
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
              <div>
                <h2>Sentiment Score</h2>
                {/* Rendering sentiment scores */}
                {/* You can render a graph here using a charting library */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Sentiment;
