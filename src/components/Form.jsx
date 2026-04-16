import React from 'react';
import { Trash, PencilIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip } from "recharts"

const Form = ({ handleForm, form, handleChange, balance, resetData, deleteItem, editList, filteredData, setFilterData, toggleChart, showChart, ChartData }) => {
    return (
        <div className='w-full min-h-screen p-3 bg-[#0f172a] text-white'>

            {/* MAIN CARD */}
            <form
                onSubmit={handleForm}
                className='max-w-3xl mx-auto rounded-xl p-6 md:p-10
                bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]
                border border-purple-500 transition-all duration-500
                hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] flex flex-col items-center'
            >

                {/* HEADING */}
                <h1 className="text-2xl md:text-3xl font-extrabold text-center 
                bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 
                bg-clip-text text-transparent animate-pulse tracking-wider mb-5">
                    Expense Tracker
                </h1>

                {/* INPUT BOX */}
                <div className='w-full max-w-md flex flex-col gap-5 bg-white/10 p-5 rounded-lg'>

                    <input
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        placeholder='Title'
                        className='w-full bg-white text-black py-2 px-3 rounded-lg outline-none'
                        type="text"
                    />

                    <input
                        name='amount'
                        value={form.amount}
                        onChange={handleChange}
                        placeholder='Amount'
                        className='w-full bg-white text-black py-2 px-3 rounded-lg outline-none'
                        type="number"
                    />

                    <select
                        name='type'
                        value={form.type}
                        onChange={handleChange}
                        className='w-full bg-white text-black py-2 rounded-lg outline-none'
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>

                    <button
                        type='submit'
                        className='w-full py-2 rounded-lg font-bold uppercase
                        bg-gradient-to-r from-purple-500 to-pink-500
                        hover:from-pink-500 hover:to-purple-500 transition-all'
                    >
                        Add
                    </button>
                </div>

                {/* LIVE PREVIEW */}
                <div className='mt-5 w-full max-w-md bg-white/10 p-4 rounded-lg text-sm grid grid-cols-2 gap-2'>
                    <p>Title:</p>
                    <p className='text-right'>{form.title || "-"}</p>

                    <p>Amount:</p>
                    <p className='text-right'>{form.amount || "-"}</p>

                    <p>Type:</p>
                    <p className='text-right'>{form.type}</p>
                </div>

                {/* BALANCE */}
                <h2 className='text-xl font-bold mt-5'>
                    Balance: <span className={balance < 0 ? "text-red-500" : "text-green-400"}>{balance}</span>

                </h2>


                {/* chart logic */}
                <button type='button' onClick={toggleChart} className='mt-3 px-5 py-2  rounded-xl font-semibold tracking-wide bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] active:scale-95'>{showChart ? "Hide Chart" : "Show Chart"}</button>

                {showChart && (
                    <div className='w-full max-w-md mt-4 bg-white/10 rounded-lg flex justify-center items-center min-h-[200px]'>

                        {ChartData[0].value + ChartData[1].value > 0 ? (
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={ChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                >
                                    {ChartData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={["#22c55e", "#ef4444"][index]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        ) : (
                            <p className="text-gray-400 text-center">No Data Available</p>
                        )}

                    </div>
                )}
                {/* TRANSACTIONS */}
                <div className='w-full max-w-md mt-1 bg-white/10 p-4 rounded-lg'>

                    <div className='flex justify-between flex-wrap'>
                        <h2 className='font-bold mb-2 text-xl'>Transactions</h2>

                        {/* search  */}

                        <input onChange={(e) => setFilterData(e.target.value)} type="text" placeholder='search entry' className=' bg-white text-black/80 py-1 px-1  rounded-lg outline-none' />

                    </div>

                    {filteredData.length === 0 ? (
                        <p className='text-center text-red-400 mt-4 font-semibold'>No data yet</p>
                    ) : (
                        filteredData.map((item, index) => (
                            <div
                                key={index}
                                className='flex  sm:flex-row justify-between mt-4 items-start sm:items-center 
                                border-b border-white/20 py-2 text-sm gap-1'
                            >
                                <span className='font-normal truncate w-1/3'>{item.title}</span>

                                <span className={` w-1/3 truncate ${item.type === "expense" ? "text-red-500" : "text-green-400"}`}>
                                    ₹ {item.amount}
                                </span>

                                <span className={`w-1/3 ${item.type === "expense" ? "text-red-500" : "text-green-400"}`}>
                                    {item.type}
                                </span>

                                <div className='flex gap-3 '>
                                    <span onClick={() => editList(item.originalIndex)} className="cursor-pointer text-green-500 hover:scale-105 "><PencilIcon size={15} /></span>

                                    <span onClick={() => deleteItem(item.originalIndex)} className="cursor-pointer text-red-500 hover:scale-105 "><Trash size={15}/></span>
                                </div>

                            </div>
                        ))
                    )}
                </div>

                {/* RESET */}
                <button
                    type='button'
                    onClick={resetData}
                    className='mt-5 w-full max-w-md py-2 rounded-lg font-bold uppercase
                    bg-red-500 hover:bg-red-600 transition-all'
                >
                    Reset
                </button>

            </form>
        </div>
    );
};

export default Form;