import React, { useState } from "react";

function Reports() {
  const [data, setData] = useState([
    { date: "01/12/23", amount: 13, status: "accepted" },
    { date: "01/12/23", amount: 13, status: "accepted" },
    { date: "01/12/23", amount: 13, status: "pending" },
    { date: "01/12/23", amount: 13, status: "accepted" },
    { date: "01/12/23", amount: 13, status: "rejected" },
    { date: "01/12/23", amount: 13, status: "accepted" },
    { date: "01/12/23", amount: 13, status: "rejected" },
  ]);
  const [month, setMonth] = useState("2023-11");
  return (
    <div className="reports">
      <div className="reports-header">
        <h3>Your Deposit:</h3>
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
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.map((ele, idx) => {
            return (
              <tr key={idx}>
                <td>{ele.date}</td>
                <td>{ele.amount}</td>
              </tr>
            );
          })}

          <tr>
            <td>Total</td>
            <td>{234}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
