import React, { useContext, useState } from 'react';
import SocialButton from '../../SocialButton.js/SocialButton';
import { processSocialLoginAsync } from '../../../store/actions/Auth';
import { AuthContext } from '../../../context/AuthContext';
// import { useHistory } from 'react-router-dom';
import { notificationHandler } from './../../../libs/util/Notification';
import LoadingOverlay from 'react-loading-overlay';
import {
  FacebookLoginButton,
  AppleLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

const SocialAuth = ({ authType }) => {
  const [isActive, setIsActive] = useState(false);
  const { dispatch } = useContext(AuthContext);
  // const history = useHistory();

  const handleSocialLogin = async (user) => {
    if (user) {
      setIsActive(false);
      await processSocialLoginAsync(dispatch, {
        provider: user._provider,
        accessToken: user._token.idToken || user._token.accessToken,
      });
      setIsActive(false);
      notificationHandler('success', 'Login successful');
      setTimeout(() => {
        window.location.reload(false);
      }, 300);
    }
  };

  const handleSocialLoginFailure = (err) => {
    if (err) {
      setIsActive(false);
      notificationHandler('error', 'Social auth failed, try again later');
    }
  };

  return (
    <LoadingOverlay active={isActive} spinner text='Redirecting...'>
      <div className='mt-8'>
        {/* <p className='text-sm font-medium text-gray-700'>
          Sign {authType === 'login' ? 'in' : 'up'} with
        </p> */}

        <div className='mt-1 flex flex-grow flex-col w-full'>
          <div className='flex-grow'>
            <SocialButton
              provider='facebook'
              appId='848956739279480'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              {/* <span className='sr-only'>
                Sign {authType === 'login' ? 'in' : 'up'} with Facebook
              </span> */}
              <FacebookLoginButton
                iconSize='22'
                className='flex items-center justify-center border border-gray-200'
                style={{ display: 'flex !important' }}
              >
                <span className='text-base'>Continue with Facebook</span>
              </FacebookLoginButton>
            </SocialButton>
          </div>

          <div className='flex-grow'>
            <SocialButton
              provider='google'
              appId='531872509560-uhj7urf5176umtn9lfca8g1u0k67h105.apps.googleusercontent.com'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              {/* <span className='sr-only'>Sign {authType === 'login' ? 'in' : 'up'} with Google</span> */}
              <GoogleLoginButton
                iconSize='22'
                className='flex items-center justify-center border border-gray-200'
                style={{ display: 'flex !important' }}
              >
                <span className='text-base'>Continue with Google</span>
              </GoogleLoginButton>
            </SocialButton>
          </div>

          {/* <div className='flex-grow'>
            <AppleLogin clientId='com.whipik.dev' redirectURI='https://redirectUrl.com' />
          </div> */}

          <div className='flex-grow'>
            <SocialButton
              provider='google'
              appId='531872509560-uhj7urf5176umtn9lfca8g1u0k67h105.apps.googleusercontent.com'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              <span className='sr-only'>Sign {authType === 'login' ? 'in' : 'up'} with Google</span>
              <AppleLoginButton
                iconSize='22'
                className='flex items-center justify-center border border-gray-200'
                style={{ display: 'flex !important' }}
              >
                <span className='text-base'>Continue with Apple</span>
              </AppleLoginButton>
            </SocialButton>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default SocialAuth;
