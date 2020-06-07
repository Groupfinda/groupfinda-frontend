import React from "react";
import { render, cleanup } from "../../../../utils/test-utils";
import Loading from "../Loading";

afterEach(cleanup);

test("renders UI correctly on visible true", () => {
  const tree = render(<Loading visible={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders UI correctly on visible false", () => {
  const tree = render(<Loading visible={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders UI correctly on status danger", () => {
  const tree = render(<Loading visible={true} status="danger" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders UI correctly on size large", () => {
  const tree = render(<Loading visible={true} size="large" />).toJSON();
  expect(tree).toMatchSnapshot();
});
