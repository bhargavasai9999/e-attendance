import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../themes.js';
import { api } from '../../apis/axiosConfig.js';
import { getAuthorizationHeader } from '../../apis/tokenManager';
import { useFocusEffect } from '@react-navigation/native';

export const Attendance = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [originalAttendanceData, setOriginalAttendanceData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await getAuthorizationHeader();
      const res = await api.get('/student/getattendance', token);
      setOriginalAttendanceData(res.data);
      setAttendanceData(res.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    try {
      const filteredData = originalAttendanceData.filter(item => {
        const itemDate = item.created_at.split('T')[0];
        const selectedDateISOString = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
        return !selectedDate || selectedDateISOString === itemDate;
      });

      setAttendanceData(filteredData);
      setSelectedDate(null);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const parseDate = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString();
  };

  const parseTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';

    const dateTime = new Date(dateTimeString);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    };
    return dateTime.toLocaleString('en-IN', options);
  };

  const renderItem = ({ item }) => {
    const selectedDateISOString = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    const itemDate = item.created_at.split('T')[0];

    const isDateMatch = !selectedDate || selectedDateISOString === itemDate;

    if (isDateMatch) {
      return (
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell]}>{parseDate(item.created_at)}</Text>
          <Text style={[styles.tableCell]}>{parseTime(item.checkin_time)}</Text>
          <Text style={[styles.tableCell]}>{parseTime(item.checkout_time)}</Text>
          <Text
            style={[
              styles.tableCell,
              { color: item.attendance_status === 'Present' ? 'green' : 'red' },
            ]}
          >
            {item.attendance_status}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: theme.colors.primary }]}>Search by Date</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { width: 150 }, { marginRight: 5 }]}
          placeholder="Select date"
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
          editable={false}
        />
        <MaterialIcons
          name="date-range"
          size={24}
          color={theme.colors.primary}
          onPress={showDatePickerModal}
        />

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate || new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}

        <Button
          style={[styles.button, { marginLeft: 5 }]}
          onPress={handleSearch}
          icon={() => <MaterialIcons name="search" size={24} color="white" />}
        >
          <Text style={styles.buttonText}>Clear Search</Text>
        </Button>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : attendanceData.length === 0 ? (
        <Text style={styles.noRecordsText}>No records found for the selected date.</Text>
      ) : (
        <>
          {/* {selectedDate && (
            <View style={styles.selectedDateContainer}>
              <Text style={styles.selectedDateText}>
                Showing results for: {parseDate(selectedDate.toISOString())}
              </Text>
            </View>
          )} */}

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Date</Text>
            <Text style={styles.tableHeaderCell}>Check-In</Text>
            <Text style={styles.tableHeaderCell}>CheckOut</Text>
            <Text style={[styles.tableHeaderCell]}>Status</Text>
          </View>
          <FlatList
            data={attendanceData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 0,
  },
  button: {
    marginLeft: 8,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: 8,
  },
  tableHeaderCell: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  flatList: {
    flex: 1,
    width: '100%', 
  },
  noRecordsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  selectedDateContainer: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  selectedDateText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

