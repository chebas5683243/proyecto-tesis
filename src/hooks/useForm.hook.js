import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleCheckChange = e => {
    const {name, checked} = e.target;
    setValues({
      ...values,
      [name]: checked
    })
  }
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleCheckChange,
    resetForm
  }
}

export default useForm;