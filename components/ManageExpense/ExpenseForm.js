import { Alert, StyleSheet, Text, View } from "react-native";
import { isValidElement, useState } from "react";

import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";


function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0 ;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { 
            value: curInputs.description.value, 
            isValid: descriptionIsValid 
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid = 
    !inputs.amount.isValid || 
    !inputs.date.isValid || 
    !inputs.description.isValid;

  return (
    <View style={styles.formStyle}>
      <Text style={styles.titleStyle}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          label={"Amount"} 
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }} 
          style={styles.rowInput}
        />
        <Input 
          label={"Date"} 
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value,
          }} 
          style={styles.rowInput}
        />
      </View>
      <Input 
        label={"Description"} 
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none',
          // autoCorrect: false, //default is true
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
        }} 
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 40,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,

  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
    marginBottom: 13,
  },
});