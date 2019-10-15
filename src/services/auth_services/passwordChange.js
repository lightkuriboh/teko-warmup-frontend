import Axios from 'axios'
import { address_test, data_type_json } from '../config'

export default function passwordChange (query_data, success, fail, token) {
  Axios({url: address_test + '/user/change_password', data: {query_data}, method: 'POST'
    ,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': data_type_json
    },
    json: true
  })
    .then((resp) => {
      success(resp)
    })
    .catch((err) => {
      fail(err)
    })
}
