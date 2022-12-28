import React from 'react'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import { useState } from 'react';
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import { Navigate, useParams } from 'react-router-dom';
import useLoadAssginedStudents from '../../hooks/ManageCourseHook/useLoadAssignedStudents';
import useAddStudents from '../../hooks/ManageCourseHook/useAddStudents';
import useRemoveStudents from '../../hooks/ManageCourseHook/useRemoveStudents';
import useChangeLecturer from '../../hooks/ManageCourseHook/useChangeLecturer';
import { assignedStudentsHeader, studentsHeaders, LecturerHeaders } from '../../utils/datagridHeader';
const Course = () => {
  const { courseId } = useParams("courseId")
  const [checkStudents, setCheckStudents] = useState([])
  const CheckStudents = (id) => {
    setCheckStudents([...id])
  }
  const {AssignedStudents, studentsAssignedRows, setStudentsAssignedRows, searchAssignedStudentsData, setSearchAssignedStudentsData} = 
  useLoadAssginedStudents(courseId)
  const {handleAddStudents, OpenAddStudentsModal, setOpenAddStudentsModal, 
    searchStudentsAddedData, setSearchStudentsAddedData, studentsAddedRows} = useAddStudents(checkStudents, courseId, studentsAssignedRows, setStudentsAssignedRows)
  const {handleRemoveStudent, OpenRemoveStudentsModal, setOpenRemoveStudentsModal, searchStudentsRemovedData,
    setSearchStudentsRemovedData} = useRemoveStudents(checkStudents, courseId, studentsAssignedRows, setStudentsAssignedRows);
  const { OpenChangeLecturerModal, setOpenChangeLecturerModal,
    searchLecturersData, setSearchLecturersData, leturersRows, course, lecturer } = useChangeLecturer(courseId);

  return (
    AssignedStudents === "false" ?
      <Navigate to="/courses" />
      :
      <Template>
        <TemplateSearch>
          <SearchBar data={studentsAssignedRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchAssignedStudentsData(data) }} />
        </TemplateSearch>
        <TemplateTitle>{course ? `${course.coursecode} - ${course.coursename}` : ""}</TemplateTitle>
        <TemplateTitle>Lecturer: {lecturer ? lecturer.fullName : "No lecturer assigned"}</TemplateTitle>
        <TemplateLineAction>
          <LineAction
            name={"Change Lecturer"}
            click={() => setOpenChangeLecturerModal(true)}
          />
        </TemplateLineAction>
        <TemplateLineAction>
          <LineAction
            name={"Add new Students"}
            click={() => setOpenAddStudentsModal(true)}
          />
        </TemplateLineAction>
        <TemplateLineAction>
          <LineAction
            name={"Remove assigned Students"}
            click={() => setOpenRemoveStudentsModal(true)}
          />
        </TemplateLineAction>
        <TemplateData>
          <MyDataGrid ColumnHeader={assignedStudentsHeader} Data={searchAssignedStudentsData.length > 0 ? searchAssignedStudentsData : studentsAssignedRows} />
        </TemplateData>
        <TemplateModal
          open={OpenAddStudentsModal}
          size="lg"
          form={true}
          onsubmit={handleAddStudents}
        >
          <TemplateModalTitle>
            <SearchBar data={studentsAddedRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchStudentsAddedData(data) }} />
          </TemplateModalTitle>
          <TemplateModalTitle>
            Add new Students
          </TemplateModalTitle>
          <TemplateModalBody>
            <MyDataGrid CheckboxFunc={CheckStudents} Checkbox ColumnHeader={studentsHeaders} Data={searchStudentsAddedData.length > 0 ? searchStudentsAddedData : studentsAddedRows} />
          </TemplateModalBody>
          <TemplateModalAction
            activeRight={"Confirm"}
            funcError={() => setOpenAddStudentsModal(false)}
            size="lg"
          />
        </TemplateModal>
        <TemplateModal
          open={OpenRemoveStudentsModal}
          size="lg"
          form={true}
          onsubmit={handleRemoveStudent}
        >
          <TemplateModalTitle>
            <SearchBar data={studentsAssignedRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchStudentsRemovedData(data) }} />
          </TemplateModalTitle>
          <TemplateModalTitle>
            Remove assigned Students
          </TemplateModalTitle>
          <TemplateModalBody>
            <MyDataGrid CheckboxFunc={CheckStudents} Checkbox ColumnHeader={studentsHeaders} Data={searchStudentsRemovedData.length > 0 ? searchStudentsRemovedData : studentsAssignedRows} />
          </TemplateModalBody>
          <TemplateModalAction
            activeRight={"Confirm"}
            funcError={() => setOpenRemoveStudentsModal(false)}
            size="lg"
          />
        </TemplateModal>
        <TemplateModal
          open={OpenChangeLecturerModal}
          size="lg"
          form={false}
        >
          <TemplateModalTitle>
            <SearchBar data={leturersRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchLecturersData(data) }} />
          </TemplateModalTitle>
          <TemplateModalBody >
            <MyDataGrid ColumnHeader={LecturerHeaders} Data={searchLecturersData.length > 0 ? searchLecturersData : leturersRows} />
          </TemplateModalBody>
          <TemplateModalAction funcError={() => setOpenChangeLecturerModal(false)} size="lg" />
        </TemplateModal>
      </Template>

  )
}

export default Course
