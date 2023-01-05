import { useEffect } from "react";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
import notifyMessage from "../../utils/notifyMessage";
import { useDispatch } from "react-redux";
import blockApi from "../../api/blockAPI";

const useDeleteBlock = (Blocks, blocksRows, setBlocksRows, searchBlocksData, setSearchBlocksData, blockForm) =>{
    let dispatch = useDispatch();

    const handleDeleteBlock = async () => {

        if (window.confirm(`Delete this block?`)) {
    
    
          let rs = await blockApi.deleteBlock(blockForm._id).catch(data => { return data.response })
          if (await rs.status === 200) {
    
            dispatch(setSnackbar(notifyMessage.DELETE_SUCCESS("block")))
            let index = blocksRows.findIndex(item => item._id === blockForm._id)
            let tmp = blocksRows
            tmp.splice(index, 1)
            setBlocksRows([...tmp])
    
            if (searchBlocksData.length > 0)
              setSearchBlocksData([])
          }
          else {
            if (rs.status === 400)
              dispatch(setSnackbar(notifyMessage.DELETE_FAIL("block", "Cannot delete block.")))
            else
              dispatch(setSnackbar(notifyMessage.DELETE_FAIL("block")))
    
          }
        }
      }
    
      useEffect(() => {
        if (Blocks.length > 0 && Blocks !== "false") {
          setBlocksRows([...Blocks])
        }
      }, [Blocks])
      
      return{handleDeleteBlock}
}

export default useDeleteBlock