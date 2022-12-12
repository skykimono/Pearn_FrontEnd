import React from 'react'
import PropTypes from 'prop-types'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import Rows from '../../asset/temp/Courses'
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import MyButton from '../../components/MyButton';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MiniPopup from '../../components/MiniPopup';
const Courses = props => {
  const [OpenCreateCourseModal, setOpenCreateCourseModal] = useState(false)
  const [OpenAddLecturerModal, setOpenAddLecturerModal] = useState(false)
  const [OpenMiniPopupCourses, setOpenMiniPopupCourses] = useState(false)
  const headers = variable([
    "Id",
    "Code",
    "Class Name",
    "Lecturer",
    "Option"
  ])
  const rows = [{
    code: "SE110",
    className: "Object Oriented Analysis and Design",
    lecturer: () => setOpenAddLecturerModal(true),
    option: () => setOpenMiniPopupCourses(true)
  },
  {
    code: "SE111",
    className: "Object Oriented Analysis and Design",
    lecturer: "Nguyễn Hoàng Thái Dương",
    option: () => setOpenMiniPopupCourses(true)
  },
  {
    code: "SE132",
    className: "Object Oriented Analysis and Design",
    lecturer: () => setOpenAddLecturerModal(true),
    option: () => setOpenMiniPopupCourses(true)
  },
  {
    code: "SE105",
    className: "Object Oriented Analysis and Design",
    lecturer: "Nguyễn Hoàng Thái Dương",
    option: () => setOpenMiniPopupCourses(true)
  }]
  const openCreateCourseModal = () => setOpenCreateCourseModal(true)
  const closeCreateCourseModal = () => setOpenCreateCourseModal(false)
  const openAddLecturerModal = () => setOpenAddLecturerModal(true)
  const closeAddLecturerModal = () => setOpenAddLecturerModal(false)

  const handleCreateCourse = (event) => {
    event.preventDefault()
    event.stopPropagation()

  }
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateTitle>SE100</TemplateTitle>
      <TemplateLineAction>
        <LineAction
          name={"Create a course"}
          click={openCreateCourseModal}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={headers} Data={rows} />
        <MiniPopup
          open={OpenMiniPopupCourses}
          close={() => setOpenMiniPopupCourses(false)}
          actions={[
            {
              name: "Add a student",
              click: null
            },
            {
              name: "Manage student",
              click: null
            },
            {
              name: "Remove lecturer",
              click: null
            }
          ]}
        />
      </TemplateData>
      <TemplateModal
        open={OpenCreateCourseModal}
        size="sm"
        form={true}
        onsubmit={handleCreateCourse}
      >
        <TemplateModalTitle>
          <p> Create new course:</p>
          <Divider variant="middle" />
        </TemplateModalTitle>
        <TemplateModalBody >
          <div className="courses-modal-content-field">
            <div className="courses-modal-content-field-content">
              <div className="courses-modal-content-field-content-label" >
                Enter course code:
              </div>
              <div className="courses-modal-content-field-content-input" >
                <Input required />
              </div>
            </div>
            <div className="courses-modal-content-field-content">
              <div className="courses-modal-content-field-content-label" >
                Enter course name:
              </div>
              <div className="courses-modal-content-field-content-input" >
                <Input required />
              </div>
            </div>
            <Divider variant="middle" />
          </div>
        </TemplateModalBody>
        <TemplateModalAction funcError={closeCreateCourseModal} size="sm" />
      </TemplateModal>
      <TemplateModal
        open={OpenAddLecturerModal}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>

        </TemplateModalTitle>
        <TemplateModalBody >
          <MyDataGrid ColumnHeader={headers} />
        </TemplateModalBody>
        <TemplateModalAction funcError={closeAddLecturerModal} size="lg" />
      </TemplateModal>
    </Template>
  )
}

Courses.propTypes = {

}

export default Courses
