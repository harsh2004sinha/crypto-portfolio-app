import React, { FormEvent, useState } from 'react'
import { useTodo } from '../context/TodoContext';

const symbolToName = [
    ["BTC", "Bitcoin"], [
        "ETH", "Ethereum"], [
        "SOL", "Solana"], [
        "USDC", "USD Coin"], [
        "XRP", "XRP"], [
        "USDT", "Tether"], [
        "PEPE", "Pepe"], [
        "BNB", "Binance Coin"], [
        "FDUSD", "First Digital USD"], [
        "DOGE", "Doge Coin"], [
        "TRX", "TRON"], [
        "WIF", "dogwifhat"], [
        "AAVE", "Aave"], [
        "SUI", "Sui"], [
        "RARE", "Super Rare"], [
        "FLOKI", "Floki Inu"], [
        "SYS", "Syscoin"], [
        "FET", "Fetch.AI"], [
        "NOT", "NotCoin"]
];

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
                {symbolToName.map((name) => <option value={name[0]} className='text-slate-900'>{name[1]}</option>)}
            </select>
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
