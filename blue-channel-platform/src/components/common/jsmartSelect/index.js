import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const Select = memo(({ options, onChange, initValue = '', defaultSelect, name, className, selectedValue, style }) => {

  const [value, setValue] = useState(initValue);

  // const onChangeHandler = (e) => {
  //   console.warn("onChangeHandler > ", e.target);
  //   setValue(e.target.value);
  //   onChange(e);
  // };

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const onChangeHandler = useCallback((e) => {
    setValue(e.target.value);
    onChange && onChange(e);
  }, [value]);

  return (
    <select
      value={value}
      onChange={onChangeHandler}
      name={name}
      className={className}
      style={style}
    >
      {
        defaultSelect
          ? <option key={defaultSelect.key} value={defaultSelect.value}>
            {defaultSelect.name}
          </option>
          : null
      }
      {options
        ? options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))

        : <option value=''>선택</option>}
    </select>
  );
});

Select.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  // options: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     key: PropTypes.string.isRequired,
  //     value: PropTypes.string.isRequired
  //   })
  // ),
  onChange: PropTypes.func,
  initValue: PropTypes.string,
};

export default Select;
