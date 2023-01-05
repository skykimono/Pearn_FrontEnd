import {useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';
import blockApi from '../../api/blockAPI';


const useSubmitBlock = (Blocks, courseId, mode, blocksRows, setBlocksRows) => {
    let dispatch = useDispatch();
    const initialForm = useMemo(() =>{
        return {
        name: "",
        courseId: courseId,
        markdown: 'please type here...',
        type: 'markdown'
      }},[courseId])
    const [blockForm, setBlockForm] = useState(initialForm)
    const [searchBlocksData, setSearchBlocksData] = useState([])
    const [openBlockModal, setOpenBlockModal] = useState(false)
    const { name, type } = blockForm
    const onBlockFormChange = (e) => {
        setBlockForm({
          ...blockForm,
          [e.target.name]: e.target.value
        })
      }
    
    const handleBlockSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        let updateForm = {
          name: name
        }
        if (window.confirm(`Confirm to ${mode === "New" ? "create new" : "update "} block?`)) {
          let rs
          if (mode === "New")
            rs = await blockApi.createBlock(blockForm).catch(data => { return data.response })
          else
            rs = await blockApi.updateBlock(updateForm, blockForm._id).catch(data => { return data.response })
          if (await rs.status === 200) {
            if (mode === "New") {
              setBlocksRows([...blocksRows, {
                ...blockForm,
                _id: rs.data
              }])
              dispatch(setSnackbar(notifyMessage.CREATE_SUCCESS("block", "Block added.")))
            }
            else {
              let index = blocksRows.findIndex(item => item._id === blockForm._id)
              let tmp = blocksRows
              let tmpchange = tmp[index];
              tmpchange.name = name;
              tmp[index] = {
                ...tmpchange
              }
              setBlocksRows([...tmp])
              dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("block")))
            }
            setOpenBlockModal(false)
    
            if (searchBlocksData.length > 0)
              setSearchBlocksData([])
          }
          else {
            if (mode === "New") {
              if (rs.status === 400)
                dispatch(setSnackbar(notifyMessage.CREATE_FAIL("block", "Cannot create block.")))
              else
                dispatch(setSnackbar(notifyMessage.CREATE_FAIL("block")))
            } else {
              dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("block")))
            }
          }
        }
      }
      useEffect(() => {
        if (Blocks.length > 0 && Blocks !== "false") {
          setBlocksRows([...Blocks])
        }
      }, [Blocks])
      useEffect(() => {
        if (mode === "New") {
          setBlockForm(initialForm)
        }
      }, [mode, initialForm])


      return { handleBlockSubmit, blockForm, setBlockForm, name, type, onBlockFormChange, searchBlocksData, setSearchBlocksData,
    openBlockModal, setOpenBlockModal }
}

export default useSubmitBlock