import React, { useState, useEffect } from "react";
import "./Reports.css";
import { useStateValue } from "../context/StateProvider";
import MealTable from "../components/MealTable";
import FundTable from "../components/FundTable";
import { Container, Card, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const Fund = [
  { month: "2024-11", date: 1, amount: 14 },
  { month: "2024-11", date: 2, amount: 44 },
  { month: "2024-11", date: 3, amount: 16 },
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
  const [searchParams] = useSearchParams();
  const qEmail = searchParams.get("user");
  console.log(qEmail);

  useEffect(() => {
    if (state.info === "meal") {
      setMeal(Meal);
    } else if (state.info === "fund") {
      setFund(Fund);
    }
  }, [state.info]);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh", position: "relative", top: "85px" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">
              {state.info === "meal" ? "Your Meals" : "Your Deposit"}
            </h2>

            <Form.Control
              type="month"
              required
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            />

            {state.info === "meal" ? (
              <MealTable data={meal} />
            ) : (
              <FundTable data={fund} />
            )}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Reports;
