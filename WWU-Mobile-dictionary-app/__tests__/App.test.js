import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);


// test if the app renders correctly
test('renders correctly', () => {
  render(<App />);
});


