import  { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateCapsule = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [unlockDate, setUnlockDate] = useState(new Date());
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('message', message);
        formData.append('unlockDate', unlockDate.toISOString());
        if (file) {
            formData.append('file', file);
        }

        try {
            await api.post('/capsules', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to create capsule');
        }
    };

    return (
        <div className="create-container">
            <form onSubmit={onSubmit} className="create-form">
                <h2>Create a New Time Capsule</h2>
                <input type="text" placeholder="Title for your memory" value={title} onChange={e => setTitle(e.target.value)} required />
                <textarea placeholder="Your message to the future..." value={message} onChange={e => setMessage(e.target.value)} required />
                <div className="date-picker-container">
                    <label>Select Unlock Date:</label>
                    <DatePicker selected={unlockDate} onChange={date => setUnlockDate(date)} minDate={new Date()} showTimeSelect dateFormat="Pp" />
                </div>
                <input type="file" onChange={e => setFile(e.target.files[0])} />
                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/dashboard')} className="btn-cancel">Cancel</button>
                    <button type="submit" className="btn-submit">Seal the Capsule</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCapsule;