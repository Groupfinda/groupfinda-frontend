import React from "react";
import {
  render,
  fireEvent,
  act,
  cleanup,
  RenderAPI,
} from "../../../../utils/test-utils";
import FormsHandler from "../Forms/FormsHandler";
import { wait } from "@apollo/react-testing";
import { getDateFormat } from "../../util";
import { eventCategories } from "../../../../utils/constants";

eventCategories.sort();
const FIRST_CATEGORY = eventCategories[0];

jest.mock("@apollo/react-hooks", () => ({
  useApolloClient: () => ({
    readQuery: (_: any) => ({ me: { role: "USER" } }),
  }),
  useMutation: () => [jest.fn()],
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    reset: jest.fn(),
  }),
}));

const dateNow = new Date();
/**
 *  ================== UTILITY FUNCTIONS ==================
 */
const skipEventDetails = (component: RenderAPI) => {
  const titleInput = component.getByPlaceholder("Event title");
  const descriptionInput = component.getByPlaceholder(
    "Enter a description for your event"
  );
  fireEvent.changeText(titleInput, "titleInput");
  fireEvent.changeText(descriptionInput, "descriptionInput");

  pressNext(component);
};

const skipEventDate = (component: RenderAPI): void => {
  pressNext(component);
};

const skipEventLocation = (component: RenderAPI): void => {
  const addressInput = component.getByPlaceholder("Address of event");
  const postalCodeInput = component.getByPlaceholder("Enter postal code");

  fireEvent.changeText(addressInput, "addressInput");
  fireEvent.changeText(postalCodeInput, "postalCodeInput");

  pressNext(component);
};

const skipEventImages = (component: RenderAPI): void => {
  pressNext(component);
};

const skipEventCategory = async (component: RenderAPI): Promise<void> => {
  const categoriesInput = component.getByPlaceholder("Choose some categories");
  await act(async () => {
    await categoriesInput.props.onSelect(0);
  });
  pressNext(component);
};

const pressNext = (component: RenderAPI): void => {
  const button = component.getByText("Next");
  fireEvent.press(button);
};

const pressPrev = (component: RenderAPI): void => {
  const button = component.getByText("Prev");
  fireEvent.press(button);
};

const getDateString = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dayString = day < 10 ? `0${day}` : day;
  const monthString = month < 10 ? `0${month}` : month;
  return `${dayString}/${monthString}/${date.getFullYear()}`;
};

/**
 *  ================== UTILITY FUNCTIONS END==================
 */

afterEach(cleanup);
test("renders event details UI correctly", () => {
  const tree = render(<FormsHandler event={undefined} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("event details renders text correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();
  expect(component.queryByText("Title")).toBeTruthy();
  expect(
    component.queryByText("Write something to attract new participants")
  ).toBeTruthy();
  expect(component.queryByText("Description")).toBeTruthy();
  expect(
    component.queryByText("Let people know what your event is about")
  ).toBeTruthy();
  expect(component.queryByText("Next")).toBeTruthy();
});

test("event details renders title error correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  const titleInput = component.getByPlaceholder("Event title");

  pressNext(component);
  expect(titleInput).toHaveProp("status", "danger");
  expect(component.queryByText("Title must not be empty")).toBeTruthy();

  fireEvent.changeText(titleInput, "something");
  expect(titleInput).toHaveProp("status", "basic");
  pressNext(component);
  expect(component.queryByText("Title must not be empty")).not.toBeTruthy();
});

test("event details render description error correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  const titleInput = component.getByPlaceholder("Event title");
  const descriptionInput = component.getByPlaceholder(
    "Enter a description for your event"
  );

  fireEvent.changeText(titleInput, "something");
  pressNext(component);
  expect(descriptionInput).toHaveProp("status", "danger");
  expect(component.queryByText("Description must not be empty")).toBeTruthy();
  fireEvent.changeText(descriptionInput, "something");
  expect(descriptionInput).toHaveProp("status", "basic");
});

test("cannot move on from event details if either title or description is empty", () => {
  const component = render(<FormsHandler event={undefined} />);
  const titleInput = component.getByPlaceholder("Event title");
  const descriptionInput = component.getByPlaceholder(
    "Enter a description for your event"
  );

  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();
  pressNext(component);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();

  fireEvent.changeText(titleInput, "something");
  pressNext(component);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();

  fireEvent.changeText(titleInput, "");
  fireEvent.changeText(descriptionInput, "something");
  pressNext(component);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();
});

/** Cannot use this as date changes every day
test("renders event date ui correctly", () => {
  const component = render(<FormsHandler />);
  skipEventDetails(component);
  expect(component.toJSON()).toMatchSnapshot();
});
*/

test("event date renders text correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);

  expect(
    component.queryByText("When is this event taking place?")
  ).toBeTruthy();
  expect(component.queryByText("Date of Event")).toBeTruthy();
  expect(
    component.queryByText("This is the actual day of your event")
  ).toBeTruthy();
  expect(
    component.queryByText(
      "When is the last day for participants to be grouped up?"
    )
  ).toBeTruthy();
  expect(component.queryByText("Date of last register")).toBeTruthy();
  expect(
    component.queryByText("This is the last day for people to sign up")
  ).toBeTruthy();

  const dateString = getDateString(dateNow);
  expect(component.queryAllByText(dateString)).toBeTruthy();
  expect(component.queryAllByText(dateString).length).toBe(2);

  const formattedDate = getDateFormat(dateNow);
  expect(component.queryByText(formattedDate)).toBeTruthy();
  expect(component.queryByText("Prev")).toBeTruthy();
  expect(component.queryByText("Next")).toBeTruthy();
});

test("renders event location ui correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  expect(component.toJSON()).toMatchSnapshot();
});

test("event location renders text correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  expect(
    component.queryByText("Where is this event taking place?")
  ).toBeTruthy();
  expect(component.queryByText("Address")).toBeTruthy();
  expect(
    component.queryByText("Let users know where your event is taking place")
  ).toBeTruthy();
  expect(component.queryByText("Postal Code")).toBeTruthy();

  expect(component.queryByText("Prev")).toBeTruthy();
  expect(component.queryByText("Next")).toBeTruthy();
});

test("event details renders address error correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);

  const addressInput = component.getByPlaceholder("Address of event");
  pressNext(component);
  expect(addressInput).toHaveProp("status", "danger");
  expect(component.queryByText("Address must not be empty")).toBeTruthy();

  fireEvent.changeText(addressInput, "something");
  expect(addressInput).toHaveProp("status", "basic");
  pressNext(component);
  expect(component.queryByText("Address must not be empty")).not.toBeTruthy();
});

test("event details render postal code error correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);

  const addressInput = component.getByPlaceholder("Address of event");
  const postalCodeInput = component.getByPlaceholder("Enter postal code");

  fireEvent.changeText(addressInput, "something");
  pressNext(component);
  expect(postalCodeInput).toHaveProp("status", "danger");
  expect(component.queryByText("PostalCode must not be empty")).toBeTruthy();
  fireEvent.changeText(postalCodeInput, "something");
  expect(postalCodeInput).toHaveProp("status", "basic");
});

test("cannot move on from event locations if either address or postalcode is empty", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);

  const addressInput = component.getByPlaceholder("Address of event");
  const postalCodeInput = component.getByPlaceholder("Enter postal code");

  expect(
    component.queryByText("Where is this event taking place?")
  ).toBeTruthy();

  pressNext(component);
  expect(
    component.queryByText("Where is this event taking place?")
  ).toBeTruthy();

  fireEvent.changeText(addressInput, "something");
  pressNext(component);
  expect(
    component.queryByText("Where is this event taking place?")
  ).toBeTruthy();

  fireEvent.changeText(addressInput, "");
  fireEvent.changeText(postalCodeInput, "something");
  pressNext(component);
  expect(
    component.queryByText("Where is this event taking place?")
  ).toBeTruthy();
});

test("renders event images ui correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  skipEventLocation(component);

  expect(component.toJSON()).toMatchSnapshot();
  expect(
    component.queryByText("Upload images to decorate your listing!")
  ).toBeTruthy();
  expect(component.queryByText("Prev")).toBeTruthy();
  expect(component.queryByText("Next")).toBeTruthy();
});

test("renders event categories ui correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  skipEventLocation(component);
  skipEventImages(component);

  expect(component.toJSON()).toMatchSnapshot();
});

test("event categories renders text correctly", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  skipEventLocation(component);
  skipEventImages(component);

  expect(
    component.queryByText("List out some categories that describe your event!")
  ).toBeTruthy();
  expect(component.queryByPlaceholder("Choose some categories")).toBeTruthy();
  expect(component.queryByText("What size should groups be?")).toBeTruthy();
  expect(component.queryByText("Group size")).toBeTruthy();
  expect(component.queryByText("4")).toBeTruthy();

  expect(component.queryByText("Prev")).toBeTruthy();
  expect(component.queryByText("Next")).toBeTruthy();
});

test("cannot move on from event categories if categories is empty", () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  skipEventLocation(component);
  skipEventImages(component);
  const categoriesInput = component.getByPlaceholder("Choose some categories");
  expect(categoriesInput).toHaveProp("status", "basic");
  pressNext(component);
  expect(categoriesInput).toHaveProp("status", "danger");
  expect(component.queryByText("Category must not be empty")).toBeTruthy();
});

test("can select and delete category", async () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  skipEventLocation(component);
  skipEventImages(component);
  const categoriesInput = component.getByPlaceholder("Choose some categories");
  await act(async () => {
    await categoriesInput.props.onSelect(0);
  });

  expect(component.queryByText(FIRST_CATEGORY)).toBeTruthy;
  const pill = component.getByText(FIRST_CATEGORY);
  fireEvent.press(pill);
  expect(component.queryByText(FIRST_CATEGORY)).not.toBeTruthy;
});

/* Does not work because date changes
test("renders submit form UI correctly", async () => {
  const component = render(<FormsHandler />);
  skipEventDetails(component);
  skipEventDate(component);
  skipEventLocation(component);
  skipEventImages(component);
  await skipEventCategory(component);

  expect(component.toJSON()).toMatchSnapshot();
});
*/

test("renders submit form text correctly", async () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  skipEventLocation(component);
  skipEventImages(component);
  await skipEventCategory(component);

  expect(component.queryByText("Title")).toBeTruthy;
  expect(component.queryByText("Description")).toBeTruthy;
  expect(component.queryByText("Date of event")).toBeTruthy;
  expect(component.queryByText("Address")).toBeTruthy;
  expect(component.queryByText("Postal Code")).toBeTruthy;
  expect(component.queryByText("Images")).toBeTruthy;
  expect(component.queryByText("Group size")).toBeTruthy;
  expect(component.queryByText("Categories")).toBeTruthy;
  expect(component.queryByText("Public")).toBeTruthy;

  expect(component.queryByText("titleInput")).toBeTruthy;
  expect(component.queryByText("descriptionInput")).toBeTruthy;
  const dateString = getDateFormat(dateNow);
  expect(component.queryByText(dateString)).toBeTruthy;
  expect(component.queryByText("addressInput")).toBeTruthy;
  expect(component.queryByText("postalCodeInput")).toBeTruthy;
  expect(component.queryByText("4")).toBeTruthy;
  expect(component.queryByText(FIRST_CATEGORY)).toBeTruthy;
});

test("state is preserved on clicking prev", async () => {
  const component = render(<FormsHandler event={undefined} />);
  skipEventDetails(component);
  skipEventDate(component);
  skipEventLocation(component);
  skipEventImages(component);
  await skipEventCategory(component);

  pressPrev(component);
  expect(
    component.queryByText("List out some categories that describe your event!")
  ).toBeTruthy;
  expect(component.queryByText("4")).toBeTruthy;
  expect(component.queryByText(FIRST_CATEGORY)).toBeTruthy;

  pressPrev(component);
  expect(component.queryByText("Upload images to decorate your listing"))
    .toBeTruthy;

  pressPrev(component);
  expect(component.queryByText("Where is this event taking place?")).toBeTruthy;
  expect(component.queryByText("addressInput")).toBeTruthy;
  expect(component.queryByText("postalCodeInput")).toBeTruthy;

  pressPrev(component);
  expect(component.queryByText("When is this event taking place?")).toBeTruthy;

  const dateString = getDateString(dateNow);
  expect(component.queryAllByText(dateString)).toBeTruthy;
  expect(component.queryAllByText(dateString).length).toBe(2);

  const formattedString = getDateFormat(dateNow);
  expect(component.queryByText(formattedString)).toBeTruthy();

  pressPrev(component);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy;
  expect(component.queryByText("titleInput")).toBeTruthy;
  expect(component.queryByText("descriptionInput")).toBeTruthy;
});
