import { StyleSheet, View } from 'react-native';
import React from 'react';
import useTheme from '../hooks/useTheme';
import { inputMinHeight } from '../utils/theme';
import SelectList from './selectList';


const SingleSelect = ({ arrayData, selected, search, selectedCb, uniqueId }) => {
  const { theme } = useTheme();

  return (
    <SelectList
      setSelected={() => {}}
      setSelectedValFN={(val) => selectedCb(uniqueId, { value: val?.value, key: val?.key })}
      data={arrayData}
      save="value"
      defaultOption={selected}
      search={search}
      boxStyles={{
        ...styles.multiSelectBox2,
        borderColor: theme.$lightText,
        backgroundColor: theme.$surface,
        minHeight: inputMinHeight,
      }}
      dropdownStyles={{
        borderColor: theme.$lightText,
        backgroundColor: theme.$surface,
      }}
    />
  );
};

export default SingleSelect;

const styles = StyleSheet.create({
  multiSelectBox2: {
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    paddingVertical: 8,
    marginVertical: 6,
  },
  multiSelectBox3: {
    borderWidth: 1,
  },
});
