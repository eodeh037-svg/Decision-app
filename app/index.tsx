import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import {
  addOption,
  pickRandom,
  removeOption,
  setAll,
} from './redux/decisionSlice';

import { loadDecision, saveDecision } from './storage/decisionStorage';
import { RootState } from './redux/store';

export default function Home() {
  const dispatch = useDispatch();
  const { options, result } = useSelector(
    (state: RootState) => state.decision
  );

  const [input, setInput] = useState('');
  const [reason, setReason] = useState('');

  // LOAD DATA
  useEffect(() => {
    const init = async () => {
      const saved = await loadDecision();
      if (saved) dispatch(setAll(saved));
    };
    init();
  }, []);

  // SAVE DATA
  useEffect(() => {
    saveDecision({ options, result });
  }, [options, result]);

  // GENERATE SMART REASON
  useEffect(() => {
    if (!result) return;

    const reasons = [
      `This seems like the most balanced choice right now.`,
      `Based on your options, this gives the best outcome.`,
      `This option stands out as the smartest move.`,
      `This could bring the best experience for you.`,
      `Sometimes simple choices are the best — this is one.`,
      `This gives you the highest chance of satisfaction.`,
    ];

    const randomReason =
      reasons[Math.floor(Math.random() * reasons.length)];

    setReason(randomReason);
  }, [result]);

  const addItem = () => {
    if (!input.trim()) return;
    dispatch(addOption(input));
    setInput('');
  };

  const isEmpty = options.length === 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.inner}>

        {/* HEADER */}
        <Text style={styles.title}>🎯 Decision Maker</Text>
        <Text style={styles.subtitle}>
          Let the app decide for you
        </Text>

        {/* RESULT */}
        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>RESULT</Text>
            <Text style={styles.resultText}>👉 {result}</Text>
            <Text style={styles.reason}>{reason}</Text>
          </View>
        )}

        {/* INPUT */}
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Add an option..."
            placeholderTextColor="#999"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={addItem}
            style={styles.addBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* PICK BUTTON */}
        <TouchableOpacity
          onPress={() => dispatch(pickRandom())}
          style={styles.pickBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.pickText}>Pick Decision 🎲</Text>
        </TouchableOpacity>

        {/* EMPTY STATE */}
        {isEmpty ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No options yet</Text>
            <Text style={styles.emptySub}>
              Add something to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={options}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item, index }) => (
              <View style={styles.itemCard}>
                <Text style={styles.itemText} numberOfLines={1}>
                  {item}
                </Text>

                <TouchableOpacity
                  onPress={() => dispatch(removeOption(index))}
                  style={styles.deleteBtn}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
  },

  subtitle: {
    color: '#666',
    marginTop: 4,
    marginBottom: 20,
  },

  resultCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  resultLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16a34a',
  },

  resultText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#065f46',
    marginTop: 5,
  },

  reason: {
    marginTop: 6,
    fontSize: 13,
    color: '#047857',
  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 8,
  },

  addBtn: {
    backgroundColor: '#111',
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 14,
  },

  addText: {
    color: '#fff',
    fontWeight: '800',
  },

  pickBtn: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  pickText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },

  emptyBox: {
    marginTop: 80,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },

  emptySub: {
    marginTop: 5,
    color: '#777',
  },

  itemCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  itemText: {
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },

  deleteBtn: {
    backgroundColor: '#fee2e2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  deleteText: {
    color: '#dc2626',
    fontWeight: '700',
  },
});