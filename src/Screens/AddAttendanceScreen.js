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
  ScrollView,
  Image,
} from 'native-base';
import {PermissionsAndroid, Platform, StyleSheet} from 'react-native';
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
      // toast.show({
      //   render: () => {
      //     return (
      //       <Box bg="primary.500" px="2" py="1" rounded="sm" mb={5}>
      //         Image Added!
      //       </Box>
      //     );
      //   },
      // });
    } else {
      await launchImageLibrary({}, setResponse);
      // toast.show({
      //   render: () => {
      //     return (
      //       <Box bg="primary.500" px="2" py="1" rounded="sm" mb={5}>
      //         Image Added!
      //       </Box>
      //     );
      //   },
      // });
    }

    setShowModal(!showModal);
  }
  return (
    <Box bg="white" safeArea style={styles.box}>
      <HamburgerMenu navigation={navigation} />
      <ScrollView>
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
        <VStack space={10} p={4}>
          <Pressable onPress={() => setShowModal(true)}>
            <Center
              bg="white"
              h="16"
              borderWidth="1"
              borderColor="appColor"
              borderStyle="dashed">
              <Modal
                isOpen={showModal}
                onClose={() => {
                  setShowModal(false);
                }}>
                <Modal.Content
                  // marginTop={40}
                  // marginBottom={'auto'}
                  {...styles['center']}>
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
                        bg="appColor"
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
              <HStack space={5} position="relative">
                <IconFe name="upload" size={30} color="#212529" />
                <Text fontSize={18}>
                  {i18n.t('addAttendance.uploadButton')}
                </Text>
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
      </ScrollView>
    </Box>
  );
};

export default AddAttendanceScreen;

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
});
