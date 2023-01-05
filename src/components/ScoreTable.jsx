import Template, {
    TemplateData,
    TemplateSearch, TemplateModal, TemplateModalTitle,
    TemplateModalBody, TemplateModalAction
  } from '../components/Template';
import SearchBar from './SearchBar';
import MyDataGrid from './MyDataGrid';
import MiniPopup from './MiniPopup';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import React, {useState, useEffect} from 'react'
import { GradeHeaders } from '../utils/datagridHeader';
import { useGetSubmissions, useGetBlockWeight } from '../redux/block/hook';
import { setSnackbar } from '../redux/snackbar/snackbarSlice';
import { useDispatch } from 'react-redux';  
import blockApi from '../api/blockAPI';
import notifyMessage from '../utils/notifyMessage';
import Button from '@mui/material/Button';

  const ScoreTable = (props) => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const Grades = useGetSubmissions(props.blockId);
    const [rows, setRows] = useState([]);
    const [openMiniPopup, setOpenMiniPopup] = useState('');
    const [selectId, setSelectID] = useState('');
    const [searchData, setSearchData] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [score, setScore] = useState('');
    const {weight, setWeight} = useGetBlockWeight(props.blockId);

    const handleBlockSubmit = async (event) => {
      event.preventDefault()
      event.stopPropagation()
      let submitForm = {
        score: score
      }
      if (window.confirm(`Confirm to  "update " grade?`)) {
        let rs
          rs = await blockApi.submitScore(submitForm, selectId).catch(data => { return data.response })
        if (await rs.status === 200) {
            let index = rows.findIndex(item => item._id === selectId)
            let tmpRows = rows
            let tmp = tmpRows[index]
            tmp.grade = score
            tmpRows.splice(index,1,tmp)
            setRows([...tmpRows])
            dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("block")))
            setScore('')
            setOpenModal(false)
          }
          if (searchData.length > 0)
            setSearchData([])
        }
        else {
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("block")))
        }
      }
    
    const handleSetWeight = async (event) => {
      let submitForm = {
        weight: weight
      }
      if (window.confirm(`Confirm to  "set " new wight?`))
      {
        let rs
        rs = await blockApi.setWeight(submitForm, props.blockId).catch(data => { return data.response })
        if (await rs.status === 200) {
          dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("weight")))
        }
        else {
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("weight")))
      }
      }
    }
    useEffect(() => {
      if(Grades.length >0){
       let tmp = Grades.map((item) => {
          return {
            ...item,
            username: item.studentUsername,
            submission: {
              click: (id) =>{
                navigate(`/submission/${id}`)
                console.log(id)
              }
            },
            grade: item.scoreOfTen,
            option: {
              type: "option",
              click: (id) => {
                setOpenMiniPopup(id)
                setSelectID(id)
              }
            }
          }
        })
        setRows([...tmp])}
      }, [Grades])

    return (
      <Template>
        <TemplateSearch>
            <SearchBar data={rows} keyword={["username"]} onsearch={(data) => { setSearchData(data) }}/>
        </TemplateSearch>
        <div>
        <div className="template-modal-content-field-content-label" >
                Weight:
              </div>
        <div className="template-modal-content-field-content-input" >
                <TextField type='number' InputProps={{ inputProps: { min: 0 } }} required name='weight' value={weight} onChange={(e) => {setWeight(e.target.value)}} />
        </div>
        <div><Button onClick={handleSetWeight}>Submit</Button></div>
        </div>
        <TemplateData>
            <MyDataGrid ColumnHeader={GradeHeaders} Data={searchData.length > 0 ? searchData : rows}/>
            <MiniPopup
            open={openMiniPopup}
            close={() => {setOpenMiniPopup('')}}
             actions={[
              {
                name: "Edit Grade",
                click: () => {setOpenModal(true)}
              }
            ]}/>
        </TemplateData>
        <TemplateModal
        open={openModal}
        size="sm"
        form={true}
        onsubmit={handleBlockSubmit}
      >
        <TemplateModalTitle>
          <p> Edit Grade:</p>
          <Divider variant="middle" />
        </TemplateModalTitle>
        <TemplateModalBody >
          <div className="template-modal-content-field">
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter grade:
              </div>
              <div className="template-modal-content-field-content-input" >
                <TextField type='number' InputProps={{ inputProps: { min: 0, max: 10 } }} required name='grade' value={score} onChange={(e) => {setScore(e.target.value)}} />
              </div>
            </div>
            <Divider variant="middle" />
          </div>
        </TemplateModalBody>
        <TemplateModalAction activeRight={"Confirm"} funcError={() => {setOpenModal(false)
        setScore('')}} size="sm" />
      </TemplateModal>
      </Template>
    )
  }
  
  export default ScoreTable