import React, { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";

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
        <h3>{state.info === "meal" ? "Your Meals:" : "Your Deposit:"}</h3>
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

      <table id="customers">
        {state.info === "meal" ? (
          <thead>
            <tr>
              <th rowSpan="2">Date</th>
              <th colSpan="2">Meal</th>
              <th colSpan="2">Guest</th>
            </tr>
            <tr>
              <th>Day</th>
              <th>Night</th>
              <th>Day</th>
              <th>Night</th>
            </tr>
          </thead>
        ) : (
          <thead>
            <tr>
              <th rowSpan="2">Date</th>
              <th colSpan="2">Amount</th>
            </tr>
            <tr>
              <th>Currency</th>
              <th>Value</th>
            </tr>
          </thead>
        )}

        {state.info === "meal" ? (
          <tbody>
            {meal.map((ele, idx) => {
              return (
                <tr key={idx}>
                  <td>{ele.date}</td>
                  <td>{ele.amount.day}</td>
                  <td>{ele.amount.night}</td>
                  <td>{ele.guest.day}</td>
                  <td>{ele.guest.night}</td>
                </tr>
              );
            })}

            <tr>
              <td>Total:</td>
              <td colSpan="2">
                {meal.reduce(
                  (previousValue, currentValue) =>
                    previousValue +
                    currentValue.amount.day +
                    currentValue.amount.night,
                  0
                )}
              </td>
              <td colSpan="2">
                {meal.reduce(
                  (previousValue, currentValue) =>
                    previousValue +
                    currentValue.guest.day +
                    currentValue.guest.night,
                  0
                )}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {fund.map((ele, idx) => {
              return (
                <tr key={idx}>
                  <td>{ele.date}</td>
                  <td>{ele.amount.currency}</td>
                  <td>{ele.amount.value}</td>
                </tr>
              );
            })}
            <tr>
              <td>Total:</td>
              <td> {fund[0]?.amount?.currency}</td>
              <td>
                {fund.reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue.amount.value,
                  0
                )}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Reports;
