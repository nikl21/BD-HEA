import * as Yup from 'yup';

export const ClassFormSchema = Yup.object().shape({
  noOfCaregivers: Yup.number().integer().label('No of caregivers'),
  noOfMothers: Yup.number().integer().label('No of Mothers'),
  classType: Yup.string().required().label('Class'),
  // name: Yup.string().required(),
  // age: Yup.number().required().integer().max(120).min(0).label('Age'),

  // phone: Yup.string()
  //   .matches(
  //     /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  //     'Please enter a valid phone number',
  //   )
  //   .required()
  //   .test('len', 'Must be exactly 10 characters', val =>
  //     val ? val.length === 10 : true,
  //   ),
});
