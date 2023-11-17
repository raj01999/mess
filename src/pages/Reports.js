import React, { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import MealTable from "../components/MealTable";
import FundTable from "../components/FundTable";

const Fund = [
  { date: "01/12/23", amount: { currency: "INR", value: 13 } },
  { date: "01/12/23", amount: { currency: "INR", value: 14 } },
  { date: "01/12/23", amount: { currency: "INR", value: 14 } },
];

const Meal = [
  {
    date: "01/12/23",
    amount: { day: 1, night: 1 },
    guest: { day: 0, night: 0 },
  },
  {
    date: "01/12/23",
    amount: { day: 1, night: 1 },
    guest: { day: 1, night: 1 },
  },
  {
    date: "01/12/23",
    amount: { day: 1, night: 1 },
    guest: { day: 1, night: 1 },
  },
];

function Reports() {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [meal, setMeal] = useState([]);
  const [fund, setFund] = useState([]);
  const [month, setMonth] = useState("2023-11");

  useEffect(() => {
    console.log(state.info);
    if (state.info === "meal") {
      setMeal(Meal);
    } else if (state.info === "fund") {
      setFund(Fund);
    }
  }, [state.info]);

  return (
    <div className="reports">
      <div className="reports-header">
        <h4>{state.info === "meal" ? "Your Meals:" : "Your Deposit:"}</h4>
        <input
          className="reports-month-input"
          type="month"
          name="month"
          id="month"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        />
      </div>

      {state.info === "meal" ? (
        <MealTable data={meal} />
      ) : (
        <FundTable data={fund} />
      )}
    </div>
  );
}

export default Reports;
