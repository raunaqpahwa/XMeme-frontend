import { Button, Container, Flex, Input, Spacer, Text } from "@chakra-ui/react"
import axios from "axios";
import { useState } from 'react';

const PostMeme = () => {
    const [meme, setMeme] = useState({name: '', url: '', caption: ''});
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMeme({...meme, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { REACT_APP_BACKEND_URL } = process.env;
        const URL = `${REACT_APP_BACKEND_URL}/memes`;
        if (meme.url === '' || meme.name === '' || meme.caption === '') {
            setMessage('Incomplete information');
            return;
        }
        try {
            const response = await axios.post(URL, meme);
            setMessage('Meme created successfully');
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <Container>
            <Flex flexDirection='column' marginBottom='100px' borderRadius='10px' backgroundColor='rgba(164,238,238,0.1)' padding='20px'>
                <form onSubmit={handleSubmit}>
                    <Spacer height='24px' />
                    <Input placeholder='Name' name='name' onChange={handleChange} />
                    <Spacer height='10px'/>
                    <Input placeholder='Caption' name='caption' onChange={handleChange} />
                    <Spacer height='10px'/>
                    <Input placeholder='URL' name='url' onChange={handleChange} />
                    <Spacer height='10px'/>
                    <Button type='submit' backgroundColor='rgba(95,158,160, 0.8)'>Post Meme!</Button>
                    <Text>{message}</Text>
                </form>
            </Flex>
        </Container>
    );
}

export default PostMeme;