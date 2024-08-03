import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { CiEdit, CiTrash } from 'react-icons/ci'
import { FaSpinner } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';

function FormCreateIndex({ formData, isEdit, isLoading }) {
    const [templateTitle, setTemplateTitle] = useState('Untitled Form')
    const [errorMsg, setErrorMsg] = useState('')
    const [editingIndex, setEditingIndex] = useState(null);
    const inputRef = useRef(null);
    const [form, setForm] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()

    const [newField, setNewField] = useState({
        title: '',
        placeholder: '',
        type: '',
    });

    const handleEditClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewField((prevField) => ({
            ...prevField,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            setForm((prevForm) =>
                prevForm.map((field, index) =>
                    index === editingIndex ? newField : field
                )
            );
            setEditingIndex(null);
        } else {
            setForm((prevForm) => [...prevForm, newField]);
        }
        setNewField({
            title: '',
            placeholder: '',
            type: '',
        });
    };

    const handleEdit = (index) => {
        setNewField(form[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        setForm((prevForm) => prevForm.filter((_, i) => i !== index));
    };

    const isSubmitDisabled = !newField.title || !newField.type;

    const finalFormCreate = async () => {
        const payload = {
            templateTitle: templateTitle,
            form: form
        }

        if (templateTitle === '') {
            return setErrorMsg('*Please enter template title!')
        }
        if (form.length > 20) {
            return setErrorMsg('*Maximum 20 inputs allowed!')
        }
        if (form.length < 1) {
            return setErrorMsg('*Minimum 1 input!')
        }

        setErrorMsg('')

        if (isEdit) {
            try {
                const response = axios.put(`https://form-builder-api-three.vercel.app/mockdata/${id}`, payload)
                toast.success('Changes Updated Successfully!')
            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {
                const response = axios.post(`https://form-builder-api-three.vercel.app/mockData`, payload)
                toast.success('Form Created Successfully!')
                navigate('/')
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    useEffect(() => {
        setErrorMsg('')
    }, [form])


    useEffect(() => {
        if (templateTitle === '') {
            setErrorMsg('*Please enter template title!')
        } else {
            setErrorMsg('')
        }
    }, [templateTitle])

    useEffect(() => {
        if (isEdit) {
            setTemplateTitle(formData?.templateTitle)
            setForm(formData?.form)
        }
    }, [formData])

    return (
        <div className='px-[5%] md:px-[8%] py-[5%]'>
            <h1 className='text-2xl md:text-3xl text-center font-bold'>{isEdit ? 'Edit Form Template' : 'Create New Form Template'}</h1>
            <div className='grid grid-cols-12 md:px-[8%] mt-10'>
                <div className='col-span-12 lg:col-span-8'>
                    <div className='h-full border-[1px] border-dashed border-black rounded-lg lg:rounded-r-none lg:rounded-l-lg p-5'>
                        <div className='flex justify-center'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-center font-bold text-xl md:text-3xl'>{templateTitle}  </h1>
                                <span onClick={handleEditClick} className='cursor-pointer text-blue-600'><CiEdit size={28} /></span>
                            </div>
                        </div>
                        {isLoading ? (
                            <div className='flex items-center justify-center mt-24'>
                                <span className='animate-spin me-2'><FaSpinner size={20} /></span>
                                Loading...
                            </div>
                        ) : (
                            <div className='mt-5 grid grid-cols-12 gap-6'>
                                {form?.length > 0 ? (
                                    <>
                                        {form?.map((item, i) => (
                                            <div key={i} className='col-span-12 lg:col-span-6'>
                                                <div className='flex items-center justify-between bg-slate-100 p-3 rounded-md'>
                                                    <div className='w-full pe-8'>
                                                        <h1 className='border-b-[1px] border-slate-500 w-full pb-3'>{item?.title}</h1>
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span
                                                            className='cursor-pointer text-blue-600'
                                                            onClick={() => handleEdit(i)}
                                                        >
                                                            <CiEdit size={24} />
                                                        </span>
                                                        <span
                                                            className='cursor-pointer text-red-600'
                                                            onClick={() => handleDelete(i)}
                                                        >
                                                            <CiTrash size={24} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className='col-span-12'>
                                        <h1 className='text-center mt-32 mb-32'>Add New Input to Proceed!</h1>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-4'>
                    <div className='border-[1px] border-dashed border-t-0 lg:border-t-[1px] lg:border-l-0 border-black rounded-lg lg:rounded-s-none lg:rounded-e-lg p-5'>
                        <div className='flex flex-col'>
                            <label>Template Title</label>
                            <input
                                className='h-11 w-full border-[1px] border-slate-500 px-5 mt-1 rounded-md'
                                ref={inputRef}
                                type="text"
                                value={templateTitle}
                                onChange={(e) => setTemplateTitle(e.target.value)}
                                name="templateTitle"
                                id="templateTitle"
                                placeholder='Enter template title'
                            />
                        </div>

                        <div className='mt-5 p-3 bg-slate-100 rounded-md'>
                            <h1 className='text-center font-bold'>Add/Edit Input</h1>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className='flex flex-col'>
                                        <label htmlFor="title">Title*</label>
                                        <input
                                            className='h-11 w-full border-[1px] border-slate-500 px-5 mt-1 rounded-md'
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder='Enter your title'
                                            value={newField.title}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='flex flex-col mt-3'>
                                        <label htmlFor="placeholder">Placeholder</label>
                                        <input
                                            className='h-11 w-full border-[1px] border-slate-500 px-5 mt-1 rounded-md'
                                            type="text"
                                            name="placeholder"
                                            id="placeholder"
                                            placeholder='Enter your placeholder'
                                            value={newField.placeholder}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='flex flex-col mt-3'>
                                        <label htmlFor="type">Type*</label>
                                        <select
                                            className='h-11 w-full border-[1px] border-slate-500 ps-5 mt-1 rounded-md'
                                            name="type"
                                            id="type"
                                            value={newField.type}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">---Select One---</option>
                                            <option value="text">Text</option>
                                            <option value="email">Email</option>
                                            <option value="number">Number</option>
                                            <option value="password">Password</option>
                                            <option value="date">Date</option>
                                        </select>
                                    </div>
                                    <button
                                        type='submit'
                                        disabled={isSubmitDisabled}
                                        className={`mt-5 w-full px-5 py-2 rounded-md text-white ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#222222] hover:bg-black/80'}`}
                                    >
                                        {editingIndex !== null ? 'Update' : 'Submit'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <button onClick={finalFormCreate} className='mt-5 bg-[#222222] hover:bg-black/80 text-white hover:shadow-xl px-5 py-2 rounded-md'>{isEdit ? 'Save Changes' : 'Create New Form'}</button>
                    <Link to={'/'}>
                        <button className='mt-5 ms-3 border-[#222222] border-[1px] text-black hover:shadow-xl px-5 py-2 rounded-md'>Cancel</button>
                    </Link>
                </div>
                <p className='text-red-500 mt-2'>{errorMsg}</p>
            </div>
        </div >
    )
}

export default FormCreateIndex
