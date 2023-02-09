import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './ChatStyles';
import { FontAwesome } from '@expo/vector-icons';
import { socket } from '../utils/socket';

const Chat = ({ navigation }) => {
  const [chats, setchats] = useState([]);
  const [message, setmessage] = useState('');

  useEffect(() => {
    socket.on('message-recieved', ({ data }) => {
      setchats((prev) => [...prev, data]);
      console.log('newData : ', data);
    });
  }, [socket]);

  const sendMessage = () => {
    if (message === '') return;
    socket.emit('send-message', { message, type: 'recieved' });
    let data = {};
    data.message = message;
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AmPm = 'AM';
    if (hours > 12) {
      hours -= 12;
      AmPm = 'PM';
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    data.time = hours + ':' + minutes + ' ' + AmPm;
    data.type = 'sent';
    setchats((prev) => [...prev, data]);

    setmessage('');
  };
  return (
    <View style={styles.cont}>
      <Text style={styles.title}>Chat App</Text>

      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.messageBox,
                item.type === 'recieved'
                  ? { alignSelf: 'flex-start' }
                  : { alignSelf: 'flex-end' },
              ]}
            >
              <Text style={[styles.message]}>{item.message}</Text>
              <Text style={styles.date}>{item.time}</Text>
            </View>
          );
        }}
      />

      {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            padding: 10,
            margin: 10,
            fontSize: 20,
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
          }}
        >
          Login
        </Text>
      </TouchableOpacity> */}

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <View style={styles.inputCont}>
          <TextInput
            multiline
            value={message}
            onChangeText={
              Platform.OS === 'windows'
                ? (e) => {
                    setmessage(e.target.value);
                  }
                : (value) => {
                    setmessage(value);
                  }
            }
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendIcon}>
            <FontAwesome name="send" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;
