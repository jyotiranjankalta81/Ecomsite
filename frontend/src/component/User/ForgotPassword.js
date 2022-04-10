import React, { Fragment, useRef, useEffect, useState } from 'react'
import "./forgotPasswordd.css"
import Loader from "../layout/Loader/Loader"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, forgotPassword } from '../../actions/userAction'
import { useAlert } from "react-alert"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        // console.log("Sign Up Form Submitted");
        dispatch(forgotPassword(myForm));
    };
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());

        }
        if (message) {
            alert.success(message);

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }

    }, [dispatch, error, alert, message]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className='forgotPassworddContainer'>
                        <div className='forgotPassworddBox'>
                            <h2 className='forgotPassworddHeading'>Forgot Password</h2>
                            <form
                                className='forgotPassworddForm'
                                onSubmit={forgotPasswordSubmit}
                            >

                                <div className='forgotPasswordEmail'>
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        required
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="send"
                                    className="forgotPasswordBtn"
                                // disabled={loading ? true : false}
                                />
                            </form>

                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default ForgotPassword