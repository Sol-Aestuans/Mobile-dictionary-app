import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, SearchView } from './themed/View';
import { Text } from './themed';
import { Svg, Path } from 'react-native-svg';
import TextInput from './themed/Misc'

const SearchBar = ({ handleSearch }) => {
    const [input, setInput] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [inputStyle, setInputStyle] = useState(styles.searchContainer)

    const handleSubmit = () => {
        if(input.trim() === ''){
            setErrorMessage("Whoops, can't be empty...");
            setInputStyle(styles.errorInput);
        } else {
            setInput('');
            setErrorMessage(null);
            setInputStyle(styles.searchContainer)
            handleSearch(input);
        }
    };

    const handleInputChange = (text) => {
        setInput(text);
        if(text.trim() !== ''){
            setInputStyle(styles.searchingContainer);
            setErrorMessage(null);
        } else {
            setInputStyle(styles.searchContainer)
        }
    }

    return (
        <View>
            <SearchView style={inputStyle}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a word"
                    placeholderTextColor = "#757575"
                    value={input}
                    onChangeText={(text) => handleInputChange(text)}
                    onSubmitEditing={handleSubmit}
                    testID='searchBar'
                />
                <TouchableOpacity style={styles.icon} title = "search" onPress={handleSubmit}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <Path fill="none" stroke="#A445ED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z" />
                    </Svg>
                </TouchableOpacity>
            </SearchView>
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({

    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        height: 40,
    },

    searchingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#A445ED'
    },

    input: {
        width: '90%',
        height: '100%',
        paddingLeft: 10,
    },

    errorInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5252'
    },

    errorMessage: {
        color: '#FF5252',
        paddingTop: 5
    },

    icon: {
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchBar;
