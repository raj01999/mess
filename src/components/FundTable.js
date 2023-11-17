import React from "react";

const FundTable = ({ data }) => {
  return (
    <table id="customers">
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

      <tbody>
        {data.map((ele, idx) => {
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
          <td> {data[0]?.amount?.currency}</td>
          <td>
            {data.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.amount.value,
              0
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FundTable;
