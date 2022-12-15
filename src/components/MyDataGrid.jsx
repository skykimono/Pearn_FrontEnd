import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from "@mui/x-data-grid"
import DataGridOptions from './DataGridOptions'
import DataGridAdd from './DataGridAdd'
import useMousePosition from '../utils/mousePosition'
const MyDataGrid = props => {
    // const mousePosition = useMousePosition()
    // const dataGridFunctionRef = useRef(null)
    const [pageSize, setPageSize] = React.useState(5);

    // const closeOptionMenu = () => {
    //     let valid = document.activeElement.children[0] ? document.activeElement.children[0].classList : ""
    //     if (!(valid.value === "gridoption")) {
    //         dataGridFunctionRef.current.classList.remove('show')
    //         window.removeEventListener('click', closeOptionMenu)
    //     }
    // }
    // const openOptionMenu = () => {
    //     dataGridFunctionRef.current.style.top = `${mousePosition.y + 5 + document.documentElement.scrollTop}px`
    //     dataGridFunctionRef.current.style.left = `${mousePosition.x + 5}px`
    //     dataGridFunctionRef.current.classList.add('show')
    //     window.addEventListener('click', closeOptionMenu)
    // }
    const columns = props.ColumnHeader ?
        props.ColumnHeader.map((item) => {
            return {
                field: item.key,
                headerName: item.key === "id" ? "No." : item.value,
                width: item.width,
                headerAlign: 'center',
                align: 'center',
                renderCell: (params) => {
                    if (params.field === "lecturer") {
                        if (params.value) {
                            if (typeof (params.value) === "function")
                                return (<DataGridAdd click={params.row.lecturer} />)
                            else
                                return params.value
                        }
                    }
                    else if (params.field === "option")
                        return (<DataGridOptions click={params.row.option} params={params.value} />)

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
                rowsPerPageOptions={[5, 10, 15]}
                // checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
            {/* <div className="datagrid-function" ref={dataGridFunctionRef}>
                <div className="datagrid-function-item">
                    Add a Student
                </div>
                <div className="datagrid-function-item">
                    Manage students
                </div>
                <div className="datagrid-function-item">
                    Remove lecturer
                </div>
            </div> */}

        </React.Fragment>

    )
}

MyDataGrid.propTypes = {
    ColumnHeader: PropTypes.array,
    Data: PropTypes.array
}

export default MyDataGrid