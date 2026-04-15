import React from 'react';
import { Trash } from 'lucide-react';

const Form = ({ handleForm, form, handleChange, transaction, balance, resetData, deleteItem }) => {
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
                <div className='mt-5 w-full max-w-md bg-white/10 p-4 rounded-lg text-sm'>
                    <p>Title: {form.title}</p>
                    <p>Amount: {form.amount}</p>
                    <p>Type: {form.type}</p>
                </div>

                {/* BALANCE */}
                <h2 className='text-xl font-bold mt-5'>
                    Balance: <span className={balance < 0 ? "text-red-500" : "text-green-400"}>{balance}</span>
            
                </h2>

                {/* TRANSACTIONS */}
                <div className='w-full max-w-md mt-5 bg-white/10 p-4 rounded-lg'>
                    <h2 className='font-semibold mb-2'>Transactions</h2>

                    {transaction.length === 0 ? (
                        <p className='text-center text-red-400'>No data yet</p>
                    ) : (
                        transaction.map((item, index) => (
                            <div
                                key={index}
                                className='flex  sm:flex-row justify-between items-start sm:items-center 
                                border-b border-white/20 py-2 text-sm gap-1'
                            >
                                <span className='font-medium truncate w-1/3'>{item.title}</span>

                                <span className={` w-1/3 ${item.type === "expense" ? "text-red-500" : "text-green-400"}`}>
                                    ₹ {item.amount}
                                </span>

                                <span className={`w-1/3 ${item.type === "expense" ? "text-red-500" : "text-green-400"}`}>
                                    {item.type}
                                </span>
                                <span  onClick={() => deleteItem(index)} className="cursor-pointer text-red-500 hover:scale-105 "><Trash /></span>
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