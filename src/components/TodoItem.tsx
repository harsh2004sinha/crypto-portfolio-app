import React, { useState, ChangeEvent } from 'react';
import { useTodo } from '../context/TodoContext';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import Image from 'next/image';

const symbolToImag = [
  ["BTC", "Bitcoin", "https://www.cryptocompare.com/media/37746251/btc.png?width=25"],
  ["ETH", "Ethereum", "https://www.cryptocompare.com/media/37746238/eth.png?width=25"],
  ["SOL", "Solana", "https://www.cryptocompare.com/media/37747734/sol.png?width=25"],
  ["USDC", "USD Coin", "https://www.cryptocompare.com/media/34835941/usdc.png?width=25"],
  ["XRP", "XRP", "https://www.cryptocompare.com/media/38553096/xrp.png?width=25"],
  ["USDT", "Tether", "https://www.cryptocompare.com/media/37746338/usdt.png?width=25"],
  ["PEPE", "Pepe", "https://www.cryptocompare.com/media/44082118/pepe.png?width=25"],
  ["BNB", "Binance Coin", "https://www.cryptocompare.com/media/40485170/bnb.png?width=25"],
  ["FDUSD", "First Digital USD", "https://www.cryptocompare.com/media/44154091/fdusd.png?width=25"],
  ["DOGE", "Doge Coin", "https://www.cryptocompare.com/media/37746339/doge.png?width=25"],
  ["TRX", "TRON", "https://www.cryptocompare.com/media/37746879/trx.png?width=25"],
  ["WIF", "dogwifhat", "https://www.cryptocompare.com/media/44154324/wif.png?width=25"],
  ["AAVE", "Aave", "https://www.cryptocompare.com/media/37747534/aave.png?width=25"],
  ["SUI", "Sui", "https://www.cryptocompare.com/media/44082045/sui.png?width=25"],
  ["RARE", "Super Rare", "https://www.cryptocompare.com/media/38554190/rare.png?width=25"],
  ["FLOKI", "Floki Inu", "https://www.cryptocompare.com/media/38553226/floki.png?width=25"],
  ["SYS", "Syscoin", "https://www.cryptocompare.com/media/39456587/sys.png?width=25"],
  ["FET", "Fetch.AI", "https://www.cryptocompare.com/media/45576550/asi.png?width=25"],
  ["NOT", "NotCoin", "https://www.cryptocompare.com/media/44613958/not.png?width=25"]
]

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, todoMsg);
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`border gap-8 flex justify-between border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
      }`}
    >
{
    symbolToImag.map((e) => {
        if(e[0]===todoMsg) return <ListItem key={e[0]} imageurl={e[2]} name={e[1]}/>;
    })
}

      {/* <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
        } ${todo.completed ? 'line-through' : ''}`}
        value={todoMsg}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      /> */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete"
      >
        ❌
      </button>
    </div>
  );
}

function ListItem(props:any){
    return <><Image width={30} height={30} src={props.imageurl} alt="image" /> <span>{props.name}</span>
    <span>{props.price}</span>
     </>
}

export default TodoItem;
