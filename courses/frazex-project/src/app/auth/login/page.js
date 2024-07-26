"use client"

import "./styles.scss"

const baseUrl = "https://bookbuzz.inloya.com/api/v1/"

import { Button, Input } from "antd";
import { useState } from "react";
import axios from "axios";

const loginAction = (email, password) => {
  axios({
    method: "post",
    url: "account/login",
    baseURL: baseUrl,
    data: {
      email,
      password
    }
  })
    .then((res) => {
      const userData = res.data.result
      console.log(userData)
      document.cookie = `jwt=${userData.jwt}`
    })

}

const Page = () => {
  const [email, setEmail] = useState("frazex@info")
  const [password, setPassword] = useState("123!")

  return (
    <div className="login-page">
      <div className="login-page__content">
        <div className="content__left">
          <img src="/login-image.jpg" alt=""/>
        </div>
        <form className="content__right">
          <div>
            <span>Email</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <span>Password</span>
            <Input value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div
            style={{ marginTop: "10px" }}
          >
            <Button
              onClick={() => loginAction(email, password)}
              type="primary"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Page;