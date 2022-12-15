import React, { useState } from 'react'
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import variable from '../../utils/variable'
import MiniPopup from '../../components/MiniPopup';
import useLoadUser from '../../hooks/useLoadUser';
const Accounts = (props) => {
  const {users} = useLoadUser();
  const [openMiniPopupAccounts, setOpenMiniPopupAccounts] = useState(false);
  const headers = variable([
    "Id",
    "Username",
    "Fullname",
    "Email",
    "Role",
    "Option"
  ])

 
  const rows = users.map(user =>({
    id: user._id,
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
    option: () => setOpenMiniPopupAccounts(true)
  }));

  const deleteAccountHandler = (e) =>{
      console.log(e);
  }
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create an account"}

        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={headers}  Data={rows}/>
        <MiniPopup
        open={openMiniPopupAccounts}
        close={() =>setOpenMiniPopupAccounts(false)}
        actions={
          [
            {
          name: "Delete Account",
          click: deleteAccountHandler
            }
          ]
        }/>
      </TemplateData>
      <TemplateModal
        open={false}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>
          <SearchBar data={[]} />
        </TemplateModalTitle>
        <TemplateModalBody>
          <MyDataGrid ColumnHeader={headers} data={rows}/>
        </TemplateModalBody>
        <TemplateModalAction
          size="lg"
        />
      </TemplateModal>
    </Template>
  )
}

export default Accounts