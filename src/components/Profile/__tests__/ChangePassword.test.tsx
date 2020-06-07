import React from "react";
import { render, cleanup, fireEvent, act } from "../../../../utils/test-utils"
import ChangePassword from "../ChangePassword"
import { MockedResponse, wait } from "@apollo/react-testing";
import { RESET_PASSWORD } from "../../../graphql/mutations"
import { GraphQLError } from "graphql";

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

afterEach(cleanup);

const mocks: MockedResponse[] = [
    {
        request: {
            query: RESET_PASSWORD,
            variables: {
                originalPassword: "test1",
                newPassword: "test2",
                confirmNewPassword: "test3"
            }
        },
        result: {
            errors: [
                new GraphQLError(
                    "Passwords do not match",
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    {
                        exception: {
                            invalidArgs: [
                                "newPassword",
                                "confirmNewPasswowrd"
                            ]
                        }
                    }
                )
            ]
        }
    },
    {
        request: {
            query: RESET_PASSWORD,
            variables: {
                originalPassword: "wrongpassword",
                newPassword: "newpassword",
                confirmNewPassword: "newpassword"
            }
        },
        result: {
            errors: [
                new GraphQLError(
                    "Password is incorrect",
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    {
                        exception: {
                            invalidArgs: [
                                "originalPassword"
                            ]
                        }
                    }
                )
            ]
        }
    },
    {
        request: {
            query: RESET_PASSWORD,
            variables: {
                originalPassword: "password",
                newPassword: "newpassword",
                confirmNewPassword: "newpassword"
            }
        },
        result: {
            data: {
                resetPassword: true
            }
        }
    }
]

test("renders UI correctly", () => {
    const tree = render(<ChangePassword />);
    expect(tree).toMatchSnapshot();
})

test("renders text components correctly", () => {
    const component = render(<ChangePassword />);
    expect(component.queryByPlaceholder("Current Password")).toBeTruthy();
    expect(component.queryByPlaceholder("New Password")).toBeTruthy();
    expect(component.queryByPlaceholder("Confirm New Password")).toBeTruthy();
})

test("password secure entry toggles are working", () => {
    const component = render(<ChangePassword />)
    const currentPasswordInput = component.getByPlaceholder("Current Password");
    expect(currentPasswordInput).toHaveProp("secureTextEntry", true);
    const toggleCurrentPassword = component.getByTestId("toggle-current-password");
    fireEvent.press(toggleCurrentPassword);
    expect(currentPasswordInput).toHaveProp("secureTextEntry", false);
    const toggleCurrentPasswordAgain = component.getByTestId("toggle-current-password");
    fireEvent.press(toggleCurrentPasswordAgain);
    expect(currentPasswordInput).toHaveProp("secureTextEntry", true)

    const newPasswordInput = component.getByPlaceholder("New Password");
    expect(newPasswordInput).toHaveProp("secureTextEntry", true);
    const toggleNewPassword = component.getByTestId("toggle-new-password");
    fireEvent.press(toggleNewPassword);
    expect(newPasswordInput).toHaveProp("secureTextEntry", false);
    const toggleNewPasswordAgain = component.getByTestId("toggle-new-password");
    fireEvent.press(toggleNewPasswordAgain);
    expect(newPasswordInput).toHaveProp("secureTextEntry", true)

    const confirmPasswordInput = component.getByPlaceholder("Confirm New Password");
    expect(confirmPasswordInput).toHaveProp("secureTextEntry", true);
    const toggleConfirmPassword = component.getByTestId("toggle-confirm-password");
    fireEvent.press(toggleConfirmPassword);
    expect(confirmPasswordInput).toHaveProp("secureTextEntry", false);
    const toggleConfirmPasswordAgain = component.getByTestId("toggle-confirm-password");
    fireEvent.press(toggleConfirmPasswordAgain);
    expect(confirmPasswordInput).toHaveProp("secureTextEntry", true)
})

test("renders loading component when form submitted correctly", async () => {
    const component = render(<ChangePassword /> , {}, mocks);
    const button = component.getByText("Save Changes");

    await act(async () => {
        fireEvent.press(button);
        expect(component.toJSON()).toMatchSnapshot();
        await wait(0);
    });
});

test("renders password do not match correctly", async () => {
    const component = render(<ChangePassword />, {}, mocks);

    const currentPasswordInput = component.getByPlaceholder("Current Password");
    fireEvent.changeText(currentPasswordInput, "test1");
    expect(currentPasswordInput.props.value).toBe("test1");

    const newPasswordInput = component.getByPlaceholder("New Password");
    fireEvent.changeText(newPasswordInput, "test2");
    expect(newPasswordInput.props.value).toBe("test2");

    const confirmPasswordInput = component.getByPlaceholder("Confirm New Password");
    fireEvent.changeText(confirmPasswordInput, "test3");
    expect(confirmPasswordInput.props.value).toBe("test3");

    const button = component.getByText("Save Changes");
    await act(async () => {
        fireEvent.press(button);
        await wait(0)
    })

    expect(component.queryByText("Passwords do not match")).toBeTruthy();
    expect(newPasswordInput).toHaveProp("status", "danger");
    expect(confirmPasswordInput).toHaveProp("status", "danger");
    expect(newPasswordInput).toHaveProp("value", "test2");
    expect(confirmPasswordInput).toHaveProp("value", "test3");

    fireEvent.changeText(newPasswordInput, "test");
    expect(newPasswordInput).toHaveProp("status", "basic");
    fireEvent.changeText(confirmPasswordInput, "test");
    expect(confirmPasswordInput).toHaveProp("status", "basic")
});

test("renders password is incorrect correctly", async () => {
    const component = render(<ChangePassword />, {}, mocks);

    const currentPasswordInput = component.getByPlaceholder("Current Password");
    fireEvent.changeText(currentPasswordInput, "wrongpassword");
    expect(currentPasswordInput.props.value).toBe("wrongpassword");

    const newPasswordInput = component.getByPlaceholder("New Password");
    fireEvent.changeText(newPasswordInput, "newpassword");
    expect(newPasswordInput.props.value).toBe("newpassword");

    const confirmPasswordInput = component.getByPlaceholder("Confirm New Password");
    fireEvent.changeText(confirmPasswordInput, "newpassword");
    expect(confirmPasswordInput.props.value).toBe("newpassword");

    const button = component.getByText("Save Changes");
    await act(async () => {
        fireEvent.press(button);
        await wait(0)
    })

    expect(component.queryByText("Password is incorrect")).toBeTruthy();
    expect(currentPasswordInput).toHaveProp("status", "danger");
    expect(currentPasswordInput).toHaveProp("value", "wrongpassword");

    fireEvent.changeText(currentPasswordInput, "wrongpassword1");
    expect(currentPasswordInput).toHaveProp("status", "basic");
});

test("renders success message after successful password change", async () => {
    const component = render(<ChangePassword />, {}, mocks);

    const currentPasswordInput = component.getByPlaceholder("Current Password");
    fireEvent.changeText(currentPasswordInput, "password");
    expect(currentPasswordInput.props.value).toBe("password");

    const newPasswordInput = component.getByPlaceholder("New Password");
    fireEvent.changeText(newPasswordInput, "newpassword");
    expect(newPasswordInput.props.value).toBe("newpassword");

    const confirmPasswordInput = component.getByPlaceholder("Confirm New Password");
    fireEvent.changeText(confirmPasswordInput, "newpassword");
    expect(confirmPasswordInput.props.value).toBe("newpassword");

    const button = component.getByText("Save Changes");
    await act(async () => {
        fireEvent.press(button);
        await wait(0);
    });

    expect(component.queryByText("You have successfully changed your password!")).toBeTruthy();
});