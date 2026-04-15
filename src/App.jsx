import React, { useEffect, useState } from 'react'
import Form from './components/Form'


const App = () => {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
  })
  const [transaction, setTransaction] = useState([])
  const [isFirstLoad, setIsFirstLoad] = useState(true)


  // load from local storage
  useEffect(() => {
    const data = localStorage.getItem("transactions")
    if (data) {
      setTransaction(JSON.parse(data))
    }
    setIsFirstLoad(false)

  }, [])
  
  //save to local storage
  useEffect(() => {
    if (!isFirstLoad) {
      localStorage.setItem("transactions", JSON.stringify(transaction))
    }

  }, [transaction])






  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value }


      return updated
    })


  }
  const handleForm = (e) => {

    if (!form.title || !form.amount) {
      alert("fill all fields")
      return
    }
    e.preventDefault()

    setTransaction((prev) => [
      ...prev, { ...form, amount: Number(form.amount) }

    ])
    setForm({
      title: "",
      amount: "",
      type: "expense",
    });


  }

  const deleteItem = (index) => {
    setTransaction(prev => prev.filter((_, i) => i !== index))
  }

  const resetData = () => {
    setForm({
      title: "",
      amount: "",
      type: "expense",
    })
    setTransaction([])
  }

  const income = transaction.filter(item => item.type === "income").reduce((acc, curr) => acc + Number(curr.amount), 0)
  const expense = transaction.filter(item => item.type === "expense").reduce((acc, curr) => acc + Number(curr.amount), 0)

  const balance = income - expense;


  return (
    <div className='min-h-screen bg-black/50'>
      <Form handleForm={handleForm} handleChange={handleChange} form={form} transaction={transaction} balance={balance} resetData={resetData} deleteItem={deleteItem} />


    </div>
  )
}

export default App