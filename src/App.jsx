import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import { Trash } from 'lucide-react'


const App = () => {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
  })




  const [transaction, setTransaction] = useState([])
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [storeEdit, setStoreEdit] = useState(null)
  const [isfilterData, setFilterData] = useState("")
  const [showChart, setShowChart] = useState(false)




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


  // toggle chart
  const toggleChart = () => {
    setShowChart(prev => !prev)
  }



  // input handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      return updated
    })


  }

  // search list

  // const filteredData = transaction.filter(form.title.toLowerCase().includes(isfilterData.toLowerCase()))
  const filteredData = transaction.map((item, index) => ({ ...item, originalIndex: index })).filter((item) => item.title.toLowerCase().includes(isfilterData.toLowerCase()))







  // handle form
  const handleForm = (e) => {

    if (!form.title || !form.amount) {
      alert("fill all fields")
      return
    }
    e.preventDefault()

    if (storeEdit !== null) {
      const updated = [...transaction]   // copy array
      updated[storeEdit] = { ...form, amount: Number(form.amount) } // replace item

      setTransaction(updated)  // update state
      setStoreEdit(null)       // reset edit mode

    } else {

      setTransaction((prev) => [
        ...prev, { ...form, amount: Number(form.amount) }

      ])

    }

    setForm({
      title: "",
      amount: "",
      type: "expense",
    });


  }


  const deleteItem = (index) => {
    setTransaction(prev => prev.filter((_, i) => i !== index))
  }

  const editList = (index) => {
    setStoreEdit(index)

    setForm(transaction[index])


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

  const ChartData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ]

  const balance = income - expense;


  return (
    <div className='min-h-screen bg-black/50'>
      <Form handleForm={handleForm} handleChange={handleChange} form={form} balance={balance} resetData={resetData} deleteItem={deleteItem} editList={editList} filteredData={filteredData} setFilterData={setFilterData} toggleChart={toggleChart} showChart={showChart} ChartData={ChartData} />


    </div>
  )
}

export default App