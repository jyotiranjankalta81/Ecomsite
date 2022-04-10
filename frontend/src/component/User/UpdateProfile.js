import React, { Fragment, useRef, useEffect, useState } from 'react'
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader"
import { MdFace, MdMailOutline } from 'react-icons/md'
import { TiLockOpenOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("/ProfilePng.png");
    const [avatarPreview, setAvatarPreview] = useState("/ProfilePng.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        // console.log("Sign Up Form Submitted");
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);

    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);

        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());

        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }

    }, [dispatch, error, alert, user, isUpdated, navigate]);



    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className='updateProfileContainer'>
                        <div className='updateProfileBox'>
                            <h2 className='updateProfileHeading'>Update Profile</h2>
                            <form
                                className='updateProfileForm'
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className='updateProfileName'>
                                    <MdFace />
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        required
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='updateProfileEmail'>
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        required
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div id='updateProfileImage'>
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name='avatar'
                                        accept='image/'
                                        onChange={updateProfileDataChange}
                                    />

                                </div>
                                <input
                                    type="submit"
                                    value="update"
                                    className="updateProfileBtn"
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

export default UpdateProfile