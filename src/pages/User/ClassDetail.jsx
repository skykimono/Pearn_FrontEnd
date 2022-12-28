import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MarkdownEditor, { getCommands, defaultCommands } from '@uiw/react-markdown-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import onImagePasted from '../../utils/onImagePasted'
import { useFetchAllAssignedCourses } from '../../redux/course/hook';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchAllBlocks } from '../../redux/block/hook';
import { useRole } from '../../redux/user/hook';
import MyButton from '../../components/MyButton';
import blockApi from '../../api/blockAPI';
import notifyMessage from '../../utils/notifyMessage';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import { useDispatch } from 'react-redux';


const ClassDetail = props => {
    useFetchAllAssignedCourses()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { courseId } = useParams("courseId")
    const { blockId } = useParams("blockId")
    const Role = useRole()
    const Blocks = useFetchAllBlocks(courseId)
    const [value, setValue] = useState("")
    const [block, setBlock] = useState({})


    const onChange = (e) => {
        console.log(e);
        setValue(e)
    }
    const handleSubmitDoc = async () => {
        let submitForm = {
            ...block,
            markdownDocument: value
        }

        if (window.confirm(`Confirm to update block?`)) {
            let rs = await blockApi.updateBlock(submitForm).catch(data => { return data.response })

            if (await rs.status === 200) {
                dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("block")))

            }
            else {

                if (rs.status === 400)
                    dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("block", "Docs saved!.")))
                else
                    dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("block")))

            }
        }
    }
    const Drop = (e) => {
        e.preventDefault();

        var imageUrl = e.dataTransfer.getData('text/html');

        if (imageUrl) {
            let src = new DOMParser().parseFromString(imageUrl, "text/html")
                .querySelector('img').src;
            if (src)
                onImagePasted(src, setValue)
        }
        else {
            var file = e.dataTransfer.files

            if (FileReader && file) {
                var fr = new FileReader();
                fr.onload = function () {
                    onImagePasted(fr.result, setValue)

                }
                fr.readAsDataURL(file[0]);
            }
        }
    }
    const DragOver = (e) => {
        e.preventDefault();
    }
    const DragLeave = (e) => {
        e.preventDefault();
    }
    const DragEnter = (e) => {
        e.preventDefault();
    }
    const Paste = (e) => {
        e.preventDefault();
        var file = e.clipboardData.files

        if (FileReader && file) {
            var fr = new FileReader();
            fr.onload = function () {
                onImagePasted(fr.result, setValue)
            }
            fr.readAsDataURL(file[0]);
        }
    }
    useEffect(() => {
        if (Blocks.length > 0) {
            let index = Blocks.findIndex(item => item.id === blockId)
            if (index !== -1) {
                setBlock(Blocks[index])
                let tmp = Blocks[index].markdownDocument
                if (tmp !== null)
                    setValue(Blocks[index].markdownDocument)
            }

            else
                navigate(-1)

        }
    }, [Blocks])
    return (
        Object.keys(block).length > 0 ?
            <React.Fragment>
                <div className="classdetail-title">
                    <div className='classdetail-title-txt'>
                        {
                            block.name ? block.name : "Block Name"
                        }
                    </div>
                    {Role === "lecturer" ?
                        <MyButton size="lg" onclick={handleSubmitDoc} >Save</MyButton>
                        : <></>
                    }
                </div>

                {
                    Role === "lecturer" ?
                        <div className=" classdetail-md">
                            <MarkdownEditor
                                draggable={true}
                                id="textareamd"
                                value={value}
                                visible
                                height='480px'
                                onChange={ onChange}
                               
                                
                                // onPaste={async (event) => {
                                //     await onImagePasted(event.clipboardData, setValue);
                                // }}
                                // onDrag={async (event) => {
                                //     await onImagePasted(event.dataTransfer, setValue);
                                // }}
                                onPaste={Paste}
                                onDrop={Drop}
                                onDragEnter={DragEnter}
                                onDragOver={DragOver}
                                onDragLeave={DragLeave}
                            />
                        </div>
                        :
                        <div className=" classdetail-md">
                            <MarkdownPreview source={value} />
                        </div>

                }
            </React.Fragment>
            : <></>

    )
}

ClassDetail.propTypes = {
    title: PropTypes.string
}

export default ClassDetail