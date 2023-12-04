import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./index";

test("renders Header component with logo", () => {
  render(
    <BrowserRouter>
      <Header onClickCart={() => {}} />
    </BrowserRouter>
  );

  expect(screen.getByAltText("logo")).toBeInTheDocument();
});

test("renders Header component with 'React sneakers' text", () => {
  render(
    <BrowserRouter>
      <Header onClickCart={() => {}} />
    </BrowserRouter>
  );

  expect(screen.getByText("React sneakers")).toBeInTheDocument();
});

test("renders Header component with 'Best sneaker store' text", () => {
  render(
    <BrowserRouter>
      <Header onClickCart={() => {}} />
    </BrowserRouter>
  );

  expect(screen.getByText("Best sneaker store")).toBeInTheDocument();
});
