import { AddIcon, Box, Center, HStack, InfoIcon, Text } from "native-base"
import { useState } from "react";
import { Pressable } from "react-native"

export const FooterComponent = ({navigation}) => {
    const [selected, setSelected] = useState(1);
    return (
        <Box flex={1} width="100%" justifyContent='flex-end'>
            <HStack bg="black" alignItems="end" safeAreaBottom shadow={6}>
                <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => navigation.navigate('Dashboard')}>
                    <Center>
                        <AddIcon size="5" mt="0.5" color="white" />
                        <Text color="white" fontSize="12">
                            Agendar
                        </Text>
                    </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => navigation.navigate('Agendamentos')}>
                    <Center>
                        <InfoIcon size="5" mt="0.5" color="white" />
                        <Text color="white" fontSize="12">
                            Agendamentos
                        </Text>
                    </Center>
                </Pressable>
            </HStack>
        </Box>
    )
}