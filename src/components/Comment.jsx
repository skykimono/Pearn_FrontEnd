import React, {useState} from 'react'
import { Avatar, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useFetchComments } from '../redux/block/hook';
import blockApi from '../api/blockAPI';
import { setSnackbar } from '../redux/snackbar/snackbarSlice';
import notifyMessage from '../utils/notifyMessage';
import { useDispatch } from 'react-redux';
const Comment = (props) => {
    const dispatch = useDispatch()
    const userValue = useSelector(state => state.userState.value)
    console.log(userValue)
    const {Comments, setComments} = useFetchComments(props.blockId)
    const [postComment, setPostComment] = useState('');
    
    const handlePostComment = async () => {
        let submitForm = {
            content: postComment
        }
        let rs = await blockApi.postComments(submitForm, props.blockId).catch(data => { return data.response })
        if (await rs.status === 200) {
            let tmpRows = [...Comments]
            let tempdata ={
                commenter : {
                    fullname: userValue.fullname,
                    avatar: userValue.avatar ? userValue.avatar : ""
                },
                content: postComment,
                _id: rs.data._id
            }
            tmpRows.push(tempdata)
            setComments([...tmpRows])
            dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("block")))
            setPostComment('')
        }
        else {

            if (rs.status === 400)
                dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("block", "Docs saved!.")))
            else
                dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("block")))

        }
    };

    const deletePostComment = async (id) => {
        if (window.confirm("Delete comment ?"))
        {
            console.log(`deleting comment with id ${id}`);
            let rs = await blockApi.deleteComments(id).catch(data => { return data.response });
            if (await rs.status === 200) {
                dispatch(setSnackbar(notifyMessage.DELETE_SUCCESS("comment")))
                let index = Comments.findIndex(item => item._id === id)
               let tmp = [...Comments]
               tmp.splice(index, 1)
               setComments([...tmp])
            }
            else {
                if (rs.status === 400)
                  dispatch(setSnackbar(notifyMessage.DELETE_FAIL("comment", "Cannot delete comment.")))
                else
                  dispatch(setSnackbar(notifyMessage.DELETE_FAIL("comment")))
        
              }
        }
    }

  return (
    <div style={{ padding: 14 }} >
        <h1 className='comment-title'>Comments</h1>
        <div>
            <TextField size='large'
             multiline={true}
             rows={5} fullWidth label="Comment:" 
             onChange={(e) => setPostComment(e.target.value)}/>
        </div>
        <div className='comment-buttondiv'>
            <Button className='comment-btn' size='small' onClick={handlePostComment}>Post</Button>
        </div>
        { Comments.length > 0 ?
        Comments.map((item, index) =>{
            return <div className="comment" key={index}>
        <div className="comment-side-sidemenu-header-item bold">
            <div>
                <Avatar alt="Avatar" variant='rounded' src={item.commenter.avatar ? item.commenter.avatar : ""}> {item.commenter.fullname ? item.commenter.fullname.charAt(0) : "User"}</Avatar>
            </div>
            <h2>{item.commenter.fullname ? item.commenter.fullname : "User"}</h2>
        </div>
        <div className="comment-content">
          {item.content? item.content : ''}
        </div>
        {(item.commenter.username === userValue.username)?<div> <Button className='comment-btn' onClick={() => deletePostComment(item._id)} color="error" >Delete</Button></div>: []}
    </div>})        
        :
        <h2>There's no comment yet!</h2>}
    </div>
  )
}

export default Comment