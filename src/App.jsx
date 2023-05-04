import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [data,setData] = useState(null)
  const [message,setMessage] = useState('')
  const [name,setName] = useState('')
  const [uName,setUName] = useState('')
  const [email,setEmail] = useState('')
  const [id,setId] = useState(null)
  const [errMessage,setErrMessage] = useState('')


  useEffect(()=>{
    let url = 'https://jsonplaceholder.typicode.com/users'
    fetch(url)
    .then((res)=>res.json())
    .then((res)=>{
      setData(res)
    })
  },[])
  //delete user
  const deleteUser=(id)=>{
    let url = `https://jsonplaceholder.typicode.com/users/${id}`
    fetch(url,{method:"DELETE"})
    .then((res)=>{
      if(!res.ok){
        throw Error("Data Not Fectched!")
      }else{
        res.json()
        setMessage("Delete successfully!")
        setTimeout(()=>{
          setMessage('')
        },1000)
      }
    })
    .then(()=>{
    })
    .catch((err)=>{
      setMessage(err)
    })
  }
  //edit user
  const edit=(id,name,uName,email)=>{
    setName(name)
    setUName(uName)
    setEmail(email)
    setId(id)
  }
  //update user
  const submit=(e)=>{
    e.preventDefault();
    if(name==='' || name===null){
      setErrMessage('Name filled is required!')
    }else if(uName==='' || uName===null){
      setErrMessage('User Name filled is required!')
    }else if(email==='' || email===null){
      setErrMessage('Email filled is required!')
    }else{
      let url = `https://jsonplaceholder.typicode.com/users/${id}`
    fetch(url,{
      method:"PUT",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        name,email,uName
      })
    })
    .then((res)=>{
      if(!res.ok){
        throw Error("Data Not Fectched!")
      }else{
        res.json()
        setMessage("Updated successfully!")
        setTimeout(()=>{
          setMessage('')
        },1000)
      }
    })
    .catch((err)=>{
      setMessage(err)
    })
    setName('')
    setUName('')
    setEmail('')
    setErrMessage('')
    }
  }
  //post data 
  const addData=()=>{
    if(name==='' || name===null){
      setErrMessage('Name filled is required!')
    }else if(uName==='' || uName===null){
      setErrMessage('User Name filled is required!')
    }else if(email==='' || email===null){
      setErrMessage('Email filled is required!')
    }
    else{
      let url = `https://jsonplaceholder.typicode.com/users`
    fetch(url,{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        name,email,uName
      })
    })
    .then((res)=>{
      if(!res.ok){
        throw Error("Data Not Fectched!")
      }else{
        res.json()
        setMessage("Add Data successfully!")
        setTimeout(()=>{
          setMessage('')
        },1000)
      }
    })
    .catch((err)=>{
      setMessage(err)
    })
    setName('')
    setUName('')
    setEmail('')
    setErrMessage('')
    }
    
  }
  return (
    <div className='container'>
    <h3 className='text-center mt-3'>Users</h3>
    <hr/>
    {
      message && <h2 className='text-success text-center mb-3'>{message}</h2>
    }
          <div className='d-flex justify-content-between'>
            <table className='table border border-2 border-success'>
              <thead>
                <tr>
                  <th className='border border-2 border-success text-center'>Id</th>
                  <th className='border border-2 border-success text-center'>Name</th>
                  <th className='border border-2 border-success text-center'>UserName</th>
                  <th className='border border-2 border-success text-center'>Email</th>
                  <th className='border border-2 border-success text-center'>Operations</th>
                </tr>
              </thead>
              <thead>
                {
                  data && data.map((item)=>{
                    return (
                <tr key={item.id}>
                  <td className='border border-2 border-success text-center'>{item.id}</td>
                  <td className='border border-2 border-success text-center'>{item.name}</td>
                  <td className='border border-2 border-success text-center'>{item.username}</td>
                  <td className='border border-2 border-success text-center'>{item.email}</td>
                  <td>
                    <button onClick={()=>edit(item.id,item.name,item.username,item.email)} className='btn btn-primary m-2'>Edit</button>

                    <button onClick={()=>deleteUser(item.id)} className='btn btn-primary'>Delete</button>
                  </td>
                </tr>
                    )
                  })
                }
              </thead>
            </table>
            <form onSubmit={submit} className='my-auto form ms-3 bg-light p-2'>
            <h2 className='text-center'>User Form</h2>
            
              <input value={name} onChange={(e)=>setName(e.target.value)} className='form-control' type='text' name='name' placeholder='Name' />
              
              <input value={uName} onChange={(e)=>setUName(e.target.value)} className='form-control mt-3' type='text' name='userName' placeholder='User Name' />
              
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control mt-3' type='email' name='email' placeholder='Email' />
              {<p className='text-danger'>{errMessage}</p>}
              <button className='btn btn-danger mt-3'>Update User</button>
              <button type='button' onClick={addData} className='mt-3 btn btn-success'>
              Add New User
            </button>
            </form>
          </div>
    </div>
  )  
}

export default App
