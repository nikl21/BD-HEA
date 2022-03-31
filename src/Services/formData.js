import * as Yup from 'yup';

export const ClassFormSchema = Yup.object().shape({
  noOfCaregivers: Yup.number().required().integer().label('No of caregivers'),
  noOfMothers: Yup.number().integer().required().label('No of Mothers'),
  // classType: Yup.string().required().label('Class'),
  hospital: Yup.string().required().label('Hospital Name'),
});
