import axios from "axios"
import { _storeData, _retrieveData } from "../utils/storage"

let baseUrl = 'http://192.168.1.120:3000'
export const handleLogin = async (email, senha, navigation) => {
    navigation.navigate('Dashboard')
    // axios({
    //     method: 'POST',
    //     url: `${baseUrl}/login`,
    //     data: {
    //         email,
    //         senha
    //     }
    // }).then((response)=> { 
    //     let token = response.data.token
    //     if(token){
    //         _storeData('token', token)
    //         navigation.navigate('Dashboard')
    //     }else{
    //         console.error(`Houve um erro ao tentar fazer login`)
    //     }
    // })
      
}

export const handleSignIn = async (dados) => {
    axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            senha
        }
    }).then((response)=> { 
        console.log(response.data);

        navigation.navigate('Dashboard')
    })
}