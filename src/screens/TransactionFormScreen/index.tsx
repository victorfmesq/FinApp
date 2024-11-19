import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { v4 as uuidv4 } from 'uuid';
import useTransactions from '../../contexts/hooks/useTransactions';
import { Transaction } from '../../contexts/providers/TransactionsProvider/types';
import { useNavigation } from '@react-navigation/native';

type TransactionFormScreenProps = {
  transaction?: Transaction;
};

const TransactionFormScreen: React.FC<TransactionFormScreenProps> = ({
  transaction,
}) => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [date, setDate] = useState<Date>(new Date());
  const [showTypeSelector, setShowTypeSelector] = useState<boolean>(false);

  const { addTransaction, updateTransaction } = useTransactions();
  const { goBack } = useNavigation();

  useEffect(() => {
    if (transaction) {
      setName(transaction.name);
      setAmount(transaction.amount);
      setType(transaction.type);
      setDate(new Date(transaction.date));
    }
  }, [transaction]);

  const handleAddTransaction = () => {
    if (!name || !amount || amount <= 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      name,
      amount: Number(amount),
      type,
      date,
    };

    addTransaction(newTransaction);

    Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
    resetForm();
  };

  const handleEditTransaction = () => {
    if (!transaction) return;

    if (!name || !amount || amount <= 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    const updatedTransaction = {
      ...transaction,
      name,
      amount: Number(amount),
      type,
      date,
    };

    updateTransaction(transaction.id, updatedTransaction);

    Alert.alert('Sucesso', 'Transação atualizada com sucesso!');

    goBack();
  };

  const resetForm = () => {
    setName('');
    setAmount(0);
    setType('income');
    setDate(new Date());
  };

  const isEditing = !!transaction;

  const isDisabled = useMemo(() => {
    const disableCreation = name === '' || amount === 0;

    const disabledEdition =
      isEditing &&
      name === transaction.name &&
      amount === transaction.amount &&
      type === transaction.type &&
      new Date(date).getTime() === new Date(transaction.date).getTime();

    return disableCreation || disabledEdition;
  }, [isEditing, transaction, name, amount, type, date]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-light-background dark:bg-dark-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <Text className="text-xl font-bold mb-6 text-center">
          {isEditing ? 'Editar Transação' : 'Adicionar Transação'}
        </Text>

        <InputField
          placeholder="Nome da transação"
          value={name}
          onChangeText={text => setName(text.trim())}
        />

        <InputField
          placeholder="Valor"
          keyboardType="numeric"
          value={Number(amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
          onChangeText={text => {
            const numericValue = text.replace(/\D/g, '');
            const formattedValue = Number(numericValue) / 100;
            setAmount(formattedValue);
          }}
        />

        <View className="mb-4">
          <Text className="mb-2 font-medium">Tipo</Text>

          <TouchableOpacity
            onPress={() => setShowTypeSelector(true)}
            className="border border-gray-400 rounded-lg bg-light-surface dark:bg-dark-surface p-3"
          >
            <Text className="text-gray-700">
              {type === 'income' ? 'Receita' : 'Despesa'}
            </Text>
          </TouchableOpacity>

          <Modal visible={showTypeSelector} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-[#00000080]">
              <View className="flex bg-light-surface gap-3 dark:bg-dark-surface rounded-lg p-4 w-3/4">
                <Text className="text-lg font-bold mb-4">Selecione o tipo</Text>

                <TouchableOpacity
                  onPress={() => {
                    setType('income');
                    setShowTypeSelector(false);
                  }}
                  className={`flex-row items-center py-3 rounded px-2 ${
                    type === 'income' ? 'bg-green-100' : ''
                  }`}
                >
                  <View
                    className={`h-5 w-5 rounded-full border-2 mr-3 ${
                      type === 'income'
                        ? 'border-finance-income bg-finance-income'
                        : 'border-gray-400'
                    }`}
                  />
                  <Text className="text-gray-700">Receita</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setType('expense');
                    setShowTypeSelector(false);
                  }}
                  className={`flex-row items-center py-3 rounded px-2 ${
                    type === 'expense' ? 'bg-red-100' : ''
                  }`}
                >
                  <View
                    className={`h-5 w-5 rounded-full border-2 mr-3 ${
                      type === 'expense'
                        ? 'border-finance-expense bg-finance-expense'
                        : 'border-gray-400'
                    }`}
                  />
                  <Text className="text-gray-700">Despesa</Text>
                </TouchableOpacity>

                <Button
                  style={{ backgroundColor: '#c5c5c5' }}
                  title="Cancelar"
                  onPress={() => setShowTypeSelector(false)}
                />
              </View>
            </View>
          </Modal>
        </View>

        <View className="mb-4">
          <Text className="mb-2 font-medium">Data</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        </View>

        <Button
          disabled={isDisabled}
          title="Confirmar"
          onPress={isEditing ? handleEditTransaction : handleAddTransaction}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TransactionFormScreen;
