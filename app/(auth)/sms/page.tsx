"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { smsVerification } from "./action";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsVerification, initialState);
  return (
    <div className="flex flex-col gap-10 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            required
            type="number"
            placeholder="Verification Code"
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            name="phone"
            required
            type="text"
            placeholder="Phone Number"
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "Verify token" : "Send Verification SMS"} />
      </form>
    </div>
  );
}
