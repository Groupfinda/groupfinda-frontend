import React from "react";
import { render, cleanup, fireEvent } from "../../../../utils/test-utils";
import TransparentBackHeader from "../navigation/TransparentBackHeader";

afterEach(cleanup);
const mockfn = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockfn }),
}));

test("renders UI correctly", () => {
  const tree = render(<TransparentBackHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("clicking on pill triggers on press", () => {
  const component = render(<TransparentBackHeader />);
  const button = component.getByTestId("back-button");
  fireEvent.press(button);
  expect(mockfn).toBeCalledTimes(1);
  fireEvent.press(button);
  expect(mockfn).toBeCalledTimes(2);
});
