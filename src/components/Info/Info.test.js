import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Info from "./index";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

test("renders Info component correctly", () => {
  const setCartOpenMock = jest.fn();
  React.useContext.mockReturnValue({ setCartOpen: setCartOpenMock });

  const props = {
    title: "Test Title",
    description: "Test Description",
    imageUrl: "test-image.jpg",
  };

  render(<Info {...props} />);

  expect(screen.getByText("Test Title")).toBeInTheDocument();
  expect(screen.getByText("Test Description")).toBeInTheDocument();
  expect(screen.getByAltText("cart img")).toBeInTheDocument();

  expect(screen.getByText("Go back")).toBeInTheDocument();
});

test("renders Title  correctly", () => {
  const setCartOpenMock = jest.fn();
  React.useContext.mockReturnValue({ setCartOpen: setCartOpenMock });

  const props = {
    title: "Test Title",
    description: "Test Description",
    imageUrl: "test-image.jpg",
  };

  render(<Info {...props} />);

  expect(screen.getByText("Test Title")).toBeInTheDocument();
});

test("renders description correctly", () => {
  const setCartOpenMock = jest.fn();
  React.useContext.mockReturnValue({ setCartOpen: setCartOpenMock });

  const props = {
    title: "Test Title",
    description: "Test Description",
    imageUrl: "test-image.jpg",
  };

  render(<Info {...props} />);

  expect(screen.getByText("Test Description")).toBeInTheDocument();
});

test("renders image correctly", () => {
  const setCartOpenMock = jest.fn();
  React.useContext.mockReturnValue({ setCartOpen: setCartOpenMock });

  const props = {
    title: "Test Title",
    description: "Test Description",
    imageUrl: "test-image.jpg",
  };

  render(<Info {...props} />);

  expect(screen.getByAltText("cart img")).toBeInTheDocument();
});

test('clicking "Go back" button calls setCartOpen(false)', () => {
  const setCartOpenMock = jest.fn();
  React.useContext.mockReturnValue({ setCartOpen: setCartOpenMock });

  const props = {
    title: "Test Title",
    description: "Test Description",
    imageUrl: "test-image.jpg",
  };

  render(<Info {...props} />);

  fireEvent.click(screen.getByText("Go back"));

  expect(setCartOpenMock).toHaveBeenCalledWith(false);
});

test("renders Info component with different props", () => {
  const setCartOpenMock = jest.fn();
  React.useContext.mockReturnValue({ setCartOpen: setCartOpenMock });

  const props = {
    title: "Another Title",
    description: "Another Description",
    imageUrl: "another-image.jpg",
  };

  render(<Info {...props} />);

  expect(screen.getByText("Another Title")).toBeInTheDocument();
  expect(screen.getByText("Another Description")).toBeInTheDocument();
  expect(screen.getByAltText("cart img")).toBeInTheDocument();
});

test("renders Info component with no image", () => {
  const setCartOpenMock = jest.fn();
  React.useContext.mockReturnValue({ setCartOpen: setCartOpenMock });

  const props = {
    title: "No Image",
    description: "Description with no image",
  };

  render(<Info {...props} />);

  expect(screen.getByText("No Image")).toBeInTheDocument();
  expect(screen.getByText("Description with no image")).toBeInTheDocument();

  expect(screen.queryByAltText("cart img")).toBeNull();
});
