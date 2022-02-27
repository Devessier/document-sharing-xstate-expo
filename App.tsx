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
import { shareAsync } from 'expo-sharing';
import { downloadAsync, cacheDirectory } from 'expo-file-system';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

const shareDocumentMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAWBDATmABBA9gMYCuAtmAHYAuAdAJIQA2YAxGlrgSedYqAA75YASyrD8FPiAAeiALQBGAKwKaABgAsAZk0A2AOwbdAJgAcATjW6ANCACeiY-rU1jGq7tMbzWjV7X6AL6BtuzYeERklLQAIvgA7hSM+OgQwhRQEdzRLAQUYDTpAG74ANYFYZyRPLEJSSlpGVlR1AjFROhiEgDaagC6UoIiXZJIMoj6OjTmpvpKaub6TuYGWrYOCBp+NKY6TgorWmYLwaEY4VwttGHpmZc1uRIF7eU0lc01b+e3H9FtFCVCJ1xBRegMxkNRCCpLIELpdKotPoVvpDFYlEjzOtEJZppZTLsVsYVGotKZgiEQBR8BA4FJ3vdovQmGBBkIoRIYfIlEoaPCjloFFofHNhcZsQglPp1G4lBollt5UpdFpTiAGdUmXFEslUj9GbwIeyRlyEMTTNN5qYFGoFFsBWt7Ih5RaFLo-J5zDNjMYfBo1RrstQvlh9ZrDQJjdCxrCLLyEUslNaCZNdFinWa1MYaMrPcrJqZSVYA+cqkGqGzhtHQLDFHN1No9IYTBYrBLFLyViqdJp9Ap+4XVRSgA */
  createMachine(
    {
      context: { documentHasBeenDownloaded: false },
      tsTypes: {} as import('./App.typegen').Typegen0,
      schema: {
        context: {} as {
          documentHasBeenDownloaded: boolean;
        },
        services: {} as {
          'Download document': {
            data: void;
          };
          'Share document': {
            data: void;
          };
        },
      },
      id: 'Share document',
      initial: 'Idle',
      states: {
        Idle: {
          on: {
            'Share document': [
              {
                cond: 'Document has been downloaded',
                target: '#Share document.Sharing document',
              },
              {
                target: '#Share document.Downloading document',
              },
            ],
          },
        },
        'Downloading document': {
          invoke: {
            src: 'Download document',
            onDone: [
              {
                actions: 'Assign document has been downloaded to context',
                target: '#Share document.Sharing document',
              },
            ],
          },
        },
        'Sharing document': {
          invoke: {
            src: 'Share document',
            onDone: [
              {
                target: '#Share document.Idle',
              },
            ],
          },
        },
      },
    },
    {
      guards: {
        'Document has been downloaded': ({ documentHasBeenDownloaded }) =>
          documentHasBeenDownloaded === true,
      },
      actions: {
        'Assign document has been downloaded to context': assign({
          documentHasBeenDownloaded: (_context) => true,
        }),
      },
    },
  );

export default function App() {
  if (cacheDirectory === null) {
    throw new Error('cacheDirectory is null');
  }

  const documentUri = 'https://erlang.org/download/getting_started-5.4.pdf';
  const documentLocalUri = `${cacheDirectory}/erlang-getting-started.pdf`;

  const [state, send] = useMachine(shareDocumentMachine, {
    services: {
      'Download document': async () => {
        console.log('document is downloading');

        await downloadAsync(documentUri, documentLocalUri);
      },
      'Share document': async () => {
        await shareAsync(documentLocalUri);
      },
    },
  });

  function handleShareDocumentPress() {
    send({
      type: 'Share document',
    });
  }

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
                uri: documentUri,
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
                onPress={handleShareDocumentPress}
              />
            </HStack>
          </Box>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
