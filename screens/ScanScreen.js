import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }
  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermissions: status === 'granted', buttonState: 'clicked' });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: 'true',
      scannedData: data,
      buttonState: 'normal'
    })
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
         onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} 
         style={StyleSheet.absoluteFillObject} 
          />
      )
    }
    else if (buttonState === 'normal') {
      return (
        <View>
          <Image
          style={{
            alignSelf: 'center',
            margin: 40
          }}
            source={require("../assets/BarCodeScanner.jpg")}
          />
          <Text
            style={{ textAlign: 'center', fontSize: 25 }}
          >
            {hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permissions"}
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              backgroundColor: "#11ffaa",
              width: 100,
              height: 60,
              alignSelf: 'center',
              margin: 20
            }}
            onPress={this.getCameraPermissions}
          >
            <Text
              style={{ textAlign: 'center', fontSize: 30, color: '#000' }}
            >Scan</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

}
const styles = StyleSheet.create({});