import React from 'react';
import { shallow } from 'enzyme';
import PasswordReset from './PasswordReset'
describe('Password R', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<PasswordReset/>)
    expect(component).toMatchSnapshot()
  })
})