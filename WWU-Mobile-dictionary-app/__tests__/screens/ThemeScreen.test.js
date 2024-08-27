import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ThemeScreen from '../../src/screens/ThemeScreen';

jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

test('renders correctly', async () => {
    const { getByText } = render(<ThemeScreen />);
  
    await waitFor(
      () => {
        const appText = getByText('light');
        expect(appText).not.toBeNull();
      },
      { timeout: 6000 }
    );
  }, 10000),

  test('test background color', () => {
    const { getByText, getByTestId } = render(<ThemeScreen />);
    
    //fireEvent.press(getByText('light'));
    //const themeView = getByTestId('testView');

    const themeViewBefore = getByTestId('testView');

    // Press the 'light' button
    fireEvent.press(getByText('dark'));

    // Get the view with the updated background color
    const themeViewAfter = getByTestId('testView');

    // Assert that the background color changes to white when pressing 'light'
    //Why is this not working!!!???
    expect(themeViewBefore).toHaveStyle({ backgroundColor: '#ffffff' });
    expect(themeViewAfter).toHaveStyle({ backgroundColor: '#050505' });
  });