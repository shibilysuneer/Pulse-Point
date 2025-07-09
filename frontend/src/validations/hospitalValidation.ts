import * as yup from 'yup';

export const hospitalSignupSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Hospital name must be at least 3 characters')
    .required('Hospital name is required'),
  
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .required('Phone is required'),

  registrationNumber: yup
    .string()
    .min(3, 'Registration number must be at least 3 characters')
    .required('Registration number is required'),
});
