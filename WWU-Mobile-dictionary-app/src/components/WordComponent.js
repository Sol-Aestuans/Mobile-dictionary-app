import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Circle, Path } from 'react-native-svg';
import { View } from '../components/themed/View';
import { Text, TextBold, TextContrast, TextAlt, TextBoldContrast } from '../components/themed/Text';

const WordComponent = ({ wordData }) => {

    const playSound = async () => {
        try {
            if (wordData.phonetics && wordData.phonetics.length > 0) {
                const firstSound = wordData.phonetics.find((phonetic) => phonetic.audio && phonetic.audio.trim() !== '').audio;
            
                console.log(firstSound)
                if (firstSound) {
                    const sound = new Audio.Sound();
                    await sound.loadAsync({ uri: firstSound });
                    await sound.playAsync();
                }
            }
        } catch (error) {
        }
    };
    if(wordData !== -1){
        return (    
            <ScrollView testID='wordInfo' style={styles.container}>
                <View style={styles.headerContainer}>

                    <View>
                        {/* List Word and Phonetics */}
                        <TextBold style={styles.word} key="word">{wordData.word}</TextBold>

                        {/* Iterate through phonetics until text is found */}
                        {wordData.phonetics.map((phonetic, index) => (
                            phonetic.text && phonetic.text.trim() !== '' && (
                                <TextContrast style={styles.phonetic} key={`phonetic-${index}`}>
                                    {phonetic.text}
                                </TextContrast>
                            )
                        ))}
                    </View>

                    <View>
                        <TouchableOpacity title='Play Audio' onPress={playSound}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
                                <Circle cx="37.5" cy="37.5" r="37.5" fill="#A445ED" opacity="0.25" />
                                <Path d="M29 27v21l21-10.5z" fill="#A445ED" />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* For each meaning... */}
                {wordData.meanings.map((meaning, meaningIndex) => (

                    // List part of speech and gray line
                    <View  key={`meaning-${meaningIndex}-${meaning.partOfSpeech}`}>
                        <View style={styles.partOfSpeechContainer}>
                            <View style={styles.line} />
                            <TextBoldContrast style={styles.partOfSpeech} key={`partOfSpeech-${meaningIndex}`}>{meaning.partOfSpeech}</TextBoldContrast>
                            
                        </View>

                        <TextAlt style={styles.listHeader} key={`meaningText-${meaningIndex}`}>Meaning</TextAlt>

                        {/* For each definition...  */}
                        {meaning.definitions.map((definition, definitionIndex) => (
                            <View  key={`definition-${meaningIndex}-${definitionIndex}`}>
                                
                                {/* List definition */}
                                <View style={styles.definitionContainer} key={`definitionContainer-${meaningIndex}-${definitionIndex}`}>
                                    <TextContrast style={styles.bullet} key={`bullet-${meaningIndex}-${definitionIndex}`}>
                                        •
                                    </TextContrast>
                                    <Text style={styles.definitionText} key={`definitionText-${meaningIndex}-${definitionIndex}`}>
                                        {definition.definition}
                                    </Text>
                                </View>


                                {/* Conditionally List example */}
                                {definition.example && (
                                    <TextAlt style={styles.exampleText}key={`exampleText-${meaningIndex}-${definitionIndex}`}>
                                        "{definition.example}"
                                    </TextAlt>
                                )}
                            </View>
                        ))}
                        
                        {/* Conditionally List Synonyms */}
                        <View style={styles.lexicalRelationsContainer}>
                            {meaning.synonyms.length > 0 && (
                                <TextAlt key={`synonymsText-${meaningIndex}`}>Synonyms</TextAlt>
                            )}
                                <View style={styles.relations}>
                                    {meaning.synonyms.length > 0 && (
                                        meaning.synonyms.map((synonym, synonymIndex) => (
                                            <TextContrast key={`synonym-${meaningIndex}-${synonymIndex}`}>
                                                {synonym}{'   '}
                                            </TextContrast>
                                        ))
                                    )}
                                </View>
                        </View>

                        {/* Conditonally List Antonyms */}
                        <View style={styles.lexicalRelationsContainer}>
                        {meaning.antonyms.length > 0 && (
                            <TextAlt key={`antonymsText-${meaningIndex}`}>antonyms</TextAlt>
                        )}
                            <View style={styles.relations}>
                                {meaning.antonyms.length > 0 && (
                                    meaning.antonyms.map((antonym, antonymIndex) => (
                                        <TextContrast key={`antonym-${meaningIndex}-${antonymIndex}`}>
                                            {antonym}{'   '}
                                        </TextContrast>
                                    ))
                                )}
                            </View>
                        </View>
                    </View>
                ))}

                
                <View style={styles.line} />
                {/* List Sources */}
                <View style={styles.sourcesContainer}>
                    
                    <TextAlt key="sourcesText">Source </TextAlt>
                    <View style={styles.sources}>
                    {wordData.sourceUrls.map((url, urlIndex) => (
                        <Text key={`source-${urlIndex}`}>{url}</Text>
                    ))}
                    </View>
                </View>
            </ScrollView>
        );
    } else {
        return(
            <View testID='failData'style={styles.issueContainer}>
                <Text>😕</Text>
                <TextBold>No Definitions Found</TextBold>
                <TextAlt>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at a later time or head to the web instead.</TextAlt>
            </View>
        );
    }
};

    // reconfigure this later to include context themes with = (theme) => stylesheet.create 
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            width: '90%',
            padding: 10
        },

        headerContainer: {
            flexDirection: 'row',
            paddingVertical: 7,
            justifyContent: 'space-between'
        },


        partOfSpeechContainer:{
            flexDirection: 'row-reverse',
            paddingVertical: 20,
            alignItems: 'center'
        },

        definitionContainer: {
            flexDirection: 'row',
            maxWidth: '100%',
            paddingLeft: 7,
            paddingVertical: 7
        },

        lexicalRelationsContainer: {
            paddingVertical: 7,
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },

        relations: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            maxWidth: '70%',
            paddingLeft: 15
        },

        sourcesContainer: {
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },

        issueContainer :{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 40,
            justifyContent: 'space-between',
            height: '37%'
        },
        sources: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            maxWidth: '70%',
            paddingLeft: 15,
        },

        definitionText: {
            paddingLeft: 10,
            maxWidth: '100%'
        },

        exampleText: {
            paddingLeft: 20,
        },

        line: {
            flex: 1,
            height: 0.5,
            backgroundColor: 'gray',
            borderRadius: 10,
        },

        partOfSpeech: {
            paddingRight: 15,
        },

        word: {
            fontSize: 40,
            paddingBottom: 5
        },

        phonetic: {

        },
    })


export default WordComponent;
