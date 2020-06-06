import React from "react";
import { render, cleanup } from "../../../../utils/test-utils"
import ProfileSettings from "../ProfileSettings"

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

afterEach(cleanup);

test("renders UI correctly", () => {
    const tree = render(<ProfileSettings />);
    expect(tree).toMatchSnapshot();
})