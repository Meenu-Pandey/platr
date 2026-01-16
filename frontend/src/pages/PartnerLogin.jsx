import React from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function PartnerLogin(){
  return (
    <AuthLayout>
      <AuthCard title="Partner login" role="Food Partner" secondary={<span>Need an account? <a href="/food-partner/register">Sign up</a></span>}>
        <InputField placeholder="Contact email" name="email" />
        <InputField placeholder="Password" type="password" name="password" />
        <PrimaryButton>Continue</PrimaryButton>
      </AuthCard>
    </AuthLayout>
  );
}
