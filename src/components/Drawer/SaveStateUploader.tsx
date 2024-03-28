import React, { useState, type ChangeEvent } from 'react';
// import addSaveState from '@stores/SaveStates'

const SaveStateUploader: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            throw new Error('No file detected')
        }
        setLoading(true);
        const arrayBuffer = await file.arrayBuffer();
        console.log(arrayBuffer);
        setLoading(false)
    };

    return (
        <div>
            {
                loading ? <button className="btn btn-square btn-ghost">
                    <span className="loading loading-spinner"></span>
                </button> : <button className="btn btn-square btn-ghost" onClick={() => document.getElementById('saveStateInput')?.click()}>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                    </svg>
                </button>
            }

            <input
                id="saveStateInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />
        </div>
    );
};

export default SaveStateUploader;
