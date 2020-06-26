import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Images2 from '../../../../../assets/images2';
import styles from './style';

class index extends Component {
  render() {
    return (
      <View style={styles.parrentView}>
        <View style={styles.viewLeft}>
          {this.props.navigation && (
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => this.props.navigation.goBack()}>
              <Image
                style={styles.imageButtonLeft}
                source={Images2.imgIcBack}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.viewCenter}>
          <Text style={styles.textCenter}>{this.props.title}</Text>
        </View>
        <View style={styles.viewRight}>
          <TouchableOpacity
            onPress={() => {
              this.props.onShare && this.props.onShare();
            }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={Images2.imgIcShare}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.showCalendar && this.props.showCalendar();
            }}>
            <Image style={{ width: 50, height: 50 }} source={Images2.imgIcDate} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default index;
