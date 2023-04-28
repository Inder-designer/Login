import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from '../api/axios';


const INFO_URL = '/me'
const USER_REGEX = /^[a-zA-Z1-9-_0]{3,23}$/;

const EditProfile = (props) => {

    const [show, setShow] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        username: ""
    })
console.log(userInfo,"userInfo");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editSchema = Yup.object().shape({
        name: Yup.string().min(3, "Minimum 3 letters").required("Please enter name"),
        username: Yup.string().matches(USER_REGEX, "Only alphabet").min(3, "Minimum 3 letters").required("Please enter username")
    })
    let ff = localStorage.getItem("token")

    useEffect(() => {

        async function fetchUserInfo() {
            try {
                const res = await axios.get(INFO_URL, {
                    headers: {
                        'Authorization': JSON.parse(ff)
                    }
                });

                const {firstName,username,email}= res.data.data
                setUserInfo({name:firstName,username,email});
            } catch (err) {
                // console.log(err, "Error>>>>>>>");
            }
        }
        fetchUserInfo()

    }, [])
    // if(!f

    return (
        <div>

            <section className='userInfo'>
                <div className="container">
                    <ul className="list-unstyled p-0 m-0">
                        <li><span>Name:</span> {userInfo.name}</li>
                        <li><span>Username:</span> {userInfo.username}</li>
                        <li><span>Email:</span> {userInfo.email}</li>
                        <li className='mt-3'><button className='btn btn-primary' onClick={handleShow}>Edit Profile</button></li>
                    </ul>
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
                            <Formik
                                initialValues={
                                    userInfo
                                }
                                validationSchema={editSchema}
                                enableReinitialize
                                onSubmit={values => {
                                    console.log(values);
                                }}
                            >
                                {({ errors, touched,values }) => (
                                    <Form>
                                        <label htmlFor="name">Name</label>
                                        <Field name="name" id="name" className="form-control" value={values.name}/>
                                        {errors.name && touched.name ? (
                                            <p className="text-danger">{errors.name}</p>
                                        ) : null}
                                        <label htmlFor="username" className='mt-3'>Username</label>
                                        <Field name="username" className="form-control" value={values.username}/>
                                        {errors.username && touched.username ? (
                                            <p className="text-danger">{errors.username}</p>
                                        ) : null}
                                        <button type="submit" className='btn mt-3 btn-primary'>Save</button>
                                    </Form>
                                )}

                            </Formik>
                        </Modal.Body>
                    </Modal>
                </div>
            </section>
        </div>
    )
}

export default EditProfile