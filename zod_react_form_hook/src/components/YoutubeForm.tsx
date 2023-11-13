import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/DevTools";

type FormValues = {
  username: string
  email: string
  channel: string
}

function YoutubeForm() {
  const form = useForm<FormValues>()
  const { register, control, handleSubmit } = form

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: "Username is required" })}
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format"
            }, required: "Email is required"
          })}
        />

        <label htmlFor="channel">channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", { required: "Channel is required" })}
        />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>);
}

export default YoutubeForm;
