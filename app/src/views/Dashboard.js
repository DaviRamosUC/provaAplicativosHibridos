import {
    Center,
    Box,
    Heading,
    FlatList,
    HStack,
    Avatar,
    VStack,
    Spacer,
    Text,
    Spinner,
    Modal,
    FormControl,
    Input,
    Button,
    Select,
    CheckIcon,
} from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../utils/consts';
import axios from 'axios';
import { _retrieveData } from '../utils/storage';
import { TouchableOpacity, Pressable } from 'react-native';
import { FooterComponent } from '../components/footerComponent';
import { handleScheduling } from '../controller/generalController';


export const DashboardScreen = ({ navigation }) => {

    const [token, setToken] = useState('');
    const [profissionais, setProfissionais] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [service, setService] = useState("");
    const [horario, setHorario] = useState("");
    const [profissionalId, setProfissionalId] = useState("");
    const horarioRef = useRef(null);
    const finalRef = useRef(null);

    useEffect(() => {
        const valueTk = async () => {
            const tk = await _retrieveData('token').then((x) => x)
            setToken(tk.replaceAll('"', ''))
        };
        valueTk()
    }, [])

    useEffect(() => {
        if (token) {
            axios.get(`${baseUrl}/profissionais`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                const newProfissionais = response.data.map(profissional => {
                    const randomAvatarIndex = Math.floor(Math.random() * avatarUrl.length);
                    const randomTextIndex = Math.floor(Math.random() * recentText.length);

                    return {
                        ...profissional,
                        avatarUrl: avatarUrl[randomAvatarIndex],
                        recentText: recentText[randomTextIndex],
                    };
                })
                setProfissionais(newProfissionais)
            }).catch(response =>
                console.error(response)
            )
        }
    }, [token])

    const avatarUrl = [
        "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    ]

    const recentText = [
        "Horário disponível: 10:00",
        "Horário disponível: 11:00",
        "Horário disponível: 12:00",
        "Horário disponível: 13:00",
        "Horário disponível: 13:30",
        "Horário disponível: 14:00",
        "Horário disponível: 14:30",
    ]

    if (token) {

        var selectHorario = []
        for (let index = 8; index < 17; index++) {
            let label = `${index}:00`
            selectHorario.push(
                <Select.Item label={label} value={index} />
            )
            
        }

        return (
            <>
                <Box safeArea p={2}>
                    <Heading fontSize="xl" p="4" pb="3">
                        Profissionais disponíveis
                    </Heading>
                    <FlatList data={profissionais} renderItem={({
                        item
                    }) => <Box borderBottomWidth="1" _dark={{
                        borderColor: "muted.50"
                    }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                            <TouchableOpacity onPress={() => {
                                setProfissionalId(item._id)
                                setModalVisible(true)
                            }}>
                                <HStack space={[2, 3]} justifyContent="space-between">
                                    <Avatar size="48px" source={{
                                        uri: item.avatarUrl
                                    }} />
                                    <VStack>
                                        <Text _dark={{
                                            color: "warmGray.50"
                                        }} color="coolGray.800" bold>
                                            {item.nome}
                                        </Text>
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }}>
                                            {item.recentText}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                    <Text fontSize="xs" _dark={{
                                        color: "warmGray.50"
                                    }} color="coolGray.800" alignSelf="flex-start">
                                        {item.timeStamp}
                                    </Text>
                                </HStack>
                            </TouchableOpacity>
                        </Box>} keyExtractor={item => item._id} />
                    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={horarioRef} finalFocusRef={finalRef}>
                        <Modal.Content>
                            <Modal.CloseButton />
                            <Modal.Header>Agendamento</Modal.Header>
                            <Modal.Body>
                                <FormControl>
                                    <FormControl.Label>Horário de serviço</FormControl.Label>
                                    <Select selectedValue={horario} minWidth="200" accessibilityLabel="Choose hour" placeholder="08:00" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => setHorario(itemValue)}>
                                        {selectHorario}
                                    </Select>
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Tipo de serviço</FormControl.Label>
                                    <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Barba" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                        <Select.Item label="Corte de cabelo" value="Corte de cabelo" />
                                        <Select.Item label="Barba" value="Barba" />
                                        <Select.Item label="Design de sobrancelhas" value="Design de sobrancelhas" />
                                        <Select.Item label="Limpeza de pele" value="Limpeza de pele" />
                                        <Select.Item label="Depilação facial" value="Depilação facial" />
                                    </Select>
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                        setModalVisible(false);
                                    }}>
                                        Desistir
                                    </Button>
                                    <Button onPress={() => {
                                        handleScheduling(service, horario, profissionalId, token, navigation)
                                        setModalVisible(false);
                                    }}>
                                        Agendar
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Box>
                <FooterComponent navigation={navigation}/>
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