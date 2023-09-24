
// import { Formik, Form, Field, ErrorMessage } from 'formik';

// import * as Yup from 'yup'


// const InitialValues = {
//         email: '',
//         password: '',
//       };

//       const validations = Yup.object().shape({
//         email: Yup.string().required('From Date is required'),
//         password: Yup.string()
//           .required('To Date is required'),
//       });
// function Login() {
// //   const [userData, setUserData] = useState({});
// //   const initialValues = {
// //     username: '',
// //     password: '',
// //   };

// //   useEffect(() => {
// //     // Make an API call to fetch login data from the JSON server
// //     axios.get('your-api-endpoint-here')
// //       .then((response) => {
// //         setUserData(response.data);
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching data:', error);
// //       });
// //   }, []);

// //   const validateForm = (values) => {
// //     const errors = {};

// //     if (values.username !== userData.username || values.password !== userData.password) {
// //       errors.password = 'Invalid username or password';
// //     }

// //     return errors;
// //   };


  

//   const handleSubmit = () => {
//     // Handle form submission here
//     // You can perform any actions, such as logging the user in, in this function
//     // For now, let's just display a success message
//     alert('Login successful');
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <Formik
//         initialValues={InitialValues}
//         validate={validations}
//         onSubmit={handleSubmit}
//       >
//         <Form>
//           <div>
//             <label htmlFor="username">Username</label>
//             <Field type="text" id="username" name="username" />
//             <ErrorMessage name="username" component="div" />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <Field type="password" id="password" name="password" />
//             <ErrorMessage name="password" component="div" />
//           </div>
//           <button type="submit">Login</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default Login;


import React, { useEffect, useState ,useParams} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Enter correct password').required('Password is required'),
});
// const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email('Invalid email address')
//       .required('Email is required'),
//     password: Yup.string()
//       .min(6, 'Password must be at least 6 characters')
//       .required('Password is required'),
//   });

  function Login() {

    const [initialValues, setInitialValues] = useState({
      email: '',
      password: '',
    });

    useEffect(() => {

      // fetch('http://localhost:8000/cred')
      //   .then(response => response.json())
      //   .then(result => {
      //     console.log(result);
      //     var company = {
      //       id: Number(result.id),
      //       email: new String(result.email),
      //       password: result.password,
      //     }
      //     // setInitialValues(company)
      //     console.log(company.email);
  
      //   });
    }, []);
    
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
      try {
        // Fetch user data from your JSON server
        const response = await axios.get('http://localhost:8000/cred');
        const users = response.data;
  
        // Find the user with the entered email
        const user = users.find((u) => u.email === values.email);
  
        if (!user || user.password !== values.password) {
          setFieldError('password', 'Invalid email or password');
          setSubmitting(false);
          return;
        }
  
        // Login is successful, you can store user information in the state or context here
        // For simplicity, let's just redirect to a success page
        // navigate('/success');
        alert('successful');
      } catch (error) {
        console.error('Login error:', error);
      }
    };
  
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    );
  }
  
  export default Login;
  