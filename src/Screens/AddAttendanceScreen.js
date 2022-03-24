import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import IconFe from 'react-native-vector-icons/Feather';
import IconFa from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
  Box,
  Text,
  VStack,
  Center,
  HStack,
  Pressable,
  Modal,
  useToast,
} from 'native-base';
import i18n from '../Translations';
import HamburgerMenu from '../Components/HamburgerMenu';
import AttendanceForm from '../Components/Form/AttendanceForm';

const AddAttendanceScreen = ({navigation}) => {
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  //Todo: Add Class Id

  function uploadImageToStorage() {
    if (response) {
      let reference = storage().ref(response.assets[0].fileName);
      console.log('hi', response.assets[0].uri);
      let task = reference
        .putFile(response.assets[0].uri)
        .then(() => {
          console.log('Image uploaded to the bucket!');
        })
        .catch(e => console.log('uploading image error => ', e));
    }
  }

  //Upload Image Modal
  async function launchCam(type = 'camera') {
    if (type === 'camera') {
      await launchCamera(
        {
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: false,
        },
        setResponse,
      );
    } else {
      await launchImageLibrary({}, setResponse);
    }

    setShowModal(!showModal);
  }
  return (
    <Box safeArea>
      <HamburgerMenu navigation={navigation} />

      <Center>
        <Text
          fontSize={26}
          fontWeight={600}
          w={220}
          px={5}
          _android={{
            mt: '10',
          }}
          _ios={{
            mt: '5',
          }}>
          {i18n.t('addAttendance.title')}
        </Text>
      </Center>
      <VStack space={10} p={8}>
        <Pressable onPress={() => setShowModal(true)}>
          <Center
            bg="inputGray"
            h="16"
            borderWidth="1"
            borderColor="appColor"
            borderStyle="dashed"
            rounded={10}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content marginTop={40} marginBottom={'auto'}>
                <Modal.CloseButton />
                <Modal.Header>
                  <Center>
                    <Text fontSize="22">
                      {i18n.t('addAttendance.modalTitle')}
                    </Text>
                  </Center>
                </Modal.Header>
                <Modal.Body>
                  <HStack px={'8'} py={'2'} space={10}>
                    <Pressable
                      onPress={() => launchCam()}
                      bg="appColor"
                      size={20}
                      py={2}
                      rounded={10}
                      pt="2"
                      _pressed={{bg: 'yellow.600'}}>
                      <VStack space={'2'} alignItems="center">
                        <IconFe name="camera" size={30} color="white" />
                        <Text fontWeight={700} color="white" fontSize="16">
                          {i18n.t('addAttendance.camera')}
                        </Text>
                      </VStack>
                    </Pressable>
                    <Pressable
                      onPress={() => launchCam('gallery')}
                      bg="appColor"
                      size={20}
                      py={2}
                      rounded={10}
                      _pressed={{bg: 'yellow.600'}}>
                      <VStack space={'2'} alignItems="center" pt="2">
                        <IconFa name="photo" size={30} color="white" />
                        <Text fontWeight={700} color="white" fontSize="16">
                          {i18n.t('addAttendance.camera')}
                        </Text>
                      </VStack>
                    </Pressable>
                  </HStack>
                </Modal.Body>
              </Modal.Content>
            </Modal>
            <HStack space={10}>
              <IconFe name="upload" size={30} color="#212529" />
              <Text fontSize={18}>{i18n.t('addAttendance.uploadButton')}</Text>
            </HStack>
          </Center>
        </Pressable>
        <AttendanceForm
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            uploadImageToStorage();
            firestore()
              .collection('classes')
              .add(values)
              .then(() => {
                navigation.navigate(i18n.t('menu.previousClasses'));
                console.log('User added!');
              });
            resetForm();
            toast.show({
              render: () => {
                return (
                  <Box bg="primary.500" px="2" py="1" rounded="sm" mb={5}>
                    Class Added!
                  </Box>
                );
              },
            });
            NetInfo.fetch().then(state => {
              if (!state.isConnected) {
                navigation.navigate(i18n.t('menu.previousClasses'));
              }
            });
          }}
        />
      </VStack>
    </Box>
  );
};

export default AddAttendanceScreen;
