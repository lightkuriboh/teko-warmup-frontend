import Axios from "axios"

import { address_test, data_type_json } from "services/config"

export default function unlockUser(query_data, token, success, fail) {
  Axios({url: address_test + '/manage/user/unlock', data: {query_data}, method: 'POST', headers: {
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
