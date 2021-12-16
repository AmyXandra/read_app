import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../components/forms/auth/Login';
const Login = () => {
  return (
    <AuthLayout title='Sign in to your account' authType='login'>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
