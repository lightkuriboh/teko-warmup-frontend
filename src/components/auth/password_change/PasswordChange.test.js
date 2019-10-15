import React from 'react'
import { shallow, mount } from 'enzyme'
import PasswordChange from './PasswordChange'
import { MemoryRouter } from 'react-router-dom'
import PasswordInput from "../../form_elements/PasswordInput";

// describe('Password Change', () => {
//   it('should render correctly in "debug" mode', () => {
//     const component = shallow(<PasswordChange/>)
//     expect(component).toMatchSnapshot()
//   })
// })

describe('Password Change 2', () => {
  it('should render correctly in "debug" mode', () => {
    // let component = mount(<MemoryRouter><PasswordChange/></MemoryRouter>)
    let component = mount(<PasswordChange/>)
    component.state().password = 'kuriboh'
    component.state().newPassword = 'kuriboh'
    component.state().reNewPassword = 'kuriboh'
    component.find('button[name="fuck"]').simulate('click')
    expect(component).toMatchSnapshot()
    component.unmount()
  })
})