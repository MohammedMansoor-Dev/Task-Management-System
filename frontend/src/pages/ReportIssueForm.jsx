import React, { useState } from 'react';

const ReportIssueForm = () => {
    const [issueType, setIssueType] = useState('');
    const [taskId, setTaskId] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        const issueData = {
            issueType,
            taskId,
            description,
            priority,
        };

        try {
            // Use axios to send a POST request
            const response = await axios.post('http://localhost:8000/admin-dashboard/send-settings', issueData);

            if (response.status === 200) {
                setSuccessMessage('Issue reported successfully!');
                setIssueType('');
                setTaskId('');
                setDescription('');
                setPriority('low');
            } else {
                throw new Error('Failed to report issue');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='w-full flex items-center h-[99vh]'>
            <div className="w-full p-6 bg-[#1E2938] rounded-lg shadow-lg max-w-2xl mx-auto">
                <h2 className="text-3xl font-semibold text-blue-500 mb-4">Report an Issue</h2>

                {successMessage && (
                    <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>
                )}

                {errorMessage && (
                    <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Issue Type */}
                    <div className="mb-4">
                        <label htmlFor="issueType" className="block text-lg text-white mb-2">
                            Issue Type
                        </label>
                        <select
                            id="issueType"
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-white rounded-md"
                            required
                        >
                            <option value="">Select Issue Type</option>
                            <option value="bug">Bug</option>
                            <option value="feature">Feature Request</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Task ID */}
                    <div className="mb-4">
                        <label htmlFor="taskId" className="block text-lg text-white mb-2">
                            Task ID (Optional)
                        </label>
                        <input
                            type="text"
                            id="taskId"
                            value={taskId}
                            onChange={(e) => setTaskId(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-white rounded-md"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg text-white mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-white rounded-md"
                            placeholder="Describe the issue you're facing"
                            required
                        ></textarea>
                    </div>

                    {/* Priority */}
                    <div className="mb-4">
                        <label htmlFor="priority" className="block text-lg text-white mb-2">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-white rounded-md"
                            required
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Issue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportIssueForm;
