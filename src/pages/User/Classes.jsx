import React from 'react'
import SearchBar from '../../components/SearchBar';
import { useState } from 'react';
import Template, { TemplateTitle, TemplateData, TemplateSearch } from '../../components/Template';
import { Grid } from '@mui/material';
import ClassCard from '../../components/ClassCard';
import MiniPopup from '../../components/MiniPopup';
import useGetClasses from '../../hooks/ClassHook/useGetClasses';
import { useNavigate } from 'react-router-dom';
import { useRole, useUserStateValue } from '../../redux/user/hook';

const Classes = () => {
    let navigate = useNavigate()
    const {assignedCourses} = useGetClasses();
    const Role = useRole()
    const user = useUserStateValue()
    const [OpenMiniPopupClasses, setOpenMiniPopupClasses] = useState("")
    const [selectedID, setSelcetedID] = useState("")
    const [searchCoursesData, setSearchCoursesData] = useState([])

    return (
        <Template>
            <TemplateSearch>
                <SearchBar data={assignedCourses} keyword={["coursename", "coursecode"]} onsearch={(data) => { setSearchCoursesData(data) }} />
            </TemplateSearch>
            <TemplateTitle>
                <div>
                    COURSES - {Role.toUpperCase() } - {user.fullName}
                </div>
                <div>Total Courses: {assignedCourses.length}</div>
            </TemplateTitle>
            <TemplateData>

                <Grid container spacing={2}  >

                    {
                        Role === "lecturer" ?
                            searchCoursesData.length > 0 ?
                                searchCoursesData.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item md={6} lg={3}>
                                                <ClassCard name={item.coursename} code={item.coursecode} optionclick={() => {
                                                    setOpenMiniPopupClasses(item.id)
                                                    setSelcetedID(item.id)
                                                }} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                                :
                                assignedCourses.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item md={6} lg={3}>
                                                <ClassCard name={item.coursename} code={item.coursecode} optionclick={() => {
                                                    setOpenMiniPopupClasses(item.id)
                                                    setSelcetedID(item.id)
                                                }} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                            :
                            searchCoursesData.length > 0 ?
                                searchCoursesData.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item md={6} lg={3}>
                                                <ClassCard name={item.coursename} code={item.coursecode} click={() => { navigate(item.id) }} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                                :
                                assignedCourses.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item md={6} lg={3}>
                                                <ClassCard name={item.coursename} code={item.coursecode} click={() => { navigate(item.id) }} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })

                    }
                </Grid>
                {
                    Role === "lecturer" ?
                        <MiniPopup
                            open={OpenMiniPopupClasses}
                            close={() => setOpenMiniPopupClasses("")}
                            actions={[
                                {
                                    name: "Manage Course",
                                    click: () => {
                                        navigate(`${selectedID}`)
                                    }
                                }
                            ]}
                        />
                        : <></>
                }

            </TemplateData>
        </Template>
    )
}

export default Classes
