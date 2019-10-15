import Axios from 'axios'
import { address_test } from 'services/config'

export default function password_change (query_data, success, fail) {
  Axios({url: address_test + '/user/reset_password', data: {query_data}, method: 'POST'})
    .then((resp) => {
      success(resp)
    })
    .catch((err) => {
      fail(err)
    })
}
