import React from "react";
import { render, cleanup, fireEvent, act } from "../../../../utils/test-utils"
import CompletedQuestions from "../CompletedQuestions";
import { QuestionType } from "../../types"

afterEach(cleanup);

let questions: QuestionType[] = []
let setCompletedQuestions: any
for (let i=0; i<10; i++) {
    questions.push({
        order: i,
        content: "Dummy Question",
        value: 3
    })
}

test("renders UI correctly", () => {
    const tree = render(<CompletedQuestions questions={questions} setCompletedQuestions={setCompletedQuestions}/>)
    expect(tree.toJSON()).toMatchSnapshot()
})