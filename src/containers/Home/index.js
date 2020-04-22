import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Container, Body, Header, Content} from 'native-base';
import Config from '../../config';
import {connect} from 'react-redux';
import Images from '../../assets/images';
import * as authActions from '../../redux/actions/authActions';
import ItemChannel from './Component/ItemChannel';
import {EventRegister} from 'react-native-event-listeners';
import DataLocal from '../../services/DataLocal';
const {width, height} = Dimensions.get('window');

const widthView = width - 30;

class index extends Component {
  constructor(props) {
    super(props);
    this.listTag = ['#4~5세', '#영어게임', '#놀이'];
    this.listHotChannel = [
      {
        image:
          'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
        title: '쿠리와 함께하는 문장게임',
        tags: ['#4~5세', '#영어게임', '#놀이'],
      },
      {
        image:
          'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
        title: '쿠리와 함께하는 문장게임',
        tags: ['#4~5세', '#영어게임', '#놀이'],
      },
      {
        image:
          'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
        title: '쿠리와 함께하는 문장게임',
        tags: ['#4~5세', '#영어게임', '#놀이'],
      },
      {
        image:
          'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
        title: '쿠리와 함께하는 문장게임',
        tags: ['#4~5세', '#영어게임', '#놀이'],
      },
    ];
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const timeoutLoading = setTimeout(() => {
      this.setState({loading: false});
      clearTimeout(timeoutLoading);
    }, 2000);
    this.checkScreenAndLoadData();
  }

  async checkScreenAndLoadData() {
    //check login or show intro
    const hasShowIntro = await DataLocal.getHasShowIntro();
    const userToken = await DataLocal.getUserToken();
    console.log('userToken:', userToken);
    if (hasShowIntro == null) {
      this.props.navigation.navigate('Intro1');
    } else if (userToken == null || userToken == 'null') {
      this.props.navigation.navigate('SignIn');
    }
  }

  renderItem({item, index}) {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#CACACA',
        }}>
        <Text style={{fontSize: 15, fontWeight: '600', marginLeft: 10}}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  async componentWillMount() {
    this.props.generateAccessToken();
    this.listenerGoToSignIn = EventRegister.addEventListener(
      Config.Constant.EVENT_GOTO_SIGNIN,
      (data) => {
        this.props.navigation.navigate('SignIn');
      },
    );
    this.listenerSignInSuccess = EventRegister.addEventListener(
      Config.Constant.EVENT_SIGNIN_SUCCESS,
      (data) => {
        console.log('Call data home');
      },
    );
    this.listenerSignOut = EventRegister.addEventListener(
      Config.Constant.EVENT_SIGN_OUT,
      (data) => {
        DataLocal.setUserToken('null');
        this.props.navigation.navigate('SignIn');
      },
    );
  }
  componentWillUnmount() {
    EventRegister.removeEventListener(this.listenerGoToSignIn);
    EventRegister.removeEventListener(this.listenerSignInSuccess);
    EventRegister.removeEventListener(this.listenerSignOut);
  }

  render() {
    const {loading} = this.state;
    if (loading) {
      return (
        <View
          style={{
            width,
            height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#499DA7" />
        </View>
      );
    }
    return (
      <Container>
        <Header
          style={[
            Config.Styles.header,
            {
              borderBottomWidth: 1,
              borderBottomColor: 'white',
            },
          ]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width,
              alignItems: 'center',
            }}>
            <Image
              style={{width: 100, height: 23, marginLeft: 15}}
              source={Images.imgLogo}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                style={{width: 25, height: 19, marginRight: 10}}
                source={Images.imgIcMenuBar}
              />
            </TouchableOpacity>
          </View>
        </Header>
        <Body>
          <Content
            style={{backgroundColor: '#fefefe'}}
            showsVerticalScrollIndicator={false}>
            <View>
              <View
                style={{
                  width,
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}>방송 중</Text>
                <View
                  style={{
                    width: widthView,
                    height: 1,
                    backgroundColor: '#f7f7f7',
                    marginVertical: 10,
                  }}
                />
                <Text
                  style={{color: '#333333', fontWeight: 'bold', fontSize: 20}}>
                  쿠리와 함께하는 단어게임
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  {this.listTag.map((e) => {
                    return (
                      <TouchableOpacity>
                        <Text style={{color: '#4E9DA6', marginRight: 10}}>
                          {e}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <ImageBackground
                  source={{
                    uri:
                      'https://s3.ap-northeast-2.amazonaws.com/minischool-dev-001/book/minischool/thumbnail/1585112351121.ico',
                  }}
                  imageStyle={{borderRadius: 5}}
                  style={{
                    width: widthView,
                    height: (widthView * 500) / 980,
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      width: 60,
                      position: 'absolute',
                      left: 10,
                      top: 10,
                      paddingVertical: 5,
                      textAlign: 'center',
                      borderRadius: 15,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      On Air
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Image
                      style={{width: 50, height: 50}}
                      source={Images.imgIcPlay}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  marginTop: 30,
                  backgroundColor: '#fefefe',
                }}>
                <Text
                  style={{
                    color: '#00000',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  Hot Channel
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 20,
                    marginTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 5,
                  }}>
                  {this.listHotChannel.map((e) => {
                    return (
                      <ItemChannel
                        item={e}
                        widthView={widthView - 30}
                        navigation={this.props.navigation}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateAccessToken: () => dispatch(authActions.generateAccessToken()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
