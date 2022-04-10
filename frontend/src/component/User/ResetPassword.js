import React, { Fragment, useRef, useEffect, useState } from 'react'
import "./ResetPassword.css"
import Loader from "../layout/Loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, resetPassword } from '../../actions/userAction'
import { useAlert } from "react-alert"
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    // const { user } = useSelector((state) => state.user);
    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    // const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        // console.log("Sign Up Form Submitted");
        dispatch(resetPassword(match.params.token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());

        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login");

        }

    }, [dispatch, error, alert, success, navigate]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className='resetPasswordContainer'>
                        <div className='resetPasswordBox'>
                            <h2 className='resetPasswordHeading'>Update Profile</h2>
                            <form
                                className='resetPasswordForm'
                                encType="multipart/form-data"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div className='signUpPassword'>
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder='New Password'
                                        required
                                        name='newPassword'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='signUpPassword'>
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder='Confirm Password'
                                        required
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="resetPasswordBtn"
                                // disabled={loading ? true : false}
                                />
                            </form>

                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    );
};

export default ResetPassword