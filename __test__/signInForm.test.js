import {SignInForm} from "../src/components/pages/SignIn"
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import * as yup from "yup";


// describe("SignIn Form",()=>{
//     it('calls function provided onSubmit prop after pressing the submit button',()=>{
//         render(<SignIn/>)
        
//     fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
//     fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
//     fireEvent.press(screen.getByText('Submit'));
//     expect(onSubmit).toHaveBeenCalledTimes(1);
                 
//     // onSubmit.mock.calls[0][0] contains the first argument of the first call
//     expect(onSubmit.mock.calls[0][0]).toEqual({
//       username: 'kalle',
//       password: 'password',
//     });
//   });
//     })

// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit=jest.fn()
      const validationSchema = yup.object().shape({
        username: yup.string().required("username is required"),
        password: yup.string().required("password is required"),
      });
      
      const initialValues = {
        username: "",
        password: "",
      };
      render(<SignInForm onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}/>)

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    fireEvent.press(screen.getByText('Sign in'));
    
    await waitFor(() => {
      // expect the onSubmit function to have been called once and with a correct first argument
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
      });
    });
  });
});