// import { CustomRequest } from "./lib/CustomRequest"

import { POST } from "./lib/CustomRequest";



function App() {

  // function getLayers() {
  //   CustomRequest.GET(
  //     "layer/style",
  //     (data: any) => {
  //       console.log("data ===>", data)
  //     },
  //     (err: any) => {
  //       console.log("err ===>", err);
  //     })
  // }
  // type PostResponse = {
  //   name: string;
  //   age: number
  // }
  function login() {
    const getdata = async () => {
      await POST(
        {
          // baseURL:"http://",
          url: "login",
          method:"post",
          data: { username: "Cavidan", password: "Aslan123!" }
        }
      )
        .then((data) => {
          console.log("data ===>", data);
        })
        .catch((err) => {
          console.log("err ===>", err);
        })
    }
    getdata()
  }

  return (
    <div>
      <p>
        <button onClick={login}>LOGIN</button>
      </p>
    </div>
  )
}

export default App
