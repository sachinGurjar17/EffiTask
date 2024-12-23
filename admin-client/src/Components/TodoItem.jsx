import { useState } from "react";
import { useTodo } from "../Contexts";
import Done from '../assets/done.png'
import toast from "react-hot-toast";
function TodoItem({todo}){

const [dropDown , setDropDown] = useState(false);

const [checked , setChecked] = useState(todo.completed);

const [showTodo , setShowTodo] = useState(true);

const [todos , setTodos] = useRecoilState(todoState);

const priorityClass = {
    high: "bg-red-200",
    medium: "bg-yellow-200",
    low: "bg-green-200"
}

const confettiSideCannons = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };


const backendUrl = import.meta.env.VITE_BACKEND_URL ;

const deleteTodo = async (id)=>{
    const response = await fetch(`${backendUrl}/todo/deleteTodo`,{
            method:'POST',
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
            body:JSON.stringify({
                todoId:id ,
            })
    })

    if(response.ok){
        console.log("todo delete suceesfully");
        setTodos((prev)=> prev.filter((task)=> task.id !== id));
        toast.success('todo deleted succesfully')
    }else{
        console.log("error in deleting the todo");
        toast.error('Try again')
        
    }
    setShowTodo(false);
}

const statusChanged = async(id , completedOrNot)=>{   
    try{
        
        const response = await fetch(`${backendUrl}/todo/statusChange` , {
            method : 'POST',
            headers :{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify({
                todoId : id ,
                completedOrNot : completedOrNot 
            })
        })
        const data = await response.json();

        if(response.ok){
            toast('Good Job!', {
                icon: '👏',
              });
            confettiSideCannons()
            deleteTodo(id)
            console.log("Status Changed Successfully" , data)
        }
    }catch(err){
        console.log("Error while changing the status" , err);   
    }
}


return(
    <>
        {showTodo ? <div className="flex flex-col text-gray-600 font-semibold border-b pb-2 shadow-sm rounded-xl w-full">
            <div className="flex flex-row justify-between gap-4 p-4 ">
                <div className="flex flex-row gap-2 flex-wrap  items-center">
                    <button 
                        type="checkbox"
                        checked={checked}
                        onClick={(e)=>{statusChanged(todo.id , !todo.completed) ; setChecked(!checked)} }
                    >{checked ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#789DE5"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#789DE5"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>}</button>
                    <p className="text-gray-600 font-semibold">{todo.todo}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 text-sm">
                    <button
                        className="text-lg  text-gray-600"
                        onClick={()=>setDropDown(!dropDown)}
                    >{dropDown ? <div className="text-sm ">▲</div>:<div className="text-sm">▼</div>}</button>

                </div>
            </div>
            {dropDown ? <div className="ml-10 flex flex-col gap-3 ">
                <div className="flex flex-row gap-4 border-b pb-2">
                    <h1><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z"/></svg></h1>
                    <p>{todo?.time}</p>
                    <p>{todo?.date}</p>
                </div>
                {todo.description ? <div className="flex flex-row gap-3 border-b pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
                    <p>{todo.description}</p>
                </div> : <></>}
                <div className={`${priorityClass [todo.priority]} rounded-lg p-1 border-b pb-2`}><span className="text-xl mr-2">🚩</span>{todo.priority}</div>
                <div>{todo.tags.map((tag)=>(
                    <div className="w-fit border rounded-lg p-1 m-1 bg-cyan-50">{tag}</div>
                ))}</div>
                
                <div>
                    <button onClick={()=>deleteTodo(todo.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8B7DBE"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
            </div> : <></>}
        </div> : <></>}
    </>
)
}

import confetti from "canvas-confetti";
import { useRecoilState } from "recoil";
import { todoState } from "@/store/todos";



export default TodoItem ;