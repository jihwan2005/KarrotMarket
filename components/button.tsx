"use client"

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}


export default function Button({ text}:FormButtonProps){
  const { pending} = useFormStatus();
  return (
    <button 
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed" 
      disabled={pending}>{pending ? "로딩 중..." : text}</button>
  )
}