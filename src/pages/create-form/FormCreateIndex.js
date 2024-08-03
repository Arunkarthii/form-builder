import React, { useRef, useState } from 'react'
import { CiBoxList, CiEdit, CiTrash } from 'react-icons/ci'
import { MdOutlineDashboard } from 'react-icons/md';

function FormCreateIndex() {
    const [templateTitle, setTemplateTitle] = useState('Untitled Form')
    const [editingIndex, setEditingIndex] = useState(null);
    const inputRef = useRef(null);
    const [form, setForm] = useState([
        {
            title: 'Name',
            placeholder: 'Enter your name',
            type: 'text',
        },
        {
            title: 'Email',
            placeholder: 'Enter your email',
            type: 'email',
        },
        {
            title: 'Age',
            placeholder: 'Enter your age',
            type: 'number',
        },
        {
            title: 'Date',
            placeholder: 'Choose your date',
            type: 'date',
        },
        {
            title: 'Password',
            placeholder: 'Enter your password',
            type: 'password',
        },
    ]);

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

    return (
        <div className='px-[8%] py-[5%]'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-center font-bold'>Create New Form Template</h1>

                <button className='mt-5 bg-[#222222] hover:bg-black/80 text-white px-5 py-2 rounded-md'>Create New Form</button>
            </div>
            <div className='grid grid-cols-12 md:px-[8%] mt-10'>
                <div className='col-span-12 md:col-span-8'>
                    <div className='h-full border-[1px] border-dashed border-black rounded-l-lg p-5'>
                        <div className='flex justify-center'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-center font-bold text-3xl'>{templateTitle}  </h1>
                                <span onClick={handleEditClick} className='cursor-pointer text-blue-600'><CiEdit size={28} /></span>
                            </div>
                        </div>
                        <div className='mt-5 grid grid-cols-12 gap-6'>
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
                        </div>
                    </div>
                </div>
                <div className='col-span-12 md:col-span-4'>
                    <div className='border-[1px] border-dashed border-l-0 border-black rounded-e-lg p-5'>
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
        </div >
    )
}

export default FormCreateIndex
