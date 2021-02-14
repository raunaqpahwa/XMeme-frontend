import { Spinner, Heading, Flex, Button, Container, Spacer, Center } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import MemeListItem from './MemeListItem';

const MemeList = () => {
    const [memeList, setMemeList] = useState([]);
    const [hasError, setHasError] = useState(false);

    const getMemes = async () => {
        const { REACT_APP_BACKEND_URL } = process.env;
        const URL = `${REACT_APP_BACKEND_URL}/memes`;
        try {
            const response = await axios.get(URL);
            setMemeList(response.data);
        } catch (error) {
            setHasError(true);
        }
    }

    useEffect(() => {
        getMemes();
    });

    return (
        <Container>
            <Heading margin='10px'>Latest Memes</Heading>
            <Button onClick={getMemes} marginBottom='30px'>Click to fetch latest Memes</Button>
            <Spacer />
            {
                hasError ?
                <Spinner /> : 
                <Flex flexDirection='column'>
                    {memeList.map(meme => <MemeListItem key={meme.id} {...meme} />)}
                </Flex>
            }
        </Container>
        
    );

}

export default MemeList;