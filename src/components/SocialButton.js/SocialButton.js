import React from 'react';
import SocialLogin from 'react-social-login';

class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <div
        onClick={triggerLogin}
        {...props}
        className='w-full inline-flex justify-center item-center focus:border-transparent'
      >
        {children}
      </div>
    );
  }
}

export default SocialLogin(SocialButton);
