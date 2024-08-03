import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DateInput, EmailInput, NumberInput, PasswordInput, TextInput } from '../../components/Inputs';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

function ViewForm() {
    const { id } = useParams()
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputValues, setInputValues] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://form-builder-api-three.vercel.app/mockData/${id}`);
            setFormData(response?.data?.result);
        } catch (err) {
            setError(err.response.data.msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (title, event) => {
        setInputValues({
            ...inputValues,
            [title]: event.target.value,
        });
    };

    const renderContent = (item, index) => {
        const inputProps = {
            value: inputValues[item.title],
            placeholder: item.placeholder,
            onChange: (e) => handleChange(item.title, e),
        };
        switch (item.type) {
            case 'text':
                return <TextInput {...inputProps} />;
            case 'email':
                return <EmailInput {...inputProps} />;
            case 'password':
                return <PasswordInput {...inputProps} />;
            case 'number':
                return <NumberInput {...inputProps} />;
            case 'date':
                return <DateInput {...inputProps} />;
            default:
                return null;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', inputValues);
        toast.success("Form Submitted Successfully!")
    };

    if (loading) {
        return <div className='flex items-center justify-center mt-32'>
            <span className='animate-spin me-2'><FaSpinner size={20} /></span>
            Loading...
        </div>
    }
    if (error) {
        return <div className='h-screen flex items-center justify-center'>Error: {error}</div>;
    }

    return (
        <div className='px-[5%] lg:px-[20%] py-[5%]'>
            <div className='p-5 md:p-10 border-[1px] rounded-lg border-dashed border-black bg-slate-100'>
                <h1 className='text-2xl md:text-3xl text-center font-bold'>{formData?.templateTitle}</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mt-5 grid grid-cols-12 gap-5'>
                        {formData?.form?.map((item, i) => (
                            <div key={i} className='col-span-12 lg:col-span-6'>
                                <label>{item?.title}</label>
                                {renderContent(item)}
                            </div>
                        ))}
                    </div>
                    <div className='flex items-center justify-end'>
                        <button type="submit" className='mt-5 bg-[#222222] hover:bg-black/80 text-white w-fit px-5 py-2 rounded-md'>
                            Submit
                        </button>
                        <Link to={'/'}>
                            <button type='button' className='mt-5 ms-2 border-[#222222] border-[1px] text-black w-fit px-5 py-2 rounded-md'>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ViewForm
