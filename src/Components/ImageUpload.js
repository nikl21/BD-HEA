import {useFocusEffect} from '@react-navigation/native';
import {
  Center,
  HStack,
  Image,
  Modal,
  Text,
  VStack,
  Pressable,
} from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import React, {useState, useImperativeHandle} from 'react';
import IconFe from 'react-native-vector-icons/Feather';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconIo from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import {PermissionsAndroid, Platform} from 'react-native';
import i18n from '../Translations';

export const ImageUpload = React.forwardRef((props, ref) => {
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Todo: Add Class Id
  useImperativeHandle(ref, () => ({
    uploadImageToStorage() {
      uploadImageToStorage();
    },
  }));
  useFocusEffect(
    React.useCallback(() => {
      return () => setResponse(null);
    }, []),
  );

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
  const requestCameraPermission = async () => {
    try {
      const grantedcamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const grantedstorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
        grantedstorage === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera permission given');
        launchCam();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
    <Pressable onPress={() => setShowModal(true)}>
      <Center
        bg="white"
        h="16"
        borderWidth="1"
        borderColor="appColor"
        borderStyle="dotted">
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}>
          <Modal.Content>
            <Modal.CloseButton />

            <Text fontSize="22" pt="4" ml="12" mb="2" fontWeight="bold">
              {i18n.t('addAttendance.modalTitle')}
            </Text>
            <Modal.Body>
              <HStack px={'4'} py={'2'} space={10}>
                <Pressable
                  onPress={() =>
                    Platform.OS === 'android'
                      ? requestCameraPermission()
                      : launchCam()
                  }
                  backgroundColor="appColor"
                  size={24}
                  py={2}
                  rounded={0}
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
                  size={24}
                  py={2}
                  rounded={0}
                  _pressed={{bg: 'yellow.600'}}>
                  <VStack space={'2'} alignItems="center" pt="2">
                    <IconFa name="photo" size={30} color="white" />
                    <Text fontWeight={700} color="white" fontSize="16">
                      {i18n.t('addAttendance.gallery')}
                    </Text>
                  </VStack>
                </Pressable>
              </HStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <HStack space={8} position="relative" alignItems="center">
          <IconIo name="image-outline" size={35} color="#FAAF1B" />
          <Text fontSize={18}>{i18n.t('addAttendance.uploadButton')}</Text>
          {!response && <IconFe name="plus-circle" size={30} color="#FAAF1B" />}

          {response && (
            <Image
              source={{
                uri: response.assets[0].uri,
              }}
              alt="Alternate Text"
              size={'xs'}
              position="absolute"
              right={-40}
              top={-3}
            />
          )}
        </HStack>
      </Center>
    </Pressable>
  );
});
