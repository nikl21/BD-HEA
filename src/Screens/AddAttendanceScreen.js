import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import IconFe from 'react-native-vector-icons/Feather';
import IconFa from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import {
  Box,
  Text,
  VStack,
  Center,
  HStack,
  Pressable,
  Modal,
  FormControl,
  Flex,
  Spacer,
  WarningOutlineIcon,
} from 'native-base';
import i18n from '../Translations';
import HamburgerMenu from '../Components/HamburgerMenu';
import AppForm from '../Components/Form/AppForm';

import AppFormField from '../Components/Form/AppFormField';
import AppDatePicker from '../Components/Form/AppDatePicker';
import {ClassFormSchema} from '../Services/formData';
import SubmitButton from '../Components/Form/SubmitButton';
import ClassSelect from '../Components/Form/ClassSelect';

const AddAttendanceScreen = ({navigation}) => {
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    uploadImageToStorage();
  }
  return (
    <Box safeArea>
      <HamburgerMenu navigation={navigation} />

      <VStack space={10} py={6} px={8}>
        <Center>
          <Text fontSize={26} fontWeight={600}>
            {i18n.t('addAttendance.title')}
          </Text>
        </Center>
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
        <AppForm
          initialValues={{
            noOfCaregivers: '',
            noOfMothers: '',
            dateOfSession: new Date(),
            classType: '',
            date: new Date(),
          }}
          onSubmit={values => {
            console.log(values);
          }}
          validationSchema={ClassFormSchema}>
          <Center mb="16">
            <Flex flexDirection="row" w="100%" pb="5">
              <AppDatePicker
                name="dateOfSession"
                label={i18n.t('addAttendance.date')}
              />
              <Spacer />
              <ClassSelect name={'classType'} />
            </Flex>
            <Flex flexDirection="row" w="100%" pb="5">
              <AppFormField
                name="noOfMothers"
                label={i18n.t('addAttendance.noOfMothers')}
                keyboardType="numeric"
                placeholder="19"
              />
              <Spacer />
              <AppFormField
                name="noOfCaregivers"
                label={i18n.t('addAttendance.noOfCaregivers')}
                keyboardType="numeric"
                placeholder="31"
              />
            </Flex>
          </Center>
          <SubmitButton />
        </AppForm>
      </VStack>
    </Box>
  );
};

export default AddAttendanceScreen;
