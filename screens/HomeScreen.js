import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definition: '',
      phonetics: '',
    };
  }
  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];

          var definition = 'Definition: ' + wordData.description;
          var lexicalCategory = 'Type: ' + wordData.wordtype;

          this.setState({
            word: 'Word: ' + this.state.text,
            definition: definition,
            phonetics: lexicalCategory,
          });
        } else {
          this.setState({
            word: 'Word: ' + this.state.text,
            definition: 'Not Found',
          });
        }
      });
  };

  render() {
    return (
      <View>
        <Image
          style={{
            width: 150,
            height: 150,
            alignSelf: 'center',
          }}
          source={{
            uri:
              'https://images-na.ssl-images-amazon.com/images/I/61kzIB9vF0L.png',
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'Loading....',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.text1}> SEARCH </Text>
        </TouchableOpacity>

        <Text style={styles.text}>{this.state.word}</Text>
        <Text style={styles.text}>{this.state.phonetics}</Text>
        <Text style={styles.text}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 20,
    width: '80%',
    height: 40,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 4,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#17A0CE',
  },
  text1: {
    textAlign: 'center',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
