import { toast } from "react-toastify"
import { Chip } from "@material-ui/core"
import React, {useEffect, useState} from 'react'
import { getCurrentToken } from "helpers/localStorageManager"
import SSORegisterForm from "./register_sso_form/SSORegisterForm"
import { getRegisteredDomains, registerSSOService } from "services/manage_services"

export default function SSOManagementPage (props) {
  const [ myDomains, setMyDomains ] = useState([])

  async function refresh_domains () {
    await getRegisteredDomains({}, getCurrentToken(), (resp) => {
      let _my_domains = []
      for (let domain of resp.data) {
        _my_domains.push(<Chip
          label={domain}
          color="secondary"
          variant="outlined"
        />)
      }
      setMyDomains(_my_domains)
    }, () => {
    })
  }

  useEffect( () => {
    async function wait_refreshing_data () {
      await refresh_domains()
    }
    wait_refreshing_data()
  }, [])

  const [ domain, setDomain ] = useState('')
  const [ buttonDisabled, setButtonDisabled ] = useState(false)

  function onChange (e) {
    setDomain(e.target.value)
  }

  function clickSubmit () {
    setButtonDisabled(true)
    registerSSOService(
      {
        domain: domain
      },
      getCurrentToken(),
      async (resp) => {
        if (resp.data.code === 'success') {
          await refresh_domains()
          toast.success(resp.data.msg)
        } else {
          toast.warn(resp.data.msg)
        }
        setButtonDisabled(false)
      },
      () => {
        toast.error('You have to login!')
        setButtonDisabled(false)
      })
  }

  return (
    <div>
      <hr style={{color: '#e6e6ff'}}/>
      <h3>Register your new domains for SSO login!</h3>
      <SSORegisterForm clickSubmit={ clickSubmit } onChange={ onChange } disable={ buttonDisabled }/>
      <hr style={{color: '#e6e6ff'}}/>
      <h3>Your registered domains</h3>
      { myDomains }
    </div>
  )
}
