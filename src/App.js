
import React from 'reactn'
import { toast } from 'react-toastify'
import Home from './components/home/Home'
import { AllUsers, SSO } from "./views"
import Personal from './components/profile/Personal'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { updateGlobalState } from "./helpers"
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Login, Register, Logout, PasswordChange, PasswordReset } from './components/auth'
import Admin from './components/admin/Admin'
import { PersonalTab, About, AboutTab, LoginTab, AdminTab, AllUsersTab, AnotherWebsiteTab } from './views'

toast.configure()

updateGlobalState()

export default class App extends React.Component{
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <AppBar className="MyBar" position="static">
            <Tabs>
              <Link to="/" style={{
                color: 'inherit', textDecoration: 'none'
              }}>
                <Tab label="Home"/>
              </Link>
              {/*<LoginTab visible={!this.global.loggedIn}/>*/}
              <LoginTab visible={true}/>
              <PersonalTab visible={this.global.loggedIn}/>
              <AboutTab/>
              <AdminTab/>
              <AllUsersTab/>
              <Logout/>
              <AnotherWebsiteTab/>
            </Tabs>
          </AppBar>
          <div style={{padding: '20px', margin: '0 auto', textAlign: 'center'}}>
            <Route exact path="/" component={ Home } />
            <Route path="/login/:pre?" component={ Login }/>
            <Route path="/register" component={ Register }/>
            <Route path="/change_pass" component={ PasswordChange }/>
            <Route path="/reset_pass" component={ PasswordReset }/>
            <Route path="/personal" component={ Personal }/>
            <Route path="/about" component={ About }/>
            <Route path="/admin" component={ Admin }/>
            <Route path="/all_users" component={ AllUsers }/>
            <Route path="/sso" component={ SSO }/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

