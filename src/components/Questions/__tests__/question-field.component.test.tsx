import React from "react";
import { render, cleanup, fireEvent, act } from "../../../../utils/test-utils";
import { QuestionField } from "../extra/question-field.component";
import { MockedResponse, wait } from "@apollo/react-testing";
import { SAVE_ANSWER } from "../../../graphql/mutations";

afterEach(cleanup);

const props = {
    question: "Dummy question",
    order: 5,
    answer: 3,
    setCompletedQuestions: jest.fn()
}

const mocks: MockedResponse[] = [
    {
        request: {
            query: SAVE_ANSWER,
            variables: {
                order: 1,
                value: 3
            }
        },
        result: {
            data: {
                submitRangeQuestion: [1, 3, 4, 5]
            }
        }
    }
]

test("renders UI correctly", () => {
    const tree = render(<QuestionField {...props}/>);
    expect(tree.toJSON()).toMatchSnapshot();
})

test("radio group populates properly", async () => {
    const component = render(<QuestionField {...props}/>, {}, mocks);
    const radioGroup = component.getByTestId("radio-group");
    expect(radioGroup).toBeTruthy();
    expect(radioGroup.props.selectedIndex).toBe(3);
})