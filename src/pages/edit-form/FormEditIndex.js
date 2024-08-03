import React, { useEffect, useState } from 'react'
import FormCreateIndex from '../create-form/FormCreateIndex'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FormEditIndex() {
    const { id } = useParams()
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (error) {
        return <div className='h-screen flex items-center justify-center'>Error: {error}</div>;
    }

    return (
        <div>
            <FormCreateIndex formData={formData} isEdit={true} isLoading={loading} />
        </div>
    )
}

export default FormEditIndex
