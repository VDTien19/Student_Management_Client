import React, { useState, useEffect } from 'react';
import { sendPut, sendGet } from '../../utils/httpUtil';

const UpdateDiligence = ({ id, onSuccess, onClose }) => {
    const [diligence, setDiligence] = useState(null);

    useEffect(() => {
        const fetchDiligence = async () => {
            try {
                const response = await sendGet(`http://localhost:8080/api/diligency/${id}`);
                setDiligence(JSON.parse(response));
            } catch (error) {
                console.error(error.message);
                alert('Error fetching diligence record');
            }
        };
        fetchDiligence();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPut(`http://localhost:8080/api/diligency/update/${id}`, diligence);
            onSuccess();
            alert('Diligence record updated successfully');
        } catch (error) {
            console.error(error.message);
            alert('Error updating diligence record');
        }
    };

    if (!diligence) return <div>Loading...</div>;

    return (
        <div>
            <h2>Update Diligence</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" value={diligence.date} onChange={(e) => setDiligence({ ...diligence, date: e.target.value })} required />
                <textarea value={diligence.notes} onChange={(e) => setDiligence({ ...diligence, notes: e.target.value })}></textarea>
                <button type="submit">Update</button>
            </form>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default UpdateDiligence;
