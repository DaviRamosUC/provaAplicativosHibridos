import { AsyncStorage } from 'react-native';

export const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key,
            value,
        );
    } catch (error) {
        console.error(`Houve um erro ao armazenar a informação`)
    }
};

export const _retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            console.log(value);
        }
    } catch (error) {
        console.error(`Houve um erro ao buscar uma informação`)
    }
};  

 