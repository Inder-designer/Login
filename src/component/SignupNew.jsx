import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-z1-9-_.+]{3,25}@([a-z]+\.)[a-z]{2,4}$/;
const REGISTER_URL = '/save-user'
const GENERATE_OTP_URL = '/generateOtp'
const VERIFY_OTP_URL = '/verifyOtp'

const SignupNew = (props) => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        cPassword: "",
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const signupSchema = Yup.object().shape({
        name: Yup.string().min(4,"Minimum 4 letters").required("Please enter your name"),
        username: Yup.string().min(4,"Minimum 4 letters").required("Please enter your username"),
        email: Yup.string().email("Enter valid email").matches(EMAIL_REGEX, "Enter valid email").required("Please enter your email"),
        password: Yup.string().min(8,"Password must be 8 characters").matches(PWD_REGEX, "Password must contain at least 8 characters, one uppercase, one number and one special case character").required("Please enter your password"),
        cPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Please enter your confirm password")
    })


    const verifyUser = async (value) =>{
        setUserInfo(value)
        try{
            const res = await axios.post(GENERATE_OTP_URL, {
                email: value.email
            })
            if (res?.data?.status === 200){
                setShow(true)   
                toast(res?.data?.message)
            }
        } catch(err) {
            toast(err?.response?.data?.error)
        }
    }
    
    const otpSchema = Yup.object().shape({
        otp: Yup.string().required("Enter OTP")
    })
    const verifyOtp = async (value) => {
        try{
            const res = await axios.put(VERIFY_OTP_URL, {
                otp: value.otp, email: userInfo.email
            })

            if (res?.data?.status === 200){
                signup();
            }
        } catch (err) {
            toast(err?.response?.data?.error)
        }
    }


    const signup = async ()=>{
        try{
            const res = await axios.post(REGISTER_URL,{
                firstName: userInfo.name,username: userInfo.username,email: userInfo.email,password: userInfo.password
            }) 
            console.log(res);
            if (res?.data?.status === 200){
                toast(res?.data?.message)
                setShow(false)
                setUserInfo({});
                console.log(userInfo);
                props.setValue('1')
            } else{
                throw new Error(res.error);
            }
        }catch (err){
            toast(err?.response?.data?.error)
        }
    }
  return (
    <div>
        <div className="container">
            <Formik
                initialValues={userInfo}
                validationSchema={signupSchema}
                enableReinitialize={true}
                onSubmit= {verifyUser}
            >
            {({errors, touched, values}) => (
                <Form className="signupFOrm" >
                    <div className='mb-3'>
                        <label htmlFor="name" className='mb-2'>Name</label>
                        <Field id="name" type="text" name="name" className="form-control" />
                        {errors.name && touched.name ? (
                            <p className='text-danger'>{errors.name}</p>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className='mb-2'>Username</label>
                        <Field id="username" type="text" name="username" className="form-control" />
                        {errors.username && touched.username ? (
                            <p className='text-danger'>{errors.username}</p>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className='mb-2'>Email</label>
                        <Field id="email" type="email" name="email" className="form-control" />
                        {errors.email && touched.email ? (
                            <p className='text-danger'>{errors.email}</p>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className='mb-2'>Password</label>
                        <Field id="password" type="password" name="password" className="form-control" />
                        {errors.password && touched.password ? (
                            <p className='text-danger'>{errors.password}</p>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cPassword" className='mb-2'>Confirm Password</label>
                        <Field id="cPassword" type="password" name="cPassword" className="form-control" />
                        {errors.cPassword && touched.cPassword ? (
                            <p className='text-danger'>{errors.cPassword}</p>
                        ) : null}
                    </div>
                    <div className='text-center'> 
                        <Button type="submit" variant="contained" className='mt-3'>Signup</Button>
                    </div>
                </Form>
            )}
                
            </Formik>
            
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} onHide={handleClose}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                   <h1 className='text-center'>
                   OTP Verification
                    </h1>
                    <p className='text-center'>We've sent a verificaton code to your email - {userInfo.email}</p>
                    <Formik
                        initialValues={{
                             otp:""
                        }}
                        enableReinitialize
                        validationSchema={otpSchema}
                        onSubmit={verifyOtp}
                    >
                    {({errors, touched}) => (
                        <Form>
                            <Field
                                className='w-100 form-control'
                                required
                                type='text'
                                id="otp"
                                autoComplete='off'
                                name="otp"
                                placeholder='Enter verification code'
                            />
                            {errors.otp && touched.otp ? (
                                <p className="text-danger">{errors.otp}</p>
                            ) : null}
                            <Button type="submit" variant="contained" className='mt-3'>Submit</Button>
                        </Form>
                    )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    </div>
  )
}

export default SignupNew