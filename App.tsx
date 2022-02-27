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
import {
  downloadAsync,
  cacheDirectory,
  getInfoAsync,
  deleteAsync,
} from 'expo-file-system';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

const shareDocumentMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAWBDATmABBA9gMYCuAtmAHYAuAdAJIQA2YAxGlrgSedYqAA75YASyrD8FPiAAeiAJwA2AEw0AjAHY5ADlUBWXQAYAzOvW6FAGhABPeQZpy5BrVqOKlu1cfUBfH1fZsPCIySloAEXwAdwpGfHQIYQooYO4wlgIKMBokgDd8AGtswM4Qngjo2PjE5NTQ6gQ8onQxCQBtAwBdKUERVskkGUQjJSMaBS8lBWdpryMAFitbBFU5MfnHeZMJw28jPwCMIK562kCklJPyjIlspqKaErryx6OL57DGinzCFvEKDrdQa9UT-KSyBDuNSaHT6bxmSw2YbqMZaUy6IyqJTzAxyHEKA4gJ5XMI0ADiYCoYlqJOoOAAZph8KQcL9CKhWJk7t9CsUjqU0tRyZTqZcymEGUyWWyOV8fn92l0ekJQRJwfJlNDtHpDCYEUtEFt1DRdI5VvNVroNnIrYTieKhRSqe9aVRJczWeh2awwJgmZgaPxGC16fhMKRXhwPo6RS6HW7GR6ZWA5c1+oDlX0wYMIVCNNq4XrzAaEFbjcYtPN9Bb1Dj1Eo-P4QBR8BA4FJ7YLaAxmJnVQNQBDVEYFLpxnoNOYtGtR7oS0ZK2p5koDLjhyM9HI7fzoxUYnEEnGu33+uqEMuS6sVFoFFWFFoDAo5GYV74m53TpHMEfTifs4PEHvBQaAMeZlCUJRNAXKZVEvORr1vKdH2fXQG3fHdXWFZ0aXjd1pS9Dk-zVHNAK2E0b00fQ9FMBR1BLKsxl0LQPHmFwUVUB8pm3KNXSIgchhWLRLy0RsfCAA */
  createMachine(
    {
      context: { documentIsCached: false, documentHasBeenDownloaded: false },
      tsTypes: {} as import('./App.typegen').Typegen0,
      schema: {
        context: {} as {
          documentIsCached: boolean;
          documentHasBeenDownloaded: boolean;
        },
        services: {} as {
          'Download document': {
            data: void;
          };
          'Share document': {
            data: void;
          };
          'Get document from cache': {
            data: void;
          };
        },
      },
      id: 'Share document',
      initial: 'Getting document from cache',
      states: {
        Idle: {
          on: {
            'Share document': [
              {
                cond: 'Document is cached',
                target: '#Share document.Sharing document',
              },
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
        'Getting document from cache': {
          invoke: {
            src: 'Get document from cache',
            onDone: [
              {
                actions: 'Assign document is cached to context',
                target: '#Share document.Idle',
              },
            ],
            onError: [
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
        'Document is cached': ({ documentIsCached }) =>
          documentIsCached === true,
      },
      actions: {
        'Assign document has been downloaded to context': assign({
          documentHasBeenDownloaded: (_context) => true,
        }),
        'Assign document is cached to context': assign({
          documentIsCached: (_context) => true,
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

  const [, send] = useMachine(shareDocumentMachine, {
    services: {
      'Get document from cache': async () => {
        const { exists } = await getInfoAsync(documentLocalUri);
        const documentIsNotCached = exists === false;
        if (documentIsNotCached) {
          throw new Error('Document is not cached');
        }
      },
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

  async function handleDeleteDocumentFromCachePress() {
    await deleteAsync(documentLocalUri);
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
            <HStack py="2" px="4" alignItems="center" space="2">
              <Spacer />

              <IconButton
                icon={<Icon as={Feather} name="trash-2" />}
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
                onPress={handleDeleteDocumentFromCachePress}
              />

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
