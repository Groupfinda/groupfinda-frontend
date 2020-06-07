import React from "react";
import { render, cleanup, fireEvent, act } from "../../../../utils/test-utils"
import ActiveQuestions from "../ActiveQuestions";
import { QuestionType } from "../../types"

afterEach(cleanup);

let questions: QuestionType[] = []
let completedQuestions: QuestionType[] = []
let setCompletedQuestions: any
for (let i=6; i < 300; i++) {
    questions.push({
        order: i,
        content: "Dummy Question",
        value: 0
    })
}

test("renders UI correctly", () => {
    const tree = render(<ActiveQuestions questions={questions} completedQuestions={completedQuestions} setCompletedQuestions={setCompletedQuestions}/>);
    expect(tree.toJSON()).toMatchSnapshot()
})