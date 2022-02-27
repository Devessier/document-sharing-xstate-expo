import React from 'react';
import {
  HStack,
  Heading,
  NativeBaseProvider,
  VStack,
  Spacer,
  Box,
  StatusBar,
  IconButton,
  Icon,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import PdfReader from 'rn-pdf-reader-js';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="dark-content" />

      <Box bg="gray.100" flex={1}>
        <VStack flex={1} safeAreaTop safeAreaX>
          <Heading px="4" py="4">
            Document viewer
          </Heading>

          <Box flex={1} bg="gray.200">
            <PdfReader
              source={{
                uri: 'https://erlang.org/download/getting_started-5.4.pdf',
              }}
            />
          </Box>

          <Box
            safeAreaBottom
            bg="white"
            borderTopWidth="1"
            borderColor="gray.300"
          >
            <HStack py="2" px="4" alignItems="center">
              <Spacer />

              <IconButton
                icon={<Icon as={Feather} name="share" />}
                borderRadius="full"
                _icon={{
                  color: 'gray.800',
                  size: 'sm',
                }}
                _hover={{
                  bg: 'gray.100',
                }}
                _pressed={{
                  bg: 'gray.100',
                }}
              />
            </HStack>
          </Box>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
