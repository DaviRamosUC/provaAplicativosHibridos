import {
    Center,
    Box,
    Heading,
    FlatList,
    HStack,
    VStack,
    Spacer,
    Text,
    Spinner,
} from 'native-base';
import { useEffect, useState } from 'react';
import { _retrieveData } from '../utils/storage';
import { TouchableOpacity, Pressable } from 'react-native';
import { FooterComponent } from '../components/footerComponent';
import { getAgendamentos } from '../controller/generalController';


export const AgendamentosScreen = ({ navigation }) => {

    const [token, setToken] = useState('');
    const [agendamentos, setAgendamentos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const valueTk = async () => {
            const tk = await _retrieveData('token').then((x) => x)
            setToken(tk.replaceAll('"', ''))
        };
        valueTk()
    }, [])

    useEffect(() => {
        if (token) {
            const func = async () => {
                const respAgendamentos = await getAgendamentos(token)
                setAgendamentos(respAgendamentos)
            };
            func()
        }
    }, [token])

    const labelsTipoServiço = [

    ]

    if (token) {

        return (
            <>
                <Box safeArea p={2}>
                    <Heading fontSize="xl" p="4" pb="3">
                        Agendamentos realizados
                    </Heading>
                    <FlatList data={agendamentos} renderItem={({
                        item
                    }) => <Box borderBottomWidth="1" _dark={{
                        borderColor: "muted.50"
                    }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true)
                            }}>
                                <HStack space={[2, 3]} justifyContent="space-between">
                                    <VStack>
                                        <Text _dark={{
                                            color: "warmGray.50"
                                        }} color="coolGray.800" bold>
                                            {item.profissional.nome}
                                        </Text>
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }}>
                                            Data de agendamento: {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date(item.data))}
                                        </Text>
                                        <Text fontSize="xs" _dark={{
                                            color: "warmGray.50"
                                        }} color="coolGray.800" alignSelf="flex-start">
                                            Horario agendado: {item.horario}:00
                                        </Text>
                                        <Text fontSize="xs" _dark={{
                                            color: "warmGray.50"
                                        }} color="coolGray.800" alignSelf="flex-start">
                                            Serviço: {item.servico}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                </HStack>
                            </TouchableOpacity>
                        </Box>} keyExtractor={item => item._id} />
                </Box>
                <FooterComponent navigation={navigation} />
            </>
        );
    } else {
        return (
            <Center w="100%" h='100%'>
                <Spinner accessibilityLabel="Carregando dados" />
                <Heading color="primary.500" fontSize="md">
                    Carregando dados
                </Heading>
            </Center>
        );
    }

};