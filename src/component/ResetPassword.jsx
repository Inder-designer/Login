import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './style.css'
import axios from '../api/axios'
import { ToastContainer, toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const RESET_URL = '/resetPassword'
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const initialValues = {
    password: ""
}

const ResetPassword = () => {
    const navigate = useNavigate();
    const [pswd, setPswd] = useState('');

    const Schemas = Yup.object({
        password: Yup.string().matches(PWD_REGEX,"REGEX_Error").min(8).max(20).required("Please enter your password"),
    })
    const {values, errors, handleBlur, touched, handleChange, handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema : Schemas,
        onSubmit: (values) => {
            resetPswd(values)
        }
    })
    // console.log(errors);

    // console.log(Formik);

    const resetPswd = async (values) => {
        // e.preventDefault()
        console.log(values);
        let resetId = new URLSearchParams(window.location.search).get('resetId');

        try {
            const res = await axios.post(RESET_URL,
                { password: values.password }, {
                headers: {
                    Authorization: resetId,
                },
            }
            )
            console.log(res?.data,"responce")
            if (res?.data?.status === 200){
                
                toast(res?.data?.message)
                
                // setTimeout(() => {
                    navigate('/auth')
                // }, 2000);
            } else{
                throw new Error(res.error);
            }
        } catch (err) {
            console.log(err,"err>>>>>>>>>");
            // toast(JSON.stringify(err.response?.data?.error))
        }
    }

    return (
        <div>
            <div className="forgotPage">
                <div className="container">
                    <form action='/' onSubmit={handleSubmit} className="loginFOrm">
                        <h1 className='text-center'>
                            Reset Password
                        </h1>
                        <label htmlFor="password" className='mb-2'>Password</label>
                        <TextField
                            className='w-100 mb-3'
                            // required
                            type='password'
                            id="password"
                            name="password"
                            autoComplete='off'
                            // ref={userRef}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password ?  ( 
                            <p className='form-error text-danger'>{errors.password}</p> 
                        ) : null}

                        <div className='text-center'>
                            <Button type="submit" variant="contained" sx={{ marginTop: "20px" }}  >Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword