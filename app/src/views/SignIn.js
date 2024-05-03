import { NativeBaseProvider, Box, VStack, FormControl, Input, Button, Center, Heading, Link, HStack, Text } from "native-base";
import { useState } from "react";
import { handleLogin } from "../controller/loginController";

export function SignInScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const dateMask = '[00]/[00]/[0000]';
    const phoneMask = '+1 ([000]) [000]-[0000]';

    return (
        <NativeBaseProvider>
            <Center w="100%" h='100%'>
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Que bom te ver por aqui!
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Vamos dar inicio ao seu cadastro
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Nome</FormControl.Label>
                            <Input
                                placeholder="Davi Ramos Lima"
                                value={email}
                                onChangeText={(texto) => setEmail(texto)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Data de nascimento</FormControl.Label>
                            <Input
                                placeholder="26/02/2000"
                                value={email}
                                onChangeText={(texto) => setEmail(texto)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input
                                placeholder="exemplo@gmail.com"
                                value={email}
                                onChangeText={(texto) => setEmail(texto)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Senha</FormControl.Label>
                            <Input
                                type="password"
                                placeholder="********"
                                value={senha}
                                onChangeText={(texto) => setSenha(texto)}
                            />
                        </FormControl>
                        <Button mt="2" colorScheme="blue" onPress={() => handleLogin(email, senha)}>
                            Entrar
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                Eu já sou um usuário.{" "}
                            </Text>
                            <Link _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} onPress={() => navigation.navigate('Login')}>
                                Logar-me
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}