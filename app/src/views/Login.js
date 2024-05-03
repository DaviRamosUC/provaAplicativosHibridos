import { Box, VStack, FormControl, Input, Button, Center, Heading, Link, HStack, Text } from "native-base";
import { useState } from "react";
import { handleLogin } from "../controller/loginController";

export function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <Center w="100%" h='100%'>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                Bem vindo
            </Heading>
            <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Faça o login para continuar!
            </Heading>

            <VStack space={3} mt="5">
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
                    <Link _text={{
                        fontSize: "xs",
                        fontWeight: "500",
                        color: "indigo.500"
                    }} alignSelf="flex-end" mt="1">
                        Esqueceu a senha?
                    </Link>
                </FormControl>
                <Button mt="2" colorScheme="blue" onPress={() => handleLogin(email, senha, navigation)}>
                    Entrar
                </Button>
                <HStack mt="6" justifyContent="center">
                    <Text fontSize="sm" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }}>
                        Eu sou um novo usuário.{" "}
                    </Text>
                    <Link _text={{
                        color: "indigo.500",
                        fontWeight: "medium",
                        fontSize: "sm"
                    }} onPress={() => navigation.navigate('SignIn')}>
                        cadastrar-me
                    </Link>
                </HStack>
            </VStack>
        </Box>
        </Center>
    );
}