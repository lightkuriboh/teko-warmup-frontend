import Axios from 'axios'
import { address_test, data_type_json } from '../config'

export default function registerSSOService (query_data, token, success, fail) {
  Axios({url: address_test + '/sso/register', data: query_data, method: 'POST', headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': data_type_json
    }
  })
    .then((resp) => {
      success(resp)
    })
    .catch((err) => {
      fail(err)
    })
}
