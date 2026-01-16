import React from 'react';

export default function InputField({placeholder='', type='text', name}){
  return (
    <div className="input-field">
      <input name={name} type={type} placeholder={placeholder} />
    </div>
  );
}
