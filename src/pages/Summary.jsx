import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';
import Navbar from '../components/Navbars/MainNavbar';

const SummaryGenerator = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleGenerateSummary = async () => {
        try {
            const response = await fetch('API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const data = await response.json();
            setSummary(data.summary);
        } catch (error) {
            console.error('Error generating summary:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Box
                style={{
                    backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&usqp=CAU')`, // Replace 'https://example.com/background.jpg' with the actual path to your image
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card style={{ backgroundColor: 'white' }}>
                    <CardContent>
                        <Typography variant="h4" align="center" gutterBottom>
                            <h1 style={{
                                fontSize: '2.25rem',
                                fontWeight: '700',
                                color: '#2D3748',
                                marginBottom: '2rem',
                                marginTop: '-1rem',
                                paddingTop: '0.5rem',

                            }}>
                                Summary <span style={{ color: '#1E40AF' }}>Generator</span>
                            </h1>                       </Typography>
                        <textarea
                            style={{
                                height: "30vh",
                                width: "60vh"
                            }}
                            placeholder="Enter text"
                            value={text}
                            onChange={handleInputChange}
                            margin="normal"
                            multiline
                        />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGenerateSummary}
                        >
                            Generate Summary
                        </Button>
                        {summary && (
                            <div>
                                <Typography variant="h6" gutterBottom>
                                    Generated Summary:
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {summary}
                                </Typography>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default SummaryGenerator;
