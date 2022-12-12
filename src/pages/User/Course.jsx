import React from 'react'
import PropTypes from 'prop-types'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
import { useState } from 'react';
import RowCourse from "../../asset/temp/Course"
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MiniPopup from '../../components/MiniPopup';
const Course = props => {
  const [open, setOpen] = useState(false)
  const [OpenMiniPopupCourse, setOpenMiniPopupCourse] = useState(false)
  const Header = variable([
    "Id",
    "User Name",
    "Name",
    "Email",
    "Option"
  ])
  const AddStudentHeader = variable([
    "User Name",
    "Name",
    "Email",
    "Option"
  ])
  const ChangeLecturerHeader = variable([
    "User Name",
    "Name",
    "Email",
    "Option"
  ])
  const rows = [
    {
      userName: "20521865",
      name: "Ha Gia Dong",
      email: "ww34324sxcscwww@gmail.com",
      option: () => { setOpenMiniPopupCourse(true) }
    },
    {
      userName: "18521865",
      name: "Truong Phat Thinh",
      email: "wwwew1123ww@gmail.com",
      option: () => { setOpenMiniPopupCourse(true) }
    },
    {
      userName: "19521433",
      name: "Ngo Tat To",
      email: "sajdkajsasdwqhd@gmail.com",
      option: () => { setOpenMiniPopupCourse(true) }
    },
    {
      userName: "19521239",
      name: "Hoang Thuy Linh",
      email: "saj123232dkajshd@gmail.com",
      option: () => { setOpenMiniPopupCourse(true) }
    }
  ]
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const handleCreate = () => {
    // event.preventDefault()
    // event.stopPropagation()
    console.log('create');

  }
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateTitle>SE100</TemplateTitle>
      <TemplateLineAction>
        <LineAction
          name={"Change Lecturer"}
          click={openModal}
        />
      </TemplateLineAction>
      <TemplateLineAction>
        <LineAction
          name={"Add a new Student"}
          click={openModal}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={Header} Data={rows} />
        <MiniPopup
          open={OpenMiniPopupCourse}
          close={() => setOpenMiniPopupCourse(false)}
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
        open={open}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>
          <SearchBar data={[]} />
        </TemplateModalTitle>
        <TemplateModalBody>
          <MyDataGrid ColumnHeader={AddStudentHeader} Data={rows} />
        </TemplateModalBody>
        <TemplateModalAction
          funcError={closeModal}
          size="lg"
        />
      </TemplateModal>
    </Template>
  )
}

Course.propTypes = {

}

export default Course
