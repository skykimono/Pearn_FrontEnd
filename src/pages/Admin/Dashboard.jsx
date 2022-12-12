import { Grid } from '@mui/material'
import React from 'react'
import Block from '../../components/Block'

const Dashboard = () => {
  return (
    <Grid container spacing={1} direction={"column"} >
      <Grid item >
        <Block >
          <div className='dashboard'>
            <div className='dashboard-header'>
              <div className="dashboard-header-title">
                Welcome to Pearn admin Panel
              </div>
            </div>
            <div className="dashboard-body">
              <div className="dashboard-body-item">
                <div className="dashboard-body-item-title">
                  Total Users
                </div>
                <div className="dashboard-body-item-value">
                  12362
                </div>
              </div>
              <div className="dashboard-body-item">
                <div className="dashboard-body-item-title">
                  Total Coures
                </div>
                <div className="dashboard-body-item-value">
                  122
                </div>
              </div>
              <div className="dashboard-body-item">
                <div className="dashboard-body-item-title">
                  Active Users
                </div>
                <div className="dashboard-body-item-value">
                  252
                </div>
              </div>
            </div>
          </div>
        </Block>
      </Grid>
      <Grid item >
        <Block >
          Account
        </Block>
      </Grid>
      <Grid item >
        <Block >
          Course
        </Block>
      </Grid>

    </Grid>

  )
}

export default Dashboard
