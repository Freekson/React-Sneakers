import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Drawer from "./index";

jest.mock("axios");

test("renders Drawer component with cart items", async () => {
  const cartItems = [
    { id: 1, name: "Sneaker 1", price: 50, imageUrl: "sneaker1.jpg" },
    { id: 2, name: "Sneaker 2", price: 60, imageUrl: "sneaker2.jpg" },
  ];

  jest.spyOn(React, "useContext").mockReturnValue({
    cartItems,
    setCartItems: jest.fn(),
    totalPrice: 110,
  });

  axios.post.mockResolvedValue({ data: { id: 123 } });

  render(<Drawer onClose={() => {}} onRemove={() => {}} opened={true} />);

  expect(screen.getByText("Sneaker 1")).toBeInTheDocument();
  expect(screen.getByText("Sneaker 2")).toBeInTheDocument();
  expect(screen.getByText("110 $")).toBeInTheDocument();
  expect(screen.getByText("Ordering")).toBeInTheDocument();
  expect(screen.queryByTestId("empty-cart")).toBeNull();
});
test("renders Drawer component with empty cart", async () => {
  jest.spyOn(React, "useContext").mockReturnValue({
    cartItems: [],
    setCartItems: jest.fn(),
    totalPrice: 0,
  });

  render(<Drawer onClose={() => {}} onRemove={() => {}} opened={true} />);

  expect(screen.getByText("Cart empty")).toBeInTheDocument();
  expect(
    screen.getByText("Add at least one pair of sneakers to place an order.")
  ).toBeInTheDocument();
  expect(screen.getByAltText("cart img")).toBeInTheDocument();
  expect(screen.queryByTestId("cart")).toBeNull();
});
