import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function Search(){
    return(
        <View style={styles.container}>
            <Text>Página de procura</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})