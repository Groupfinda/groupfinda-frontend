import React from "react";
import { render, cleanup, fireEvent, act } from "../../../../utils/test-utils"
import ProfileSettings from "../ProfileSettings";
import { MockedResponse, wait } from "@apollo/react-testing";
import { GraphQLError } from "graphql";
import { FULLUSER } from "../../../graphql/queries";

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

afterEach(cleanup);

const mocks: MockedResponse[] = [
    {
        request: {
            query: FULLUSER
        },
        result: {
            data: {
                me: {
                    id: "123",
                    firstName: "Peter",
                    lastName: "Tan",
                    username: "username",
                    email: "john@123.com",
                    gender: "Male",
                    avatar: "https://postmediacanoe.files.wordpress.com/2019/07/gettyimages-910314172-e1564420108411.jpg?w=840&h=630&crop=1&quality=80&strip=all",
                    birthday: 883612800000,
                    location: "Singapore",
                    preferences: {
                        lowerAge: 18,
                        upperAge: 30,
                        maxDistance: 5
                    },
                    profile: {
                        userHobbies: [
                        "Gaming"
                    ],
                        userFaculty: "Computing",
                        userYearOfStudy: 1
                    }
                }
            }
        }
    }
]

const errormocks: MockedResponse[] = [
    {
        request: {
            query: FULLUSER
        },
        error: new Error("")
    }
]

test("renders original UI correctly", () => {
    const tree = render(<ProfileSettings />);
    expect(tree).toMatchSnapshot();
})

test("renders loaded UI correctly", async () => {
    const component = render(<ProfileSettings />, {}, mocks);
    await wait(0);
    expect(component.toJSON()).toMatchSnapshot();
})

test("renders error UI correctly", async () => {
    const component = render(<ProfileSettings />, {}, errormocks);
    await wait(0);
    expect(component.toJSON()).toMatchSnapshot();
})

test("edit basic button acts correctly when pressed", async () => {
    const component = render(<ProfileSettings /> , {}, mocks);
    await wait(0);

    const button = component.getByTestId("toggle-edit-basic");
    expect(button).toHaveTextContent("Edit");
    fireEvent.press(button);
    expect(button).toHaveTextContent("Update");
    // Checks that button changes back to Edit without making async request
    fireEvent.press(button);
    expect(button).toHaveTextContent("Edit");
})

test("edit profile button acts correctly when pressed", async () => {
    const component = render(<ProfileSettings /> , {}, mocks);
    await wait(0);

    const button = component.getByTestId("toggle-edit-profile");
    expect(button).toHaveTextContent("Edit");
    fireEvent.press(button);
    expect(button).toHaveTextContent("Update");
    // Checks that button changes back to Edit without making async request
    fireEvent.press(button);
    expect(button).toHaveTextContent("Edit");
})

test("edit preferences button acts correctly when pressed", async () => {
    const component = render(<ProfileSettings /> , {}, mocks);
    await wait(0);

    const button = component.getByTestId("toggle-edit-preferences");
    expect(button).toHaveTextContent("Edit");
    fireEvent.press(button);
    expect(button).toHaveTextContent("Update");
    // Checks that button changes back to Edit without making async request
    fireEvent.press(button);
    expect(button).toHaveTextContent("Edit");
})