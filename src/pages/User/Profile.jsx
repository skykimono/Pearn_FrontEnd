import React from 'react'
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TemplateModal, TemplateModalBody, TemplateModalAction } from '../../components/Template';
import { Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import MyButton from '../../components/MyButton';
import { useUserState } from '../../redux/user/hook';
import { Box } from '@mui/system';
import { parseToLocalDate } from '../../utils/parseDate';
import useUpdateProfile from '../../hooks/ProfilePageHooks/useUpdateProfile';
import useUpdatePassword from '../../hooks/ProfilePageHooks/useUpdatePassword';

const Profile = () => {
    //tai sao k xoa luon cai global state ten userState nay luon?
    //Don gian la vi ca 2 cai hook useUpdateProfile va useUpdatePassword deu can userState, thay vi 
    //goi o ca 2 hook thi goi me o day luon cho tien. Anti-Pattern qua thi xoa luon cung dc, goi 2 lan thoi xD
    const userState = useUserState();
    const {userForm, pictureRef, fullname, email, dateofbirth, onChange, onAvatarChange, handleUpdate, uploadPicture} = useUpdateProfile(userState);
    const {oldPassword, newPassword, renewPassword, onPasswordFormChange, open, openModal, closeModal, alert, handleSubmitChangePassword} = useUpdatePassword(userState);

    return (
        <div className='profile'>
            <div className="profile-item">
                <div className='image-container'>
                    <div className="hover" onClick={uploadPicture}>
                        <div className="hover-content ">
                            <CloudUploadIcon />
                            <input type="file" ref={pictureRef} onChange={(e) => { onAvatarChange(e) }} />
                        </div>
                    </div>
                    <div className='image'>
                        <Avatar id="avatar" alt="Avatar" variant='rounded' src={userForm.avatar} >{userForm.fullname ? userForm.fullname.charAt(0) : "User"}</Avatar>
                    </div>
                </div>
                <div className='role'>
                    {userState.user ? userState.user.role.toUpperCase() : "Role"}
                </div>
            </div>

            <Divider sx={{ height: '100%', m: 0.5, borderRightWidth: 2 }} orientation="vertical" />

            <div className="profile-item">
                <div className="profile-item-right">
                    <Box component={"form"} onSubmit={handleUpdate}>
                        <div className="profile-item-right-fields">
                            <div className="profile-item-right-fields-block">
                                <div className='label'>Full name:</div>
                                <TextField className='input' fullWidth size='small' name='fullName' value={fullname} onChange={onChange} required />
                                <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                            </div>
                            <div className="profile-item-right-fields-block btnPassword">
                                <div className='label'>Password:</div>
                                <div className="descriptions">If you lost your password, contact the administrator for help</div>
                                <div className="btnPass">
                                    <MyButton type="button" onclick={openModal} >Change Password</MyButton>
                                </div>
                                <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                            </div>
                            <div className="profile-item-right-fields-block">
                                <div className='label'>Day of birth:</div>
                                <TextField className='input' type="date" fullWidth size='small' name='dateofbirth' value={dateofbirth ? parseToLocalDate(dateofbirth) : ""} onChange={onChange} />
                                <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                            </div>
                            <div className="profile-item-right-fields-block">
                                <div className='label'>Email:</div>
                                <TextField className='input' type="email" fullWidth size='small' name='email' value={email} onChange={onChange} required />
                                <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                            </div>

                        </div>
                        <div className="profile-item-right-btn">
                            <MyButton type="submit">Update</MyButton>
                        </div>
                    </Box>
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
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='password' name='oldPassword' value={oldPassword} onChange={onPasswordFormChange} />

                    </div>
                    <div className="profile-item-right-fields-block">
                        <div className='label'>New password:</div>
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='new password' name='newPassword' value={newPassword} onChange={onPasswordFormChange} />

                    </div>
                    <div className="profile-item-right-fields-block">
                        <div className='label'>Re-New password:</div>
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='re-new password' name='renewPassword' value={renewPassword} onChange={onPasswordFormChange} />
                    </div>
                    {alert}
                </TemplateModalBody>
                <TemplateModalAction
                    activeRight={"Confirm"}
                    funcError={closeModal}
                    size="sm"
                />
            </TemplateModal>
        </div>

    )
}

Profile.propTypes = {}

export default Profile