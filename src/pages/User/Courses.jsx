import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom'
import Input from '@mui/material/Input';
import Template, {
  TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MiniPopup from '../../components/MiniPopup';
import { CourseHeaders, LecturerHeaders } from '../../utils/datagridHeader';
import useLoadCourses from '../../hooks/CoursesPageHooks/useLoadCourses';
import useAddLectures from '../../hooks/CoursesPageHooks/useAddLecture';
import useDeleteLecture from '../../hooks/CoursesPageHooks/useDeleteLecture';
import useCreateCourse from '../../hooks/CoursesPageHooks/useCreateCourse';
import useDeleteCourse from '../../hooks/CoursesPageHooks/useDeleteCourse';
const Courses = () => {
  let navigate = useNavigate()
  const { Courses ,rows, selectCourseID, selectLecturerID, OpenMiniPopupCourses, setOpenMiniPopupCourses, 
    OpenAddLecturerModal ,setOpenAddLecturerModal } = useLoadCourses();
  const { Lecturers, leturersRows, searchLecturersData, setSearchLecturersData } = useAddLectures(selectCourseID, Courses, setOpenAddLecturerModal );
  const { handleRemoveLecturer } = useDeleteLecture(selectLecturerID, selectCourseID, Courses, Lecturers, searchLecturersData
    ,setSearchLecturersData);
  const {name, code, handleCreateCourse, onCourseFormChange, OpenCreateCourseModal, setOpenCreateCourseModal
  ,searchCourseData, setSearchCourseData} = useCreateCourse();
 const {handleDeleteCourse} = useDeleteCourse(searchCourseData, setSearchCourseData, selectCourseID, Courses)
  

  return (
    <Template>
      <TemplateSearch>
        <SearchBar data={rows} keyword={["name", "code"]} onsearch={(data) => { setSearchCourseData(data) }} />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create a course"}
          click={() => setOpenCreateCourseModal(true)}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={CourseHeaders} Data={searchCourseData.length > 0 ? searchCourseData : rows} />
        <MiniPopup
          open={OpenMiniPopupCourses}
          close={() => {setOpenMiniPopupCourses('')}}
          actions={[
            {
              name: "Manage student",
              click: () => {
                  navigate(`/courses/${selectCourseID}`)
              }
            },
            {
              name: "Remove lecturer",
              click: handleRemoveLecturer
            },
            {
              name: "Delete",
              click: handleDeleteCourse
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
          <div className="template-modal-content-field">
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter course code:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input required name='code' value={code} onChange={onCourseFormChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter course name:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input required name='name' value={name} onChange={onCourseFormChange} />
              </div>
            </div>
            <Divider variant="middle" />
          </div>
        </TemplateModalBody>
        <TemplateModalAction activeRight={"Create"} funcError={() => setOpenCreateCourseModal(false)} size="sm" />
      </TemplateModal>
      <TemplateModal
        open={OpenAddLecturerModal}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>
          <SearchBar data={leturersRows} keyword={["fullname", "username"]} onsearch={(data) => { setSearchLecturersData(data) }} />
        </TemplateModalTitle>
        <TemplateModalBody >
          <MyDataGrid ColumnHeader={LecturerHeaders} Data={searchLecturersData.length > 0 ? searchLecturersData : leturersRows} />
        </TemplateModalBody>
        <TemplateModalAction funcError={() => setOpenAddLecturerModal(false)} size="lg" />
      </TemplateModal>
    </Template>
  )
}

Courses.propTypes = {

}

export default Courses
