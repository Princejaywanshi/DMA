import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const DEFAULT_TINT_COLOR = '#3CB371';
const DEFAULT_OFF_TINT_COLOR = '#DCDCDC';
const DEFAULT_TEST_ID_PREFIX = 'otp_input_';
const DEFAULT_KEYBOARD_TYPE = 'numeric';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    width: 40,
    borderWidth: 1,
    margin: 10,
    textAlign: 'center',
    fontWeight: '500',
    color:"#ffffff",
    borderRadius:10,
    backgroundColor:"#4f4f4f"
  },
});

class OTPTextView extends Component {
  static defaultProps = {
    defaultValue: '',
    inputCount: 6,
    tintColor: DEFAULT_TINT_COLOR,
    offTintColor: DEFAULT_OFF_TINT_COLOR,
    inputCellLength: 1,
    containerStyle: {},
    textInputStyle: {},
    handleTextChange: () => {},
    keyboardType: DEFAULT_KEYBOARD_TYPE,
    testIDPrefix: DEFAULT_TEST_ID_PREFIX,
    autoFocus: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: 0,
      otpText: this.getOTPTextChunks(
        props.inputCount,
        props.inputCellLength,
        props.defaultValue
      ),
    };

    this.inputs = [];
  }

  getOTPTextChunks = (inputCount, inputCellLength, text) => {
    let matches = text.match(new RegExp(`.{1,${inputCellLength}}`, 'g')) || [];
    return matches.slice(0, inputCount);
  };

  basicValidation = (text) => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  onTextChange = (text, i) => {
    if (text && !this.basicValidation(text)) return;

    this.setState(
      (prevState) => {
        let otpText = [...prevState.otpText];
        otpText[i] = text;
        return { otpText };
      },
      () => {
        this.props.handleTextChange(this.state.otpText.join(''));
        if (text.length === this.props.inputCellLength && i !== this.props.inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      }
    );
  };

  onInputFocus = (i) => {
    const { otpText } = this.state;
    if (i > 0 && !otpText[i - 1]) {
      this.inputs[i - 1].focus();
    } else {
      this.setState({ focusedInput: i });
    }
  };

  onKeyPress = (e, i) => {
    const val = this.state.otpText[i] || '';

    if (e.nativeEvent.key !== 'Backspace' && val && i !== this.props.inputCount - 1) {
      this.inputs[i + 1].focus();
      return;
    }

    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      this.setState(
        (prevState) => {
          let otpText = [...prevState.otpText];
          otpText[i - 1] = otpText[i - 1]?.slice(0, -1) || '';
          return { otpText };
        },
        () => {
          this.props.handleTextChange(this.state.otpText.join(''));
          this.inputs[i - 1].focus();
        }
      );
    }
  };

  clear = () => {
    this.setState({ otpText: [] }, () => {
      this.inputs[0].focus();
      this.props.handleTextChange('');
    });
  };

  setValue = (value, isPaste = false) => {
    const updatedFocusInput = isPaste ? this.props.inputCount - 1 : value.length - 1;

    this.setState(
      {
        otpText: this.getOTPTextChunks(this.props.inputCount, this.props.inputCellLength, value),
      },
      () => {
        if (this.inputs[updatedFocusInput]) {
          this.inputs[updatedFocusInput].focus();
        }
        this.props.handleTextChange(value);
      }
    );
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      containerStyle,
      textInputStyle,
      keyboardType,
      testIDPrefix,
      autoFocus,
      ...textInputProps
    } = this.props;

    const { focusedInput, otpText } = this.state;

    return (
      <View style={[styles.container, containerStyle]}>
        {Array.from({ length: inputCount }).map((_, i) => {
          const _tintColor = Array.isArray(tintColor) ? tintColor[i] : tintColor;
          const _offTintColor = Array.isArray(offTintColor) ? offTintColor[i] : offTintColor;

          return (
            <TextInput
              key={i}
              ref={(ref) => (this.inputs[i] = ref)}
              autoCorrect={false}
              keyboardType={keyboardType}
              autoFocus={autoFocus && i === 0}
              value={otpText[i] || ''}
              style={[
                styles.textInput,
                textInputStyle,
                { borderColor: focusedInput === i ? _tintColor : _offTintColor },
              ]}
              maxLength={this.props.inputCellLength}
              onFocus={() => this.onInputFocus(i)}
              onChangeText={(text) => this.onTextChange(text, i)}
              onKeyPress={(e) => this.onKeyPress(e, i)}
              selectionColor={_tintColor}
              cursorColor={_tintColor}
              {...textInputProps}
              testID={`${testIDPrefix}${i}`}
            />
          );
        })}
      </View>
    );
  }
}

export default OTPTextView;
