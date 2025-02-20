"use client"

import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./action";
import { PASSWORD_MIN } from "@/lib/constants";

export default function CreateAccount(){
  const [state, dispatch] = useFormState(createAccount,null);
  return (
    <div className="flex flex-col gap-10 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          required
          type="text"
          placeholder="Username"
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
          <Input
          name="email"
          required
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
          <Input
          name="password"
          required
          type="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN}
        />
          <Input
          name="confirmPassword"
          required
          type="password"
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirmPassword}
          minLength={PASSWORD_MIN}
        />
        <Button
          text="Create Account"
        />
      </form>
      <SocialLogin/>
    </div>
  )
}