import React from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { myTheme } from "../custom-theme";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { render } from "react-native-testing-library";

const AllProviders = (apolloMocks: MockedResponse[]) => ({
  children,
}: {
  children: JSX.Element;
}) => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...myTheme }}>
        <MockedProvider mocks={apolloMocks} addTypename={false}>
          {children}
        </MockedProvider>
      </ApplicationProvider>
    </>
  );
};

const customRender: typeof render = (
  ui,
  options,
  apolloProps: MockedResponse[] = []
) => render(ui, { wrapper: AllProviders(apolloProps), ...options });

export * from "react-native-testing-library";
export { customRender as render };
