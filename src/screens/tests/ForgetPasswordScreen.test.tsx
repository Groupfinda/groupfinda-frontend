import { withApp } from "../../../App";
import ForgetPasswordScreen from "../ForgetPasswordScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(withApp(ForgetPasswordScreen)).toJSON();
  expect(tree).toMatchSnapshot();
});
