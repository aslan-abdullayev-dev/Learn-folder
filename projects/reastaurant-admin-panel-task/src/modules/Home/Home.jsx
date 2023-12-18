import "./styles/Home.scss";
import { useSelector } from "react-redux";
import HomeCard from "./components/HomeCard";

const Home = () => {
  const reduxOrders = useSelector((state) => state.orders);

  const orderCount = reduxOrders?.length;

  const finishedOrderCount = reduxOrders?.filter(
    (order) => order?.statusId === 1
  )?.length;

  const finishedOrdersAmount = reduxOrders
    ?.filter((order) => order?.statusId === 1)
    ?.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.totalAmount,
      0
    );

  return (
    <div className="home">
      <nav className="home__nav">Ana Səhifə</nav>
      <div className="home__content">
        <div className="home__card-wrapper">
          <HomeCard title="Sifariş sayı" data={`${orderCount} sifariş`} />
        </div>
        <div className="home__card-wrapper">
          <HomeCard
            title="Sonlandırılan Sifariş"
            data={`${finishedOrderCount} sifariş`}
          />
        </div>
        <div className="home__card-wrapper">
          <HomeCard
            title="Bugünün gəlirləri"
            data={`${finishedOrdersAmount} manat`}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
