import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { server } from '../../server';
import toast from 'react-hot-toast';
import ShowTasks from './ShowTasks';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';



const Home = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);
  const submitHanlder = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.post(`${server}/tasks/addtask`, {
        title, description
      }, {

        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }

      })
      toast.success(data.message)
      setRefresh((prev) => (!prev));
      setTitle("");
      setDescription("");
      setLoading(false)
    } catch (err) {
      toast.error(err.response.data.message)
      setLoading(false)
      console.log(err)
    }
  }

  const updateHandler = async (id, checked) => {
    try {
      await axios.put(
        `${server}/tasks/${id}`,
        { completed: !checked },
        {
          withCredentials: true,
        }
      );
      toast.success("Task updated successfully");
      setRefresh((prev) => (!prev));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {}, {
        withCredentials: true
      })
      toast.success(data.message)
      setRefresh((prev) => (!prev));
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    axios.get(`${server}/tasks/mytask`, {
      withCredentials: true,
    }).then((res) => setTasks(res.data.tasks)).catch((err) => toast.error(err.response.data.message))

  }, [refresh])

  if (!isAuthenticated) return <Navigate to='/login' />



  return <>
    <h1 className="text-xl my-10 font-bold mb-4 text-center">Welcome to the Home Page</h1>

    <div className=''>
      <form className='' onSubmit={submitHanlder}>
        <div className='flex justify-center flex-col items-center my-10'>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='pb-3 border px-5 py-2 w-[18em]' placeholder='Add title' />
          <input required value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='px-5 border mt-5 py-3 w-[18em]' placeholder='Add description' />
          <button disabled={loading} className="mt-5 btn">
            Add Todo
          </button>
        </div>

      </form>
    </div>

    <div className='max-sm:w-[33rem] max-xl:pl-20 max-2xl:w-[87rem]  '>
      {tasks.map((item) => (
        <ShowTasks key={item._id} id={item._id} title={item.title} updateHandler={updateHandler} deleteHandler={deleteHandler} completed={item.completed} description={item.description} />
      ))}
    </div>
  </>
}




export default Home