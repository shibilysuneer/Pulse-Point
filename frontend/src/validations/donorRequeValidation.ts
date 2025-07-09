import * as yup from 'yup';

export const donorRequestSchema = yup.object().shape({
  username: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

  age: yup
    .number()
    .required('Age is required')
    .min(18, 'You must be at least 18 years old')
    .max(65, 'You must be under 65 years old'),

  bloodGroup: yup
    .string()
    .oneOf(
    ['A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve'],
    'Invalid blood group'
  )
  .required('Blood group is required'),

  gender: yup
    .string()
    .required('Gender is required'),

  location: yup
    .string()
    .required('Location is required'),

  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),

  address: yup
    .string()
    .required('Address is required'),

  donatedBefore: yup
    .string()
    .oneOf(['yes', 'no'])
    .required('Please indicate if you donated before'),

  lastDonatedDate: yup
    .string()
    .when('donatedBefore', {
      is: 'yes',
      then: (schema) =>
        schema
          .required('Last donation date is required')
          .test('3-month-gap', 'You must wait 3 months after last donation', (value) => {
            if (!value) return false;
            const lastDate = new Date(value);
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return lastDate <= threeMonthsAgo;
          }),
      otherwise: (schema) => schema.notRequired(),
    }),

  height: yup
    .number()
    .typeError('Height must be a number')
    .required('Height is required')
    .min(100, 'Height seems too low'),

  weight: yup
    .number()
    .typeError('Weight must be a number')
    .required('Weight is required')
    .min(40, 'Weight seems too low'),

  // booleans can be optional but you can enforce if you want
  regularMedicine: yup.boolean(),
  tattoo: yup.boolean(),
  minorSurgery: yup.boolean(),
  majorSurgery: yup.boolean(),
  dentalExtraction: yup.boolean(),
  repeatedDiarrhoea: yup.boolean(),
});
