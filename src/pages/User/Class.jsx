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
import { useFetchAllBlocks } from '../../redux/block/hook';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRole } from '../../redux/user/hook';
import useGetCourseName from '../../hooks/ClassHook/useGetCourseName';
import useSubmitBlock from '../../hooks/ClassHook/useSubmitBlock';
import useDeleteBlock from '../../hooks/ClassHook/useDeleteBlock';
const Class = () => {
  let navigate = useNavigate()
  const { courseId } = useParams("courseId")
  const Role = useRole()
  const Blocks = useFetchAllBlocks(courseId)
  const {course} = useGetCourseName(courseId);
  const [blocksRows, setBlocksRows] = useState([]);
  const [mode, setMode] = useState("")
  const [OpenMiniPopupClass, setOpenMiniPopupClass] = useState("")
  const { handleBlockSubmit, blockForm, setBlockForm, name, onBlockFormChange, searchBlocksData, setSearchBlocksData,
    openBlockModal, setOpenBlockModal } = useSubmitBlock(Blocks, courseId, mode, blocksRows, setBlocksRows)
  const {handleDeleteBlock} = useDeleteBlock(Blocks, blocksRows, setBlocksRows, searchBlocksData, setSearchBlocksData, blockForm)


  const OpenBlockModal = () => setOpenBlockModal(true)
  const CloseBlockModal = () => setOpenBlockModal(false)
 

  return (
    Blocks === "false" ?
      <Navigate to="/courses" />
      :
      <Template>
        <TemplateSearch>
          <SearchBar data={blocksRows} keyword={["name"]} onsearch={(data) => { setSearchBlocksData(data) }} />
        </TemplateSearch>
        <TemplateTitle>
          {`${course.coursecode} - ${course.coursename}`}
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
                                navigate(item.id)
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
                                navigate(item.id)
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
                                navigate(item.id)
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
                                navigate(item.id)
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
  )
}

export default Class