import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <h1 className='text-8xl md:text-9xl'>404</h1>
            <h1 className='text-2xl mt-3'>Page Not Found️ ⚠️</h1>
            <h1 className='mt-3'>we couldn't find the page you are looking for</h1>
            <Link to={'/'}>
                <button className='mt-5 bg-[#222222] hover:bg-black/80 text-white px-5 py-2 rounded-md'>Back to home</button>
            </Link>
        </div>
    )
}

export default PageNotFound
