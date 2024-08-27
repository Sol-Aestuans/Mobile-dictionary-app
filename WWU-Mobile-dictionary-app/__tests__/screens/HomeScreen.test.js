import React from 'react';
import { render, waitFor, fireEvent, getByText,  } from '@testing-library/react-native';
import axios from 'axios';
import HomeScreen from '../../src/screens/HomeScreen';

jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

test('SearchBar exists in HomeScreen', async () => {
  const { getByTestId } = render(<HomeScreen />);
  await waitFor(() => {
    const searchBar = getByTestId('searchBar');
    expect(searchBar).toBeTruthy();
  });
});

test('SearchBar returns valid word data when a word is searched', async () => {
  const { getByTestId} = render(<HomeScreen />);
  await waitFor(async () => {
    const searchBar = getByTestId('searchBar');
    fireEvent.changeText(searchBar, 'word');

    fireEvent(searchBar, 'submitEditing');
    await waitFor(() => {
      // associated word info object
      const wordInfo = getByTestId('wordInfo');
      expect(wordInfo).toBeTruthy();
    }, { timeout: 6000 });
  });
});

test('SearchBar returns an error message when an invalid word is searched', async () => {
  const { getByTestId} = render(<HomeScreen />);
  await waitFor(async () => {
    const searchBar = getByTestId('searchBar');
    fireEvent.changeText(searchBar, 'dsfaldjfkla');

    fireEvent(searchBar, 'submitEditing');
    await waitFor(() => {
      // associated failed word object
      const wordInfo = getByTestId('failData');
      expect(wordInfo).toBeTruthy();
    }, { timeout: 6000 });
  });
});

test('Nothing is returned when a blank input is searched', async () => {
  const { getByTestId, queryByTestId, getByText} = render(<HomeScreen />);
  await waitFor(async () => {
    const searchBar = getByTestId('searchBar');
    fireEvent.changeText(searchBar, '');

    fireEvent(searchBar, 'submitEditing');

    await waitFor(() => {
      // associated failed word object
      const wordInfo = queryByTestId('failData');
      expect(wordInfo).toBeFalsy();
    }, { timeout: 6000 });

    await waitFor(() => {
      // associated word info object
      const wordInfo = queryByTestId('wordInfo');
      expect(wordInfo).toBeFalsy();
    }, { timeout: 6000 });
  });
});