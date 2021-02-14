import { Image, Input, Text, Flex, Button, Spacer } from "@chakra-ui/react";
import axios from 'axios';
import { useState } from "react";

const MemeListItem = ({id, name, caption, url}) => {

    const [isEdit, setIsEdit] = useState(false);
    const [updateMeme, setUpdateMeme] = useState({url: '', caption: ''});

    const handleClickEdit = (event) => {
        event.preventDefault();
        setIsEdit(true);
    }

    const handleChange = (event) => {
        setUpdateMeme({...updateMeme, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { REACT_APP_BACKEND_URL } = process.env;
        const URL = `${REACT_APP_BACKEND_URL}/memes/${id}`;
        try {
            const response = await axios.patch(URL, {
                name: name,
                url: updateMeme.url === '' ? url : updateMeme.url,
                caption: updateMeme.caption === '' ? caption : updateMeme.caption
            });
        } catch (error) {
            console.log(error.message);
        }
        setIsEdit(false);
    }

    return (
        <form>
            <Flex flexDirection='column' marginBottom='30px' borderRadius='10px' backgroundColor='rgba(164,238,238,0.1)' padding='20px'>
                <Text>{name}</Text>
                <Spacer />
                {isEdit ? <Input placeholder='Caption' name='caption' onChange={handleChange} /> : <Text>{caption}</Text>}
                {isEdit ? <Input placeholder='URL' name='url' onChange={handleChange}/>  : <Image src={url} alt='Image of a meme' boxSize='400px'marginBottom='2px'/> }
                {isEdit ? <Button onClick={handleSubmit} type='submit'>Change Meme</Button> : <Button onClick={handleClickEdit}>Edit Meme</Button>}
            </Flex>
        </form>
    );
}

export default MemeListItem;