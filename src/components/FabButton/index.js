import React from 'react';

import { Button, ButtonText } from './styles';

import { useNavigation } from '@react-navigation/native';

export default function FabButton({ setVisibleModal, userStatus }) {
    const navigation = useNavigation();
 return (
   <Button
    activeOpacity={ 0.9 }
    onPress={ () => userStatus ? setVisibleModal() : navigation.navigate('Login') }
   >
    <ButtonText bg='#000' > + </ButtonText>
   </Button>
  );
}