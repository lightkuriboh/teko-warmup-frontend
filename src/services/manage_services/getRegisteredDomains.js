import Axios from 'axios'
import { address_test, data_type_json } from '../config'

export default async function getRegisteredDomains (query_data, token, success, fail) {
  await Axios({url: address_test + '/sso/my_domains', data: query_data, method: 'GET', headers: {
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
