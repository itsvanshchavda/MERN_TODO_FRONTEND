import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import EditModal from './EditModal';

const ShowTasks = ({ title, description, completed, updateHandler, deleteHandler, id ,handleEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const openModal = () => setIsEditing(true);
    const closeModal = () => setIsEditing(false);

    const handleEditSubmit = () => {
        handleEdit(id, newTitle, newDescription);
        closeModal(); 
    };

    return (
        <div className='flex justify-center items-center py-5 text-white'>
            <div className='bg-zinc-700 w-[900px] max-sm:w-full h-20 rounded-md'>
                <div className={`text-lg px-10 py-3 ${completed ? 'line-through' : ''}`}>
                {title}
                <FaPencilAlt className="mr-[10em] mt-[1.6rem] float-end  cursor-pointer max-xl:mr-[18rem] max-sm:float-right max-sm:mr-[12.6rem] max-sm:mt-10" onClick={openModal} />
                  
                    
                </div>
                <p className='text-xs px-10 '>{description}</p>
            </div>

            <div className='relative right-[11em] max-2xl:right-[14em] max-xl:right-[14em] max-xl:bottom-3'>
                <label className="checkbox-container md:px-5 max-sm:absolute max-sm:right-[9em] max-sm:top-2 max-xl:right-[4rem] max-xl:top-8 ">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => updateHandler(id, completed)}
                    />
                    <span className="checkmark"></span>
                </label>
                <button className='bg-indigo-500 px-10 py-2 rounded-md' onClick={() => deleteHandler(id)}>
                    Delete
                </button>
            </div>

            <EditModal
                isOpen={isEditing}
                closeModal={closeModal}
                title={newTitle}
                description={newDescription}
                setTitle={setNewTitle}
                setDescription={setNewDescription}
                handleEdit={handleEditSubmit}
            />
        </div>
    );
};

export default ShowTasks;
