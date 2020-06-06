import React from "react";
import { render, cleanup } from "../../../../utils/test-utils"
import ProfilePage from "../ProfilePage"

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

afterEach(cleanup);

test("renders UI correctly", () => {
    const tree = render(<ProfilePage />);
    expect(tree).toMatchSnapshot();
})