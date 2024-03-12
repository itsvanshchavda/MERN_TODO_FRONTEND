import React from 'react';

const ShowTasks = ({ title, description, completed, updateHandler, deleteHandler, id }) => {
    return (
        <div className='flex justify-center items-center py-5 text-white'>
            <div className='bg-zinc-700 w-[900px] max-sm:w-full h-20 rounded-md'>
                <h1 className={`text-lg px-10 py-3 ${completed ? 'line-through' : ''}`}>{title}</h1>
                <p className='text-xs px-10'>{description}</p>
            </div>

            <div className='relative right-[11em] max-2xl:right-[14em]'>
                <label className="checkbox-container px-5 ">
                    <input 
                        type="checkbox"
                        checked={completed} 
                        onChange={() => updateHandler(id, !completed)} 
                    />
                    <span className="checkmark"></span>
                </label>
                <button className='bg-indigo-500 px-10 py-2 rounded-md' onClick={() => deleteHandler(id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ShowTasks;
