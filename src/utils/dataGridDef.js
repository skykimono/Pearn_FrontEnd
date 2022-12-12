const columns = ColumnHeader => {
    return ColumnHeader.map((item) => {
        return {
            field: item.key,
            headerName: item.key === "id" ? "Number" : item.value,
            width: item.width,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                if (params.field === "lecturer")
                    return params.value ? params.value : (<DataGridAdd />)
                else if (params.field === "option")
                    return (<DataGridOptions click={openOptionMenu} />)
            }

        }
    })
} 