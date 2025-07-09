import * as yup from 'yup';

export const userSignupSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),

  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
