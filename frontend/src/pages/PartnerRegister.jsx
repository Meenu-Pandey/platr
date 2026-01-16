import React from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function PartnerRegister(){
  return (
    <AuthLayout>
      <AuthCard title="Partner sign up" role="Food Partner" secondary={<span>Already onboard? <a href="/food-partner/login">Log in</a></span>}>
        <InputField placeholder="Business name" name="business" />
        <InputField placeholder="Contact email" name="email" />
        <InputField placeholder="Create password" type="password" name="password" />
        <PrimaryButton>Continue</PrimaryButton>
      </AuthCard>
    </AuthLayout>
  );
}
