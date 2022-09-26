import React, { useMemo } from 'react';
import { Container, MessageBox, Message, Name } from './styles';

import auth from '@react-native-firebase/auth';

export default function ChatMessages({ data }) {

    const user = auth().currentUser.toJSON();

    const isMyMessage = useMemo(() => {
        return data?.user?._id === user.uid;
    }, [data]);

 return (
   <Container>
    <MessageBox bg={ isMyMessage ? '#DCF8C5' : '#FFF' } marginLeft={ isMyMessage ? 50 : 0 } marginRight={ isMyMessage ? 0 : 50 } >
        { !isMyMessage && (
            <Name> { data?.user?.displayName } </Name>
        ) }
        <Message> { data.text } </Message>
    </MessageBox>
    
   </Container>
  );
}