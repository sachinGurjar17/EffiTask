import { Layout } from "./Layout";
import Today from "./Today";
import { useStepContext } from "@mui/material";
import { useState } from "react";
import { Days } from "./Days";
import { NavLink } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoState } from "@/store/todos";

export function Upcoming (){

    const todos = useRecoilValue(todoState);

    return (
        <Layout>
            <div className="flex flex-col gap-10">
                <div className="text-2xl sm:text-5xl font-semibold flex  items-center">
                        <NavLink 
                            to={'/menu'}
                            className="block sm:hidden pr-5">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="M286.67-613.33V-680H840v66.67H286.67Zm0 166.66v-66.66H840v66.66H286.67Zm0 166.67v-66.67H840V-280H286.67ZM153.33-613.33q-13.66 0-23.5-9.84Q120-633 120-647q0-14 9.83-23.5 9.84-9.5 23.84-9.5t23.5 9.58q9.5 9.59 9.5 23.75 0 13.67-9.59 23.5-9.58 9.84-23.75 9.84Zm0 166.66q-13.66 0-23.5-9.83-9.83-9.83-9.83-23.83 0-14 9.83-23.5 9.84-9.5 23.84-9.5t23.5 9.58q9.5 9.58 9.5 23.75 0 13.67-9.59 23.5-9.58 9.83-23.75 9.83Zm0 166.67q-13.66 0-23.5-9.83-9.83-9.84-9.83-23.84t9.83-23.5q9.84-9.5 23.84-9.5t23.5 9.59q9.5 9.58 9.5 23.75 0 13.66-9.59 23.5-9.58 9.83-23.75 9.83Z"/></svg> 
                        </NavLink>
                    <h1 className="" >Upcoming</h1>
                    <h1 className="py-1 px-4 border rounded-lg w-fit font-normal sm:text-4xl ml-12">{todos.length}</h1>
                </div>
                <div>
                    <Days/>
                </div> 
            </div> 
        </Layout>
    )
} 