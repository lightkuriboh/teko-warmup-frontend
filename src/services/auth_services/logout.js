import Axios from 'axios'
import { address_test } from 'services/config'

export default function logout (query_data, token, success, fail) {
  Axios({url: address_test + '/user/logout', data: query_data, method: 'HEAD', headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((resp) => {
      success(resp)
    })
    .catch((err) => {
      fail(err)
    })
}
