import React from 'react'
import SearchBar from '../../components/SearchBar';
import { useState } from 'react';
import Template, { TemplateTitle, TemplateData, TemplateSearch } from '../../components/Template';
import { Grid } from '@mui/material';
import ClassCard from '../../components/ClassCard';
import useGetClasses from '../../hooks/ClassHook/useGetClasses';
import { useNavigate } from 'react-router-dom';
import { useRole, useUserStateValue } from '../../redux/user/hook';


const Classes = () => {
    let navigate = useNavigate()
    const {assignedCourses} = useGetClasses();
    const Role = useRole()
    const user = useUserStateValue()
    const [searchCoursesData, setSearchCoursesData] = useState([])
    return (
        <Template>
            <TemplateSearch>
                <SearchBar data={assignedCourses} keyword={["name", "code"]} onsearch={(data) => { setSearchCoursesData(data) }} />
            </TemplateSearch>
            <TemplateTitle>
                <div>
                    COURSES - {Role.toUpperCase() } - {user.fullname}
                </div>
                <div>Total Courses: {assignedCourses.length}</div>
            </TemplateTitle>
            <TemplateData>

                <Grid container spacing={2}  >
                    {
                            searchCoursesData.length > 0 ?
                                searchCoursesData.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item md={6} lg={3}>
                                                <ClassCard name={item.name} code={item.code} click={() => { navigate(item._id) }} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                                :
                                assignedCourses.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item md={6} lg={3}>
                                                <ClassCard name={item.name} code={item.code} click={() => { navigate(item._id) }} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                    }
                </Grid>
            </TemplateData>
        </Template>
    )
}

export default Classes
