import React from 'react';

export const TextInput = ({ value, placeholder, onChange }) => (
    <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='h-11 w-full border-[1px] border-slate-500 px-5 mt-1 rounded-md'
    />
);

export const EmailInput = ({ value, placeholder, onChange }) => (
    <input
        type="email"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='h-11 w-full border-[1px] border-slate-500 px-5 mt-1 rounded-md'
    />
);

export const PasswordInput = ({ value, placeholder, onChange }) => (
    <input
        type="password"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='h-11 w-full border-[1px] border-slate-500 px-5 mt-1 rounded-md'
    />
);

export const NumberInput = ({ value, placeholder, onChange }) => (
    <input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='h-11 w-full border-[1px] border-slate-500 px-5 mt-1 rounded-md'
    />
);

export const DateInput = ({ value, placeholder, onChange }) => (
    <input
        type="date"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='h-11 w-full border-[1px] border-slate-500 px-5 mt-1 rounded-md'
    />
);
