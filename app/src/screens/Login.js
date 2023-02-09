import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './LoginStyle';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/core';
import { socket } from '../utils/socket';
const Login = () => {
  const isFocused = useIsFocused();

  const [email, setemail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [password, setpassword] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [hidePassword, sethidePassword] = useState(true);
  const [error, seterror] = useState('');

  const handleLogin = () => {
    if (email === '') {
      setemailerror('Email Must be Provided');
    }
    if (password === '') {
      setpassworderror('Password Must be Provided');
    }
    if (email === '' || password === '') return;
    socket.emit('login', { email, password });
  };

  return (
    <ScrollView>
      <View style={styles.cont}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.desc}>Login To Your Account</Text>
        <View style={styles.inputCont}>
          <Entypo
            name="mail"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={(value) => {
              setemail(value);
              setemailerror('');
            }}
            keyboardType={'email-address'}
          />
        </View>
        <Text style={styles.errorText}>{emailerror}</Text>
        <View style={styles.inputCont}>
          <Entypo
            name="lock"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
          <TextInput
            style={styles.inputPassword}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={(value) => {
              setpassword(value);
              setpassworderror('');
            }}
            secureTextEntry={hidePassword ? true : false}
          />
          <TouchableOpacity
            onPress={() => {
              sethidePassword(!hidePassword);
            }}
            activeOpacity={0.6}
          >
            {hidePassword ? (
              <Ionicons
                name="eye-off-sharp"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            ) : (
              <Ionicons
                name="eye-sharp"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={[styles.errorText, { marginBottom: 0 }]}>
          {passworderror}
        </Text>

        <Text
          style={[
            styles.errorText,
            {
              marginBottom: 0,
            },
          ]}
        >
          {error}
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAccBtn}
          onPress={() => navigation.navigate('Signup')}
          activeOpacity={0.7}
        >
          <Text style={styles.createAccText}>Create New Account?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
