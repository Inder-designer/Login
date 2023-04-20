import * as Yup from 'yup'

export const Schemas = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).max(25).required("Please enter your password"),
    confirm_password: Yup.string().required("Please enter your confirm password").oneOf([Yup.ref('password'), null], "Password must match"),    
})