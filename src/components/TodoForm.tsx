import React, { FormEvent, useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoForm() {
    const [selectedToken, setSelectedToken] = useState("")
    const { addTodo } = useTodo()

    const add = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!selectedToken) return

        addTodo({ todo: selectedToken, completed: false })
        setSelectedToken("")
    }

    return (
        <form onSubmit={add} className="flex">
            <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            >
                <option value="" disabled className='text-slate-50'>Select your token</option>
                <option value="BitCoin" className='text-slate-900'>BitCoin</option>
                <option value="Ethereum" className='text-slate-900'>Ethereum</option>
                <option value="TetherUS" className='text-slate-900'>ThetherUS</option>
                <option value="BNB" className='text-slate-900'>BNB</option>
                <option value="Solana" className='text-slate-900'>SOL</option>
                <option value="USD Coin" className='text-slate-900'>USD Coin</option>
                <option value="Ripple" className='text-slate-900'>Ripple</option>
                <option value="TonCoin" className='text-slate-900'>Ton Coin</option>
                <option value="DogeCoin" className='text-slate-900'>Dogecoin</option>
            </select>
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
