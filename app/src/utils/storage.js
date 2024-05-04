import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error) {
        console.error(`Houve um erro ao armazenar a informação ${error}`)
    }
};

export const _retrieveData = async (key) => {
    try {
        const token = await AsyncStorage.getItem(key);
        return token
    } catch (error) {
        console.error(`Houve um erro ao buscar uma informação`)
    }
};

