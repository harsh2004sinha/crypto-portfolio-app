import React, { useState, ChangeEvent } from 'react';
import { useTodo } from '../context/TodoContext';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import Image from 'next/image';

const data = [
        {
            "name" : "BitCoin",
            "price" : "$59,519.34",
            "url": "https://bin.bnbstatic.com/static/assets/logos/BTC.png"
        },
        {
            "name" : "Ethereum",
            "price" : "$2,650.13",
            "url": "https://bin.bnbstatic.com/static/assets/logos/ETH.png"
        },
        {
            "name" : "TetherUS",
            "price" : "$1.00",
            "url": "https://bin.bnbstatic.com/static/assets/logos/USDT.png"
        },
        {
            "name" : "BNB",
            "price" : "$536.60",
            "url": "https://bin.bnbstatic.com/static/assets/logos/BNB.png"
        },
        {
            "name" : "Solana",
            "price" : "$144.91",
            "url": "https://bin.bnbstatic.com/static/assets/logos/SOL.png"
        },
        {
            "name" : "USD Coin",
            "price" : "$0.9998",
            "url": "https://bin.bnbstatic.com/static/assets/logos/USDC.png"
        },
        {
            "name" : "Ripple",
            "price" : "$0.5709",
            "url": "https://bin.bnbstatic.com/static/assets/logos/XRP.png"
        },
        {
            "name" : "TonCoin",
            "price" : "$6.63",
            "url": "https://bin.bnbstatic.com/static/assets/logos/TON.png"
        },
        {
            "name" : "DogeCoin",
            "price" : "$0.10241",
            "url": "https://bin.bnbstatic.com/static/assets/logos/DOGE.png"
        }
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
    data.map((e) => {
        if(e.name===todoMsg) return <ListItem imageurl={e.url} name={e.name} price={e.price}/>;
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
