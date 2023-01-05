import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import onImagePasted from '../../utils/onImagePasted'
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBlock } from '../../redux/block/hook';
import { useRole } from '../../redux/user/hook';
import MyButton from '../../components/MyButton';
import blockApi from '../../api/blockAPI';
import notifyMessage from '../../utils/notifyMessage';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ScoreTable from '../../components/ScoreTable';
import { useGetMySubmit } from '../../redux/block/hook';
import Comment from '../../components/Comment';
const ClassDetail = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { blockId } = useParams("blockId")
    const Role = useRole()
    const block = useFetchBlock(blockId)
    const {submit, setSubmit} = useGetMySubmit(blockId)
    const [value, setValue] = useState("")
    const [tabValue, setTabValue] = useState('1')

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

    const handleSubmitExercise = async () => {
        let submitForm = {
            markdown: submit
        }
        if (window.confirm(`Confirm to update block?`)) {
            let rs = await blockApi.submitExercise(submitForm, blockId).catch(data => { return data.response })

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


    const onChange = (e) => {
        // console.log(e);
        setValue(e)
    }
    const onSubmissionChange = (e) =>[
        setSubmit(e)
    ]
    const handleSubmitDoc = async () => {
        let submitForm = {
            markdown: value
        }

        if (window.confirm(`Confirm to update exam?`)) {
            let rs = await blockApi.updateBlockContent(submitForm, blockId).catch(data => { return data.response })

            if (await rs.status === 200) {
                dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("exam")))

            }
            else {

                if (rs.status === 400)
                    dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("exam", "Docs saved!.")))
                else
                    dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("exam")))

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
        if(Object.keys(block).length > 0){
            console.log(block)
                let tempValue = block.content.content;
                if (tempValue !== null){
                    setValue(tempValue)}
                    else
                    navigate(-1)
                }
                } , [block])
    return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="View" value="1" />
            {   ( Role === "lecturer" && block.blockType === "exercise") ?
                <Tab label="Scoring" value="2" />
            :
            []}
            {   ( Role === "student" && block.blockType === "exercise") ?
                <Tab label="Submission" value="3" />
            :
            []}
            <Tab label="Comments" value ='4' />
          </TabList>
        </Box>
        <TabPanel value="1">
        {Object.keys(block).length > 0 ?
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
            : <></>}
        </TabPanel>
        <TabPanel value="2"><ScoreTable blockId={blockId}/></TabPanel>
        <TabPanel value="3">
        <div className=" classdetail-md">
                            <MarkdownEditor
                                draggable={true}
                                id="textareamd"
                                value={submit}
                                visible
                                height='480px'
                                onChange={onSubmissionChange}
                                onPaste={Paste}
                                onDrop={Drop}
                                onDragEnter={DragEnter}
                                onDragOver={DragOver}
                                onDragLeave={DragLeave}
                            />
                        </div>
                               {
                                block.blockType === "exercise" ?
                                <div className='classdetail-btn'>
                                <MyButton className='classdetail-btn-button' onclick={handleSubmitExercise}>Submit Exercise</MyButton>
                                </div>
                                :
                                <></>
                            }

        </TabPanel>
        <TabPanel value='4'>
            <Comment blockId={blockId}/>
        </TabPanel>
      </TabContext>
    </Box>
    )
}

ClassDetail.propTypes = {
    title: PropTypes.string
}

export default ClassDetail