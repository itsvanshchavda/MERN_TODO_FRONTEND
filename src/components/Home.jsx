import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { server } from '../../server';
import toast from 'react-hot-toast';
import ShowTasks from './ShowTasks';
import AuthContext from '../context/AuthContext';




const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [errorThrown, setErrorThrown] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);




  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${server}/tasks/mytask`, {
        withCredentials: true,
      });
      setTasks(response.data.tasks);
      setErrorThrown(false);
    } catch (err) {
      if (!errorThrown) {
        setErrorThrown(true);
        toast.error(err.response.data.message);
      }
    } finally {

    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${server}/tasks/addtask`, {

        title,
        description,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setRefresh(prev => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }


  };

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
      setRefresh(prev => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };





  const handleEdit = async (id, setTitle, setDescription) => {

    try {
      await axios.put(`${server}/tasks/${id}`, {
        title: setTitle,
        description: setDescription,
      }, {
        withCredentials: true
      });
      toast.success("Task updated successfully");
      setRefresh(prev => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${server}/tasks/${id}`, {}, {
        withCredentials: true,
      });
      toast.success(data.message);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
      setRefresh(prev => !prev);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);




  return <>
    <h1 className="text-xl my-10 font-bold mb-4 text-center">Welcome to the Home Page</h1>

    <div className=''>
      <form className='' onSubmit={submitHandler}>
        <div className='flex justify-center flex-col items-center my-10'>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='pb-3 border px-5 py-2 w-[18em]' placeholder='Add title' />
          <input required value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='px-5 border mt-5 py-3 w-[18em]' placeholder='Add description' />
          <button disabled={loading} className="mt-5 btn">
            Add Todo
          </button>
        </div>

      </form>
    </div>

    <div className='max-sm:w-[700px] max-xl:w-[90em] max-xl:pr-[50%] max-2xl:w-[87rem] '>
      {tasks.map((item) => (
        <ShowTasks
          key={item._id}
          id={item._id}
          title={item.title}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          completed={item.completed}
          description={item.description}
          handleEdit={(id, title, description) => handleEdit(id, title, description)}

        />))}
    </div>
  </>
}




export default Home