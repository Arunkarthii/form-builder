import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { CiEdit } from 'react-icons/ci'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { PiPencilLineDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom'

function Home() {

    const mockdata = [
        {
            templateTitle: 'User Form',
            form: [
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
                    placeholder: 'choose your date',
                    type: 'date',
                },
                {
                    title: 'Password',
                    placeholder: 'Enter your password',
                    type: 'password',
                },
            ]
        },
        {
            templateTitle: 'Resume Form',
            form: [
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
                    placeholder: 'choose your date',
                    type: 'date',
                },
                {
                    title: 'Password',
                    placeholder: 'Enter your password',
                    type: 'password',
                },
            ]
        }
    ]
    return (
        <div className='px-[8%] py-[5%]'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-center font-bold'>Welcome to Dynamic Form Builder</h1>
                <p className='mt-3 text-slate-500 text-center'>Start building your custom forms today!</p>
                <Link to={'/form/create'}>
                    <button className='mt-5 bg-[#222222] hover:bg-black/80 text-white px-5 py-2 rounded-md'>Create New Form</button>
                </Link>
            </div>
            <hr className='w-full mt-5' />
            <div className='md:px-[8%] mt-10'>
                <div className='grid grid-cols-12 gap-5'>
                    {mockdata && mockdata?.length > 0 ? (
                        <>
                            <div className='col-span-12'>
                                <h1 className='text-2xl'>Form Templates ({mockdata?.length})</h1>
                            </div>
                            {mockdata.map((eachTemplate, i) => (
                                <div key={i} className='col-span-12 md:col-span-6 lg:col-span-4'>
                                    <div className='shadow h-full bg-slate-100 border-[1px] border-dashed border-black rounded-lg p-5 flex items-center justify-between gap-3'>
                                        <h1 className='text-xl'>{eachTemplate?.templateTitle}</h1>
                                        <div className='flex items-center gap-2'>
                                            <span className='cursor-pointer'><FaEye size={20} /></span>
                                            <span className='cursor-pointer'><FaEdit size={20} /></span>
                                            <span className='cursor-pointer'><FaTrash size={18} /></span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className='col-span-12'>
                            <h1 className='mt-10 text-xl font-bold'>Forms</h1>
                            <p className='text-slate-500'>You have no forms created yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
