import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TemplateModal, TemplateModalBody, TemplateModalAction } from '../../components/Template';
import { Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import MyButton from '../../components/MyButton';
import { useRef } from 'react';

const Profile = () => {
    const pictureRef = useRef(null)
    const [open, setOpen] = useState(false)
    const uploadPicture = () => pictureRef.current.click()

    const onChange = (e) => {
        var file = e.target.files
        if (FileReader && file && file.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('avatar').childNodes[0].src = fr.result;
            }
            fr.readAsDataURL(file[0]);
        }
    }

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)
    const handleSubmitChangePassword = (event) => {
        event.preventDefault()
        event.stopPropagation()
    }
    return (

        <div className='profile'>

            <div className="profile-item">
                <div className='image-container'>
                    <div className="hover" onClick={uploadPicture}>
                        <div className="hover-content ">
                            <CloudUploadIcon />
                            <input type="file" name="" id="" ref={pictureRef} onChange={(e) => { onChange(e) }} />
                        </div>
                    </div>
                    <div className='image'>
                        <Avatar id="avatar" alt="Avatar" variant='rounded' src={require('../../asset/pictures/avatar.jpg')} />

                    </div>
                </div>
                <div className='role'>
                    Moderator
                </div>
            </div>

            <Divider sx={{ height: '100%', m: 0.5, borderRightWidth: 2 }} orientation="vertical" />

            <div className="profile-item">
                <div className="profile-item-right">
                    <div className="profile-item-right-fields">
                        <div className="profile-item-right-fields-block">
                            <div className='label'>Full name:</div>
                            <TextField className='input' fullWidth size='small' placeholder='name' name='name' />
                            <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                        </div>
                        <div className="profile-item-right-fields-block btnPassword">
                            <div className='label'>Password:</div>
                            <div className="descriptions">If you lost your password, contact the administrator for help</div>
                            <div className="btnPass">
                                <MyButton onclick={openModal} >Change Password</MyButton>
                            </div>
                            <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                        </div>
                        <div className="profile-item-right-fields-block">
                            <div className='label'>Day of birth:</div>
                            <TextField className='input' type="date" fullWidth size='small' placeholder='name' name='date' />
                            <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                        </div>
                        <div className="profile-item-right-fields-block">
                            <div className='label'>Email:</div>
                            <TextField className='input' type="email" fullWidth size='small' placeholder='name' name='mail' />
                            <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                        </div>
                    </div>
                    <div className="profile-item-right-btn">
                        <MyButton>Update</MyButton>
                    </div>
                </div>
            </div>
            <TemplateModal
                open={open}
                size="sm"
                form={true}
                onsubmit={handleSubmitChangePassword}
            >
                <TemplateModalBody>
                    <div className="profile-item-right-fields-block">
                        <div className='label'>Current password:</div>
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='password' name='currentpassword' />

                    </div>
                    <div className="profile-item-right-fields-block">
                        <div className='label'>New password:</div>
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='new password' name='newpassword' />

                    </div>
                    <div className="profile-item-right-fields-block">
                        <div className='label'>Re-New password:</div>
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='new password' name='renewpassword' />
                    </div>
                </TemplateModalBody>
                <TemplateModalAction
                    funcError={closeModal}
                    size="sm"
                />
            </TemplateModal>
        </div>

    )
}

Profile.propTypes = {}

export default Profile