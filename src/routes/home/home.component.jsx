import  Axios  from "axios";
import { useState,useEffect } from "react";

const Home = () => {
  const user_id = localStorage.getItem("user_id");
  const [data, setData] = useState([]);
  const [expense, setExpense] = useState([]);
  const [expectedExpense, setExpectedExpense] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await Axios.get(`http://localhost:8080/expense_track/users/${user_id}`).then(
      (response) => {
        setData(...response.data);
      }
    );
    }
    fetchData()
      .catch(console.error);

    const fetchExpense = async () => {
      await Axios.get(`http://localhost:8080/expense_track/expense/${user_id}`).then(
      (response) => {
        setExpense(response.data);
      }
    );
    }
    fetchExpense()
      .catch(console.error);

    const fetchExpectedExpense = async () => {
      await Axios.get(`http://localhost:8080/expense_track/expected_expense/${user_id}`).then(
      (response) => {
        setExpectedExpense(response.data);
      }
    );
    }
    fetchExpectedExpense()
      .catch(console.error);

    const fetchIncome = async () => {
      await Axios.post("http://localhost:8080/expense_track/income", {
        id: user_id
      }).then(
      (response) => {
        setIncome(response.data);
      }
    );
    }
    fetchIncome()
      .catch(console.error);
  }, [])

  const totalExpense=expense.reduce((a,v)=>a=a+Number(v.expense_amount),0);
  const totalIncome=income.reduce((a,v)=>a=a+Number(v.income_amount),0);
  const totalExpectedExpense=expectedExpense.reduce((a,v)=>a=a+Number(v.expected_amount),0);

  return (
    // console.log(data),
    // console.log(expense),
    // console.log(expectedExpense),
    console.log(income),
    <div>
      <h1>Welcome {data.user_name}</h1>
      <h2>Your total expense is {totalExpense}</h2>
      <h2>Your expected expense is {totalExpectedExpense}</h2>
      <h2>Your income per month is {totalIncome}</h2>
    </div>
  );
};

export { Home };
