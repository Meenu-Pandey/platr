import React from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function UserLogin(){
  return (
    <AuthLayout>
      <AuthCard title="Welcome back" role="User" secondary={<span>New here? <a href="/user/register">Create an account</a></span>}>
        <InputField placeholder="Email address" name="email" />
        <InputField placeholder="Password" type="password" name="password" />
        <PrimaryButton>Continue</PrimaryButton>
      </AuthCard>
    </AuthLayout>
  );
}
