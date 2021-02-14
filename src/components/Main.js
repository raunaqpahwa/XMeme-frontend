import { Container, Center, Flex, Spacer } from '@chakra-ui/react';
import MemeList from './MemeList';
import PostMeme from "./PostMeme";

const Main = () => {
    return (
        <Container>
            <Center>
                <Flex flexDirection='column'>
                    <PostMeme />
                    <Spacer />
                    <MemeList />
                </Flex>
            </Center>
        </Container>
    );
}

export default Main;