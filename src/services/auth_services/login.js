import Axios from 'axios'
import { address_test, data_type_json } from '../config'

export default function login (query_data, success, fail) {
  Axios({url: address_test + '/user/login', data: {query_data}, method: 'POST', headers: {
      'Content-Type': data_type_json
  }})
    .then((resp) => {
      success(resp)
    })
    .catch((err) => {
      fail(err)
    })
}
