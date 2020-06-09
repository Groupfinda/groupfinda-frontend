import React from "react";
import { render, cleanup, fireEvent } from "../../../../utils/test-utils";
import Pill from "../Pill";

afterEach(cleanup);

test("renders UI correctly", () => {
  const tree = render(<Pill text="Hello" onPress={() => jest.fn()} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("clicking on pill triggers on press", () => {
  const mockfn = jest.fn();
  const component = render(<Pill text="Hello" onPress={mockfn} />);
  const pill = component.getByText("Hello");
  fireEvent.press(pill);
  expect(mockfn).toBeCalled();
  expect(mockfn).toHaveBeenCalledTimes(1);
});
