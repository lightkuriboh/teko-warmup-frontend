import Axios from 'axios'
import { address_test, data_type_json } from '../config'

export default async function checkSession (query_data, token, success, fail) {
  await Axios({url: address_test + '/user/post_token', data: query_data, method: 'HEAD', headers: {
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
