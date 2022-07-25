import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, register, reset} from './api/authSlice'

const initialFormValues: {[key: string]: any} = {
  name: "",
  email: "",
  password: "",
  password2: "",
  formSubmitted: false,
  success: false
};


export const FormControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);
  const [errorPrompt, setErrorPrompt] = useState("");
  const [form, setForm] = useState("login");
  const {
    user: authUser, 
    isLoading: authIsLoading, 
    isSuccess: authIsSuccess, 
    isError: authIsError, 
    message: authMessage
    } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const PostContactForm = async (
    values: any,
  ) => {
    if(form === 'login') 
      await dispatch(login(values));
    else if (form ==='register')  
      await dispatch(register(values));
    else console.log("Unknown form submit");
  }
  
  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "This field is required.";  
      if(fieldValues.password){
        if (fieldValues.password.length > 0 && 
          fieldValues.password.length < 5) {
          temp.password = "Password needs to be at least 5 characters.";
        }
        else temp.password = "";
      }
    }
    
    if ("password2" in fieldValues) {
    temp.password2 = fieldValues.password2 ? "" : "This field is required.";
      if(fieldValues.password2){
        if (fieldValues.password2 && 
        (fieldValues.password2 !== values.password))
          temp.password2 = "The passwords do not match.";
        else temp.password2 = "";  
      }
    }  

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    setErrors({
      ...temp
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setErrorPrompt("");
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true
    })
  };

  const handleError = (msg: any) => {
    setErrorPrompt(msg);
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: false
    });
  };

  const handleReset = () => {
    setErrorPrompt("");
    setValues({
      ...initialFormValues
    })
  }

  const formIsValid = ( fieldValues = values) => {
    let isValid: boolean;
    if (form === 'register'){
      isValid =
      fieldValues.name &&
      fieldValues.email &&
      fieldValues.password &&
      fieldValues.password2 &&
      Object.values(errors).every((x) => x === "");
    }
    else {
      isValid =
      fieldValues.email &&
      fieldValues.password &&
      Object.values(errors).every((x) => x === "");
    }

    return isValid;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const isValid =
      Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      await PostContactForm(values);
    }
  };

  const formatRes = (res: any) => {
    let errorMsg = "";
    if(res.message)
      return res.message;
    if(res.Message)
      return res.Message;
    else if(res.errors){
      res.errors.forEach((el: { msg: string; }) => {
        errorMsg += el.msg + "\n"
      });
      return errorMsg;
    }
    else return JSON.stringify(res);
  }

  useEffect(() => {
    if (authIsError) {
      handleError(formatRes(authMessage));
    }
    else if (authIsSuccess){
      handleSuccess();
    }
    if ((values.formSubmitted && values.success) || authUser) {
      navigate('/')
    }

    dispatch(reset())
  }, [authIsError, authIsSuccess, authMessage, authUser, dispatch, navigate, values.formSubmitted, values.success])

  return {
    values,
    errors,
    errorPrompt,
    handleChange,
    handleFormSubmit,
    handleReset,
    formIsValid,
    setForm,
    formatRes
  };
};