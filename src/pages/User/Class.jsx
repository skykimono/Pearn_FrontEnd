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
import { Grid } from '@mui/material';
const Class = () => {
  const count = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  const [OpenMiniPopupClass, setOpenMiniPopupClass] = useState(false)
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateTitle>SE100 - Object Oreienetdf sddasdasdadsadasdsad</TemplateTitle>
      <TemplateLineAction>
        <LineAction
          name={"New block"}
        // click={openModal}
        />
      </TemplateLineAction>
      <TemplateData>
        <Grid container spacing={2} direction={"column"}>
          {
            count.map((item, index) => {
              return (
                <Grid item lg={3} >
                  <ClassBlock key={index} name={`Let ${index + 1} - Hafasdkdsakjhdkasjhdhkjashdsjakd`} click={() => { setOpenMiniPopupClass(true) }} />
                </Grid>
              )
            })
          }
        </Grid>
        <MiniPopup
          open={OpenMiniPopupClass}
          close={() => setOpenMiniPopupClass(false)}
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

export default Class