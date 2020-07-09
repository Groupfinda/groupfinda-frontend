import React from "react";
import { render, cleanup, act } from "../../../utils/test-utils";
import QuestionsScreen from "../QuestionsScreen";
import { MockedResponse, wait } from "@apollo/react-testing";
import { getUserQuestions } from "../../graphql/queries";

afterEach(cleanup);

let dummyQuestions = [];
for (let i = 0; i < 300; i++) {
  dummyQuestions.push({
    order: i,
    content: "Dummy Question",
  });
}

const mocks: MockedResponse[] = [
  {
    request: {
      query: getUserQuestions,
    },
    result: {
      data: {
        getUserProfile: {
          rangeQuestions: [1, 3, 4, 5, 2].concat(new Array(295).fill(0)),
        },
        getAllRangeQuestions: dummyQuestions,
      },
    },
  },
];

test("renders original UI correctly", () => {
  let props: any;
  const tree = render(<QuestionsScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

/*

test("renders loaded UI correctly", async () => {
  let props: any;
  const tree = render(<QuestionsScreen {...props} />, {}, mocks);
  await act(async () => await wait(0));
  expect(tree).toMatchSnapshot();
});
*/