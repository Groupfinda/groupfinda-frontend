import React from "react";
import { render, cleanup, fireEvent, act } from "../../../../utils/test-utils";
import { QuestionCard } from "../extra/question-card.component";

afterEach(cleanup);

let props = {
    order: 1,
    question: "Dummy question",
    selectedValue: 0,
    setSelectedValue: jest.fn()
}

test("renders UI correctly", () => {
    const tree = render(<QuestionCard {...props}/>);
    expect(tree.toJSON()).toMatchSnapshot();
})

test("answer change handled", () => {
    const component = render(<QuestionCard {...props}/>);
    
    const accurateOption = component.getByText("Accurate");
    expect(accurateOption).toBeTruthy();
    expect(accurateOption).toHaveProp("status", "basic");
    fireEvent.press(accurateOption);
    expect(accurateOption).toHaveProp("status", "control");
    fireEvent.press(accurateOption);
    expect(accurateOption).toHaveProp("status", "basic");

    const slightlyAccurateOption = component.getByText("Slightly Accurate");
    expect(slightlyAccurateOption).toBeTruthy();
    expect(slightlyAccurateOption).toHaveProp("status", "basic");
    fireEvent.press(slightlyAccurateOption);
    expect(slightlyAccurateOption).toHaveProp("status", "control");
    fireEvent.press(slightlyAccurateOption);
    expect(slightlyAccurateOption).toHaveProp("status", "basic");

    const neutralOption = component.getByText("Neutral");
    expect(neutralOption).toBeTruthy();
    expect(neutralOption).toHaveProp("status", "basic");
    fireEvent.press(neutralOption);
    expect(neutralOption).toHaveProp("status", "control");
    fireEvent.press(neutralOption);
    expect(neutralOption).toHaveProp("status", "basic");

    const slightlyInaccurateOption = component.getByText("Slightly Inaccurate");
    expect(slightlyAccurateOption).toBeTruthy();
    expect(slightlyInaccurateOption).toHaveProp("status", "basic");
    fireEvent.press(slightlyInaccurateOption);
    expect(slightlyInaccurateOption).toHaveProp("status", "control");
    fireEvent.press(slightlyInaccurateOption);
    expect(slightlyInaccurateOption).toHaveProp("status", "basic");

    const inaccurateOption = component.getByText("Inaccurate");
    expect(inaccurateOption).toBeTruthy();
    expect(inaccurateOption).toHaveProp("status", "basic");
    fireEvent.press(inaccurateOption);
    expect(inaccurateOption).toHaveProp("status", "control");
    fireEvent.press(inaccurateOption);
    expect(inaccurateOption).toHaveProp("status", "basic");
})