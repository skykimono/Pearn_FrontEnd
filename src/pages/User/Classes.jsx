import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import { useState } from 'react';
import Template, {
    TemplateTitle, TemplateLineAction, TemplateData,
    TemplateSearch, TemplateModal, TemplateModalTitle,
    TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import { Grid } from '@mui/material';
import ClassCard from '../../components/ClassCard';
import useMousePosition from '../../utils/mousePosition'
import MiniPopup from '../../components/MiniPopup';

const Classes = () => {

    const [OpenMiniPopupClasses, setOpenMiniPopupClasses] = useState(false)

    return (
        <Template>
            <TemplateSearch>
                <SearchBar />
            </TemplateSearch>
            <TemplateTitle>CLASSES</TemplateTitle>
            <TemplateLineAction>
                <LineAction
                    name={"Show hidden classes"}
                    checkbox
                // click={openModal}
                />
            </TemplateLineAction>
            <TemplateData>

                <Grid container spacing={2} >
                    <Grid item lg={3}>
                        <ClassCard name="Nguyen haong Thai Duong" optionclick={() => { setOpenMiniPopupClasses(true) }} />
                    </Grid>
                    <Grid item lg={3}>
                        <ClassCard name="Nguyen haong Thai Duong" />
                    </Grid>
                    <Grid item lg={3}>
                        <ClassCard name="Nguyen haong Thai Duong" />
                    </Grid>
                    <Grid item lg={3}>
                        <ClassCard name="Nguyen haong Thai Duong" />
                    </Grid>
                    <Grid item lg={3}>
                        <ClassCard name="Nguyen haong Thai Duong" />
                    </Grid>
                    <Grid item lg={3}>
                        <ClassCard name="Nguyen haong Thai Duong" />
                    </Grid>
                    <Grid item lg={3}>
                        <ClassCard name="Nguyen haong Thai Duong" />
                    </Grid>
                    <Grid item lg={3}>
                        <ClassCard name="Nguyen haong Thai Duong" />
                    </Grid>
                </Grid>
                <MiniPopup
                    open={OpenMiniPopupClasses}
                    close={() => setOpenMiniPopupClasses(false)}
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
                    ]} />
            </TemplateData>
        </Template>
    )
}

export default Classes
