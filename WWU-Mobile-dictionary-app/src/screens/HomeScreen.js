import React, { useState} from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/themed/View';
import axios from 'axios';
import WordComponent from '../components/WordComponent';
import Main from '../layouts/Main';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';


const HomeScreen = () => {
  const [definition, setDefinition] = useState('');
  const [wordData, setWordData] = useState(null);

  const handleSearch = async (word) => {
    try {
      console.log(word);
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = response.data[0];

      setWordData(data);
    } catch (error) {
      setWordData(-1)
    }
  };

  return (
    <Main>
      <Header/>
      <View style={styles.container}>
        <SearchBar handleSearch={handleSearch}/>
        {wordData !== null && (
          <WordComponent wordData={wordData} />
        )}
      </View>
    </Main>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },

  definition: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
