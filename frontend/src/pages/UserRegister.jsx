import React from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function UserRegister(){
  return (
    <AuthLayout>
      <AuthCard title="Create your account" role="User" secondary={<span>Already have an account? <a href="/user/login">Log in</a></span>}>
        <InputField placeholder="Full name" name="name" />
        <InputField placeholder="Email address" name="email" />
        <InputField placeholder="Create password" type="password" name="password" />
        <PrimaryButton>Continue</PrimaryButton>
      </AuthCard>
    </AuthLayout>
  );
}
