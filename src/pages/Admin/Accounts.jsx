import Template, {
  TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import { Divider, Input } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { parseToLocalDate } from '../../utils/parseDate';
import MiniPopup from '../../components/MiniPopup';
import { AccountHeaders } from '../../utils/datagridHeader';
import useLoadAccounts from '../../hooks/AccountsPageHooks/useLoadAccounts';
import useDeleteAccounts from '../../hooks/AccountsPageHooks/useDeleteAccount';
import useCreateAccount from '../../hooks/AccountsPageHooks/useCreateAccount';

const Accounts = () => {
  const {rows, OpenMiniPopupAccounts, setOpenMiniPopupAccounts, selectID} = useLoadAccounts();
  const { username, password, email, fullName, role, repassword,
    dateOfBirth, onChange, onCreateAccountSubmit,
    openNewAccountModal, setopenNewAccountModal, alert } = useCreateAccount();
  const {deleteAccount, searchData, setSearchData} = useDeleteAccounts(selectID);
  
  return (
    <Template>
      <TemplateSearch>
        <SearchBar data={rows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchData(data) }} />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create an account"}
          click={() => setopenNewAccountModal(true)}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={AccountHeaders} Data={searchData.length > 0 ? searchData : rows} />
        <MiniPopup
          open={OpenMiniPopupAccounts}
          close={() => setOpenMiniPopupAccounts("")}
          actions={[
            {
              name: "Delete account",
              click: () => { deleteAccount() }
            }
          ]} />

      </TemplateData>
      <TemplateModal
        open={openNewAccountModal}
        size="sm"
        form={true}
        onsubmit={onCreateAccountSubmit}
      >
        <TemplateModalTitle>
          <p> Create new account:</p>
          <Divider variant="middle" />
        </TemplateModalTitle>
        <TemplateModalBody>
          <div className="template-modal-content-field">
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Username:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='text' required name="username" value={username} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Full Name:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='text' required name="fullName" value={fullName} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Date of birth:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='date' name="dateOfBirth" value={parseToLocalDate(dateOfBirth)} onChange={onChange} />
              </div>
            </div>

            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Email:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='email' required name="email" value={email} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Password:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='password' required name="password" value={password} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Re-Password:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='password' required name="repassword" value={repassword} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Role:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Select
                  labelId="demo-simple-select-label"
                  name="role"
                  value={role}
                  onChange={onChange}
                  required
                >
                  <MenuItem value={"student"}>student</MenuItem>
                  <MenuItem value={"lecturer"}>lecturer</MenuItem>
                  <MenuItem value={"mod"}>mod</MenuItem>
                </Select>

              </div>
            </div>
            {alert}
          </div>
        </TemplateModalBody>
        <TemplateModalAction
          activeRight={"Create"}
          size="sm"
          funcError={() => { setopenNewAccountModal(false) }}
        />
      </TemplateModal>
    </Template >
  )
}

export default Accounts