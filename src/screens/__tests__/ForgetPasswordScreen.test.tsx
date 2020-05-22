import React from "react";
import { render } from "../../../utils/test-utils";
import ForgetPasswordScreen from "../ForgetPasswordScreen";

test("renders UI correctly", () => {
  const tree = render(<ForgetPasswordScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders text components correctly", () => {
  const component = render(<ForgetPasswordScreen />);
  const header = component.getByText("Forgot your password?");
  const subheading = component.getByText(
    "Tell us your username and email and we will reset it for you."
  );
  expect(header.props.category).toBe("h3");
  expect(subheading.props.category).toBe("s1");
  expect(subheading.props.appearance).toBe("hint");
});
