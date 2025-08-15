// CustomSelect.jsx
import React from 'react'
import Select from 'react-select'
import { useColorModes,
} from '@coreui/react'

const CustomSelect = ({ options, value, onChange, placeholder, isClearable = true }) => {

  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const darkMode = colorMode === 'dark'


  const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#5e5cd0',          // Brand Primary
    primary25: darkMode ? '#333' : '#eee', // hover/focus
    neutral0: darkMode ? '#212631' : '#f3f4f7', // fundo do select
    neutral80: darkMode ? '#f3f4f7' : '#212631', // texto
    neutral20: darkMode ? '#6b7785' : '#ccc', // borda
  },
})


const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: darkMode ? '#212631' : '#f3f4f7',
    color: darkMode ? '#f3f4f7' : '#212631',
    borderColor: darkMode ? '#6b7785' : '#ccc',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkMode ? '#f3f4f7' : '#212631',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: darkMode ? '#212631' : '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? darkMode
        ? '#333'  // hover
        : '#eee'
      : darkMode
      ? '#1a1e27ff'
      : '#fff',
    color: darkMode ? '#f3f4f7' : '#212631',
  }),
}


  return (
    <Select
      options={options}
      value={options.find((opt) => opt.value === value)}
      onChange={(option) => onChange(option?.value || '')}
      theme={customTheme}
      styles={customStyles}
      placeholder={placeholder}
      isClearable={isClearable}
    />
  )
}

export default CustomSelect

