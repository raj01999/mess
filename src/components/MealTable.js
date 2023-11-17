import React from "react";

const MealTable = ({ data }) => {
  return (
    <table id="customers">
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
      <tbody>
        {data.map((ele, idx) => {
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
            {data.reduce(
              (previousValue, currentValue) =>
                previousValue +
                currentValue.amount.day +
                currentValue.amount.night,
              0
            )}
          </td>
          <td colSpan="2">
            {data.reduce(
              (previousValue, currentValue) =>
                previousValue +
                currentValue.guest.day +
                currentValue.guest.night,
              0
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MealTable;
