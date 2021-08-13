import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet , TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App(){

  const [darkMode, setDarkMode] = useState(false);

  const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, '+', 0, '.', '+/-', '=']  

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")


  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    switch(operator){
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-': 
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case '*':
        setCurrentNumber((fistNumber * lastNumber).toString())
        return
      case '/': 
        setCurrentNumber((fistNumber / lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed)
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/" ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)))
        return
      case 'AC':
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,

      alignItems: 'center',

      backgroundColor: darkMode ? '#3e3e4d' : '#f9f9f9', 
    },
    resultsContainer:{
      alignItems: 'flex-end',
      justifyContent: 'flex-end',

      minHeight: '40%',
      width: '100%',

      backgroundColor: darkMode ? '#3e3e4f' : '#fff',
    },
    textResults:{
      margin: 10,

      fontSize: 30,

      color: darkMode ? '#f5f5f5' : '#3e3e4d',
    },
    historyText:{
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton:{
      alignItems: 'center',
      justifyContent: 'center',

      height: 40,
      width: 40,

      marginTop: 15,
      bottom: 90,
      marginRight: 300,

      borderRadius: 20,

      backgroundColor: darkMode ? '#4f4f62' : '#f1f1f1',
    },
    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : "#e5e5e5",
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 80, 
      minHeight: 77,
      flex: 2,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#6c6c6c",
      fontSize: 30,
    }, 

  });

  return(
    <View style={styles.container}>
      <StatusBar style={ darkMode ? 'light' : 'dark'} backgroundColor={darkMode ? '#54546b' : '#f1f1f1'}/>
      <View style={styles.resultsContainer}>

        <TouchableOpacity style={styles.themeButton}>
        <Entypo 
          name={darkMode ? "light-up" : 'moon'} 
          size={24} color={darkMode ? "white" : 'black'} 
          onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)} 
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.textResults}>{currentNumber}</Text>
      </View>

      <View style={styles.buttonsContainer}>
      {buttons.map((button) => 
          button === '=' ?
        <TouchableOpacity 
          onPress={() => handleInput(button)} 
          key={button} 
          style={[styles.button, {backgroundColor: '#d69a00'}]}
          >
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          :
          <TouchableOpacity 
          onPress={() => handleInput(button)} 
          key={button} 
          style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode === true ? '#3e3e4d' : '#fff': darkMode === true ? '#54546b' : '#f1f1f1'}]}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}