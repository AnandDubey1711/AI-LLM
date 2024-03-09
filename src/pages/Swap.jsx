import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import Navbar from '../components/Navbars/MainNavbar';

const Swap = () => {
  const [inputText, setInputText] = useState('');
  const [completedText, setCompletedText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.set('text', inputText);


    const options = {
      method: 'POST',
      url: 'https://simple-chatgpt-api.p.rapidapi.com/ask',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b1fad8e6e4msha6887784c780ecdp138704jsnc0fb734394f3',
        'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
      },
      data: {
        question: 'what is javascript?'
      }
    };

    try {
      const response = await axios.request(options);

      if (response.data) {
        setCompletedText(response.data);
        setError(null);
      } else {
        setError('No completion found for the input.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&usqp=CAU')", backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ maxWidth: 900 }}>
          <CardContent>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              color: '#2D3748',
              marginBottom: '2rem',
              marginTop: '-1rem',
              paddingTop: '0.5rem',
            }}>
              Text <span style={{ color: '#1E40AF' }}>Completion</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Enter text"
                variant="outlined"
                fullWidth
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>Complete</Button>
            </form>
            {completedText && (
              <div>
                <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Completed Text:</Typography>
                <Typography variant="body1">{completedText}</Typography>
              </div>
            )}
            {error && (
              <div>
                <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Error:</Typography>
                <Typography variant="body1" color="error">{error}</Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Swap;
