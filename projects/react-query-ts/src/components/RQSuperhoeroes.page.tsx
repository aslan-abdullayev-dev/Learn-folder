import axios from "axios";
import { useQuery } from "react-query"
import { Hero } from "../types/Hero";

const fetchSuperHeroes = () => {
  return axios("http://localhost:4000/superheroes")
}

function RQSuperhoeroesPage(): JSX.Element {
  const query = useQuery("super-heros", fetchSuperHeroes)
  // const { isLoading, data } = useQuery("super-heros", fetchSuperHeroes)


  // console.log("isLoading ==>", isLoading);
  // console.log("data ==>", data?.data);


  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return data?.data.map(
    (hero: Hero) => {
      return <div>{hero.name}</div>
    }
  )

}

export default RQSuperhoeroesPage;
