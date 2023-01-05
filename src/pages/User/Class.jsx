import React, { useState } from 'react'
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import ClassBlock from '../../components/ClassBlock';
import MiniPopup from '../../components/MiniPopup';
import { Divider, Grid, Input } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useFetchAllBlocks } from '../../redux/block/hook';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRole } from '../../redux/user/hook';
import useGetCourseName from '../../hooks/ClassHook/useGetCourseName';
import useSubmitBlock from '../../hooks/ClassHook/useSubmitBlock';
import useDeleteBlock from '../../hooks/ClassHook/useDeleteBlock';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AverageGradeTable from '../../components/AverageGradeTable';
import Rating from '@mui/material/Rating';
import { useFetchAverageStar } from '../../redux/course/hook';
import courseApi from '../../api/courseAPI';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';

const Class = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const { courseId } = useParams("courseId")
  const Role = useRole()
  const Blocks = useFetchAllBlocks(courseId)
  const {course} = useGetCourseName(courseId);
  const [blocksRows, setBlocksRows] = useState([]);
  const [mode, setMode] = useState("")
  const [OpenMiniPopupClass, setOpenMiniPopupClass] = useState("")
  const [tabValue, setTabValue] = useState('1')
  const {rating, setRating} = useFetchAverageStar(courseId)
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // const onRatingChange = (event, newValue) =>{
  //   setRating(newValue)
  // }
  const onRatingClick = async (e) =>{
    let data ={
      stars: e.target.value
    }
    console.log(data)
    if (window.confirm(`You want to rate this course?`)) {
     let rs = await courseApi.rateCourse(data, courseId).catch(data => { return data.response }) 
     if (await rs.status === 200) {
      dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("rating")))
     }
     else {
      if (rs.status === 400)
        dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("rating", "Cannot update rating.")))
      else
        dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("rating")))

    }
    }
  }
  const { handleBlockSubmit, blockForm, setBlockForm, name, type, onBlockFormChange, searchBlocksData, setSearchBlocksData,
    openBlockModal, setOpenBlockModal } = useSubmitBlock(Blocks, courseId, mode, blocksRows, setBlocksRows)
  const {handleDeleteBlock} = useDeleteBlock(Blocks, blocksRows, setBlocksRows, searchBlocksData, setSearchBlocksData, blockForm)


  const OpenBlockModal = () => setOpenBlockModal(true)
  const CloseBlockModal = () => setOpenBlockModal(false)
 

  return (
    Blocks === "false" ?
      <Navigate to="/courses" />
      :
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="Course List" value="1" />
            {    Role === "lecturer" ?
                <Tab label="Average Grade" value="2" />
              : []}
            </TabList>
            </Box>
            <TabPanel value="1">
              <Rating value={rating}  onClick={onRatingClick}/>
              <Template>
        <TemplateSearch>
          <SearchBar data={blocksRows} keyword={["name"]} onsearch={(data) => { setSearchBlocksData(data) }} />
        </TemplateSearch>
        <TemplateTitle>
          {`${course.code} - ${course.name}`}
        </TemplateTitle>
        {

          Role === "lecturer" ?
            <React.Fragment>
              <TemplateLineAction>
                <LineAction
                  name={"New block"}
                  click={() => {
                    setMode("New")
                    OpenBlockModal(true)
                  }}
                />

              </TemplateLineAction>

              <TemplateData>
                <Grid container spacing={2} direction={"column"}>
                  {
                    searchBlocksData.length > 0 ?
                      searchBlocksData.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Grid item lg={3} >
                              <ClassBlock name={`${item.name}`} clicknav={() => {
                                navigate(item._id)
                              }} click={() => {
                                setOpenMiniPopupClass(item.id)
                                setBlockForm({ ...blockForm, ...item })
                              }} />
                            </Grid>
                          </React.Fragment>

                        )
                      })
                      :
                      blocksRows.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Grid item lg={3} >
                              <ClassBlock name={`${item.name}`} clicknav={() => {
                                navigate(item._id)
                              }} click={() => {
                                setOpenMiniPopupClass(item.id)
                                setBlockForm({ ...blockForm, ...item })
                              }} />
                            </Grid>
                          </React.Fragment>

                        )
                      }).reverse()
                  }
                </Grid>
                <MiniPopup
                  open={OpenMiniPopupClass}
                  close={() => setOpenMiniPopupClass("")}
                  actions={[
                    {
                      name: "Rename",
                      click: () => {
                        setMode("Update")
                        setOpenBlockModal(true)
                      }
                    },
                    {
                      name: "Delete",
                      click: handleDeleteBlock
                    }
                  ]} />

              </TemplateData>
              <TemplateModal
                open={openBlockModal}
                size="sm"
                form={true}
                onsubmit={handleBlockSubmit}
              >
                <TemplateModalTitle>
                  <p>{mode === "New" ? "Create new block:" : "Rename block:"}</p>
                  <Divider variant="middle" />
                </TemplateModalTitle>
                <TemplateModalBody >
                  <TemplateModalBody >
                    <div className="template-modal-content-field">
                      <div className="template-modal-content-field-content">
                        <div className="template-modal-content-field-content-label" >
                          Enter Block name:
                        </div>
                        <div className="template-modal-content-field-content-input" >
                          <Input required name='name' value={name} onChange={onBlockFormChange} />
                        </div>
                      </div>
                      <div className="template-modal-content-field-content">
                        <div className="template-modal-content-field-content-label" >
                          Enter Type:
                        </div>
                        <div className="template-modal-content-field-content-input" >
                        <Select
                          labelId="demo-simple-select-label"
                          name="type"
                          value={type}
                          onChange={onBlockFormChange}
                          required>
                           <MenuItem value={"common"}>Common</MenuItem>
                           <MenuItem value={"exercise"}>Exercise</MenuItem>
                        </Select>
                        </div>
                      </div>
                    </div>
                  </TemplateModalBody>
                </TemplateModalBody>
                <TemplateModalAction activeRight={mode === "New" ? "Create" : "Confirm"} funcError={() => {
                  CloseBlockModal()
                }} size="sm" />
              </TemplateModal>
            </React.Fragment>
            :
            <React.Fragment>
              <TemplateData>
                <Grid container spacing={2} direction={"column"}>
                  {
                    searchBlocksData.length > 0 ?
                      searchBlocksData.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Grid item lg={3} >
                              <ClassBlock name={`${item.name}`} clicknav={() => {
                                navigate(item._id)
                              }} />
                            </Grid>
                          </React.Fragment>

                        )
                      })
                      :
                      blocksRows.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Grid item lg={3} >
                              <ClassBlock name={`${item.name}`} clicknav={() => {
                                navigate(item._id)
                              }} />
                            </Grid>
                          </React.Fragment>

                        )
                      }).reverse()
                  }
                </Grid>
              </TemplateData>
            </React.Fragment>
        }

              </Template>
            </TabPanel>
            <TabPanel value="2">
              <AverageGradeTable courseId={courseId}/>
            </TabPanel>
            </TabContext>
            </Box>
      
  )
}

export default Class