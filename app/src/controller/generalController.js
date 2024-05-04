import axios from "axios"
import { _storeData, _retrieveData } from "../utils/storage"
import { baseUrl } from "../utils/consts"

export const handleLogin = async (email, senha, navigation) => {
    axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            senha
        }
    }).then((response) => {
        let token = response.data.token
        if (token) {
            _storeData('token', token)
            navigation.navigate('Dashboard')
        } else {
            console.error(`Houve um erro ao tentar fazer login`)
        }
    })

}

export const handleSignIn = async (dados) => {
    axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            senha
        }
    }).then((response) => {
        console.log(response.data);

        navigation.navigate('Dashboard')
    })
}

export const handleScheduling = async (service, horario, profissionalId, token, navigation) => {

    const data = new Date()
    const dataFormatada = data.toLocaleDateString();
    axios({
        method: 'POST',
        url: `${baseUrl}/agendamentos`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
            profissionalId,
            data: dataFormatada,
            horario,
            servico: service
        }
    }).then((response) => {
        console.log(response.data);

        navigation.navigate('Agendamentos')
    }).catch((e) => console.error(e))
}

export const getProfissionais = async (token, avatarUrl, recentText) => {

}

export const getAgendamentos = async (token) => {
    
    return axios.get(
        `${baseUrl}/agendamentos`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    ).then(response => {
        return response.data
    }).catch(err => console.error(err))
}