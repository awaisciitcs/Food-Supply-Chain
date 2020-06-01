import React, { Component } from 'react'
import { Text,TextInput,Picker, StyleSheet, View,Button ,ImageBackground,ScrollView } from 'react-native'
import Login from './Login'

export default class CheckScreen extends Component {
    constructor(props) {
 
        super(props)
     
        this.state = {
            loadedParticipantData:false,
            login:false,
            datasource:null,
            load:false,
            participantId:'',
            password:'',
            participantType:''
        }
        this.loadParticipant = this.loadParticipant.bind(this)

    }

    updateValue(text,field){
        if(field=='participantId'){
          this.setState({
            participantId:text,
          })
        }
       else if(field=='password'){
          this.setState({
            password:text,
          })
        }
        }
loadParticipant(){
    
        return fetch('http://192.168.0.113:3000/api/flightoperation.'+this.state.participantType+'/'+this.state.participantId)
        .then(  (response)=> response.json() )
        .then(  (responseJson) =>{
        //  this.setState({
        //     loadedParticipantData:true,
        //     login:true,
        //    dataSource: responseJson
        //  })
        })
        .catch((error)=>{
            this.setState({
                loadedParticipantData:true,
                login:true,
               dataSource: responseJson
             })
          console.warn(error);
        });
    
}
    render() {

        if(!this.state.login){

            const {navigate} = this.props.navigation;
            return (
                <ImageBackground
                source={require('./flydub.jpg')}
                style={{width:'100%', height:'100%'}}
                >
                   <ScrollView style={styles.scrollView}>
                       <Text style ={styles.title}>Login-details</Text>
                   <Text style={styles.stext}>participantId</Text>
             <TextInput
             style={styles.input}
             placeholder="participantId"
             placeholderTextColor="rgba(255,255,255,0.6)"
             returnKeyType="next"            
             autoCapitalize='none'
             autoCorrect={false}
            type="text"
            name="participantId"
            onChangeText={(text)=>this.updateValue(text,'participantId')}
            value={this.state.participantId}
            id="participantId"
             />
                 <Text style={styles.stext}>Password</Text>
             <TextInput
             style={styles.input}
             placeholder="password"
             placeholderTextColor="rgba(255,255,255,0.6)"
             returnKeyType="next"            
             autoCapitalize='none'
             autoCorrect={false}
            type="text"
            name="password"
            onChangeText={(text)=>this.updateValue(text,'password')}
            value={this.state.password}
            id="password"
             />
                                      <Text style={styles.stext}>participantType</Text>
                         <Picker
  selectedValue={this.state.participantType}
  style={styles.input}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({participantType: itemValue})
  }>

<Picker.Item label="Agent" value="Agent" />
  <Picker.Item label="Manufacturer" value="Manufacturer" />
  <Picker.Item label="Distributor" value="Distributor" />
  <Picker.Item label="WarehouseManager" value="WarehouseManager" />
  <Picker.Item label="MartAdmin" value="MartAdmin" />
  
</Picker>
<Button
               style={styles.buttoncont}
                title= "Login"
                color="orange"
                onPress={this.loadParticipant}
                />


                 </ScrollView>
                </ImageBackground>
            )
        }
        else if(this.state.login) {
            const {navigate} = this.props.navigation;
            return (
                <ImageBackground
                source={require('./flydub.jpg')}
                style={{width:'100%', height:'100%'}}
                >
                   <ScrollView style={styles.scrollView}>
                   <View>
                       <Text style={styles.textt}>participent id</Text>
                       <Text style={styles.textt}>participent type</Text>
                       <Text style={styles.textt}>......</Text>
                   </View>
              <View  style={styles.buttoncont}>
               <Button
               
                title= "History"
                color="orange"
                onPress={() => navigate('Hist')}
                />
                </View>
                <View  style={styles.buttoncont}>
               <Button
               
                title= "Create process"
                color="orange"
                onPress={() => navigate('Details')}
                />
               
               {/* <Button
               
                title= "Create process"
                color="#F07D21"
                onPress={() => navigate('Details')}
                /> */}
                </View>
                  {/* <Login/> */}
                  <View style={styles.wrapper}>
                  <View style={styles.titlewraper}> 
                  <View style={styles.buttoncont}>
                   <Button
                 
                 title="Back"
                 onPress={() => navigate('Splash')}
                 />
                 </View>
               </View>
                 </View>
    
                 </ScrollView>
                </ImageBackground>
            )
        }

    }
}

const styles = StyleSheet.create({
    
   







    textt:{
        fontSize:35,
      
    },
    scrollView: {
    
        // backgroundColor: 'orange',
        // marginHorizontal: 20,
        marginTop:20,
      },
    buttontext:{
        textAlign:'center',
        color:"white",
        fontWeight:'700',
        
    },
    buttoncont:{
        backgroundColor:"#0652DD",
        paddingVertical:15,
        borderRadius:25,
        padding: 25,
        alignContent:"center",
        marginBottom:20
      },
    titlewraper:{
        flex: 1,
        justifyContent:"center"

    },
    wrapper: { 
        // backgroundColor:'#F07D21',
        flex: 1, 
        justifyContent: "center",
        alignItems:"center"
     },
     title: {
        color: 'black',
        fontSize:35,
        fontWeight:'bold',
        marginBottom:20,
        alignItems:"center",
        justifyContent: "center"

     },
     input:{
        height:40,
        backgroundColor:'#4A75B9',
        // marginBottom:10,
        color:'#F07D21',
        paddingHorizontal:10,
        borderRadius:25
        
    }
})
