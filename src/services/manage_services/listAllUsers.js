import Axios from 'axios'
import { address_test, data_type_json, } from '../config'

export default function listUsers (query_data, token, success, fail) {
  Axios({url: address_test + '/user/list_users', data: query_data, method: 'GET', headers: {
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
