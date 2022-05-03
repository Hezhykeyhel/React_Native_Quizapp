import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const shuffleArray = (array)=> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const Quiz = ({navigation}) => {
    const [questions, setQuestions] = useState();
    const [quest, setQues] = useState(0);
    const [options, setOptions] = useState([]);
    const [scores, setScores] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const getQuiz = async () => {
        setLoading(true)
        const url = "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results[0]);
        setQuestions(data.results);
        setOptions(generateOptionsAndArrange (data.results[0]));
        setLoading(false)
    }
    useEffect(()=>{
        getQuiz();
    }, []);
    const handleNextPress = () => {
        setQues(quest+1)
        setOptions(generateOptionsAndArrange(questions[quest + 1]));
    }
    const generateOptionsAndArrange = (_questions) => {
        const options = [..._questions.incorrect_answers];
        options.push(_questions.correct_answer)
        // console.log(options, 'Before')
        shuffleArray(options)
        // console.log(options, 'After')
        return options
    }
    const handleSelectedOption =(_option)=>{
        if(_option===questions[quest].correct_answer){
            setScores(scores + 10)
        }
        if(quest !==9){
            setQues(quest + 1);
            setOptions(generateOptionsAndArrange(questions[quest+1]));
        }
        if(quest ===9){
            handleShowResult()
        }
    }
    const handleShowResult = () => {
        navigation.navigate('Result', {scores:scores})
    }
  return (
    <View style={styles.container}>
      {isLoading ? <View><Text>Loading Questions...</Text></View> : questions && (
      <View style={styles.parent}>
          <View style={styles.content}>
          <Text style={styles.questions}>Q.{decodeURIComponent(questions[quest].question)}</Text>
      </View>
      <View style={styles.options}>
          <TouchableOpacity style={styles.opts} onPress={()=>handleSelectedOption(options[0])}>
          <Text style={styles.optionButtons}>{decodeURIComponent(options[0])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.opts} onPress={()=>handleSelectedOption(options[1])}>
          <Text style={styles.optionButtons}>{decodeURIComponent(options[1])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.opts} onPress={()=>handleSelectedOption(options[2])}>
          <Text style={styles.optionButtons}>{decodeURIComponent(options[2])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.opts} onPress={()=>handleSelectedOption(options[3])}>
          <Text style={styles.optionButtons}>{decodeURIComponent(options[3])}</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
          {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>PREV</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={()=>navigation.navigate("Result")} style={styles.button}>
              <Text style={styles.buttonText}>END</Text>
          </TouchableOpacity> */}
          {quest!== 9 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
              <Text style={styles.buttonText}>SKIP</Text>
          </TouchableOpacity>}
          {quest===9 && <TouchableOpacity style={styles.button} onPress={handleShowResult}>
              <Text style={styles.buttonText}>SHOW RESULTS</Text>
          </TouchableOpacity>}
      </View>
      </View>
        )}
    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
    container:{
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%'
    },
    imgUrl:{
        width: 200,
        height:200,
        alignSelf:'center'
    },
    content:{
        marginVertical:16,
    },
    options:{
        marginVertical: 16,
        flex:1,
    },
    button:{
        backgroundColor:'#184E77',
        borderRadius:20,
        padding:12,
        paddingHorizontal:30,
        marginBottom: 30
      },
      optionButtons:{
        color:'white'
      },
      buttonText:{
        fontSize: 14,
        fontWeight:'600',
        textAlign: 'center',
        color:'white',
      },
      questions:{
          fontSize: 26,
      },
    bottomContainer:{
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'center',
        flexDirection:'row'
    },
    parent:{
        height: '100%'
    },
    opts:{
        paddingVertical: 12,
        paddingHorizontal: 6,
        marginBottom:15,
        borderRadius: 8,
        color:'#fff',
        backgroundColor:'#34A0A4' 
    }
})