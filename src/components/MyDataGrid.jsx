import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from "@mui/x-data-grid"
import DataGridOptions from './DataGridOptions'
import DataGridAdd from './DataGridAdd'
import MyButton from './MyButton'
import { findElementById } from '../utils/uitility'
import { useFetchAllLecturers, useLecturers } from '../redux/user/hook'
const MyDataGrid = props => {
    useFetchAllLecturers()
    const Lecturers = useLecturers()
    const [pageSize, setPageSize] = React.useState(6);
    const checkList = props.CheckboxFunc ? props.CheckboxFunc : () => { console.log("null"); }
    const columns = props.ColumnHeader ?
        props.ColumnHeader.map((item) => {
            return {
                field: item.key === "id" ? "no." : item.key,
                headerName: item.key === "id" ? "No." : item.value,
                width: item.width,
                headerAlign: 'center',
                align: 'center',
                renderCell: (params) => {
                    if (params.field === "lecturerId") {
                        if (params.value) {
                            if (typeof (params.value) === "function")
                                return (<DataGridAdd click={() => { params.row.lecturerId(params.row.id) }} />)
                            else {

                                let element = findElementById(params.value, Lecturers)
                                if (element)
                                    return element.fullName
                                // return params.value
                            }
                        }
                    }
                    else if (params.field === "option") {
                        let id = params.row.id
                        let type = params.row.option.type ? params.row.option.type : ""
                        let func = params.row.option.click ? params.row.option.click : () => { console.log("null here") }
                        let lecturerId = params.row.lecturerId ? typeof (params.row.lecturerId) === "function" ? "" : params.row.lecturerId : ""

                        if (type === "option")
                            return (<DataGridOptions click={() => { func(id, lecturerId) }} />)
                        else if (type === "confirm")
                            return (<MyButton size="sm" onclick={() => func(id)} >Confirm</MyButton>)
                        else if (type === "delete")
                            return ""
                        // return <DataGridOptions click={() => func(id, name)} type={type} />
                    }


                }

            }
        }) : []
    const rows = props.Data ? props.Data.map((item, index) => {
        let keys = Object.keys(item)
        let values = Object.values(item)
        let row = {}
        for (let i = 0; i < keys.length; i++) {
            row = {
                ...row,
                [keys[i]]: values[i]
            }
        }
        return {
            id: index + 1,
            ...row
        }
    }) : []


    return (
        <React.Fragment>
            <DataGrid
                // density='comfortable'
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[6, 10, 15]}
                checkboxSelection={props.Checkbox}
                disableSelectionOnClick
                onSelectionModelChange={(id) => { checkList(id) }}
                loading={rows ? rows.length > 0 ? false : true : true}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </React.Fragment>

    )
}

MyDataGrid.propTypes = {
    ColumnHeader: PropTypes.array,
    Data: PropTypes.array,
    Checkbox: PropTypes.bool,
    CheckboxFunc: PropTypes.func
}

export default MyDataGrid