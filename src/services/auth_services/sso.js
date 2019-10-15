import Axios from 'axios'
import { address_test } from 'services/config'

export default function sso (query_data, success, fail) {
  Axios({url: address_test + '/user/sso_login', data: {query_data}, method: 'POST'})
    .then((resp) => {
      success(resp)
    })
    .catch((err) => {
      fail(err)
    })
}
