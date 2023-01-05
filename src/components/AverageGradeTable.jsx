import React, { useState, useEffect } from 'react'
import Template, {
    TemplateData,
    TemplateSearch
  } from '../components/Template';
import MyDataGrid from './MyDataGrid';
import SearchBar from './SearchBar';
import { AverageGradeHeaders } from '../utils/datagridHeader';
import { useFetchAverageScore } from '../redux/block/hook';

const AverageGradeTable = (props) => {
    const [rows, setRows] = useState([]);
    const [searchData, setSearchData] = useState('');
    const averageScore = useFetchAverageScore(props.courseId);
    useEffect(() => {
        if(averageScore.length >0){
         let tmp = averageScore.map((item) => {
            return {
              username: item._id,
              averagegrade: item.score
            }
          })
          setRows([...tmp])}
        }, [averageScore])
  return (
    <Template>
        <TemplateSearch>
            <SearchBar data={rows} keyword={["username", "averagegrade"]} onsearch={(data) => { setSearchData(data) }}/>
        </TemplateSearch>
        <TemplateData>
            <MyDataGrid ColumnHeader={AverageGradeHeaders} Data={searchData.length > 0 ? searchData : rows}/> 
        </TemplateData>
    </Template>
  )
}

export default AverageGradeTable