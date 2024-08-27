import { render, waitFor } from '@testing-library/react-native';
import FontScreen from '../../src/screens/FontScreen';

jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

test('renders correctly', async () => {
    const { getByText } = render(<FontScreen />);
  
    await waitFor(
      () => {
        const appText = getByText('sans');
        expect(appText).not.toBeNull();
      },
      { timeout: 6000 }
    );
  }, 10000);