import * as Yup from 'yup'

export const accountRegistrationScheme = Yup.object({
    username: Yup.string().min(3).max(25).required('Please Input Your Username'),
    email: Yup.string().email().required('Please Input Your Email Address'),
    password: Yup.string().min(4).required('Please Input Your Password'),
})

export const profileRegistrationScheme = Yup.object({
    fullName: Yup.string().min(4).max(50).required('Please Input Your FullName'),
    mobilePhone: Yup.number().required('Please Input Your Mobile Phone'),
    birthDate: Yup.date().required('Please Input Your Birth Date'),
})

export const loginValidationScheme = Yup.object({
    username: Yup.string().min(4).max(25).required('Please Input Your Username'),
    password: Yup.string().min(4).required('Please Input Your Password')
})