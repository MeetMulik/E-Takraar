import React, { useState } from 'react';

function LinkChecker() {
    const [url, setUrl] = useState('');
    const [strictness, setStrictness] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/ipqs/${url}`);
            const data = await response.json();
            setResult(data);
            setError(null);
        } catch (error) {
            setResult(null);
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4 h-screen">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="flex items-center border-b-2 border-teal-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Enter a URL"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {result && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-4">
                    <h2 className="text-2xl font-bold mb-4">Result</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <p className="text-lg mb-2">Unsafe:</p>
                            <p className="text-gray-700 text-base">{result.unsafe.toString()}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-lg mb-2">Domain:</p>
                            <p className="text-gray-700 text-base">{result.domain}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-lg mb-2">IP Address:</p>
                            <p className="text-gray-700 text-base">{result.ip_address}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-lg mb-2">Malware:</p>
                            <p className="text-gray-700 text-base">{result.malware.toString()}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-lg mb-2">Phishing:</p>
                            <p className="text-gray-700 text-base">{result.phishing.toString()}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-lg mb-2">Suspicious:</p>
                            <p className="text-gray-700 text-base">{result.suspicious.toString()}</p>
                        </div>
                    </div>
                </div>
            )}
            {error && (
                <div className="max-w-lg mx-auto mt-4">
                    <h2 className="font-bold mb-2">Error</h2>
                    <p className="text-red-500">{error}</p>
                </div>
            )}
        </div>
    );
}

export default LinkChecker;
