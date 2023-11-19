import React from "react";
import * as FaIcons from "react-icons/fa";

const FundTable = ({ data }) => {
  return (
    <table id="customers">
      <thead>
        <tr>
          <th>Date</th>
          <th>
            Amount ( <FaIcons.FaRupeeSign /> )
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((ele, idx) => {
          return (
            <tr key={idx}>
              <td>{`${ele.month}-${ele.date}`}</td>
              <td>{ele.amount}</td>
            </tr>
          );
        })}
        <tr>
          <td>Total:</td>

          <td>
            {data.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.amount,
              0
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FundTable;
