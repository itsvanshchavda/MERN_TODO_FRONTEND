import React from 'react';

const EditModal = ({ isOpen, closeModal, title, description, setTitle, setDescription, handleEdit }) => {
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit(title, description);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto text-black ">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block max-sm:mr-[20em]">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start ">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Task</h3>
                                        <div className="mt-2">
                                            <div className="mb-4">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    value={title}
                                                    onChange={handleTitleChange}
                                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows="3"
                                                    value={description}
                                                    onChange={handleDescriptionChange}
                                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditModal;
