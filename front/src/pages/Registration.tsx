import '../App.css';
import { BsGoogle } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

const CREATE_USER = gql`
  mutation Mutation(
    $password: String!
    $email: String!
    $pseudo: String!
    $avatar: String!
    $description: String!
  ) {
    createUser(
      pseudo: $pseudo
      password: $password
      email: $email
      avatar: $avatar
      description: $description
    ) {
      email
      pseudo
      description
      avatar
    }
  }
`;

const GET_BLOG_ID = gql`
  query Query($email: String!) {
    getOneUser(email: $email) {
      blog {
        id
      }
    }
  }
`;

function Registration() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getBlogId] = useLazyQuery(GET_BLOG_ID, { variables: { email } });

  const { setLocalUser } = useUser();
  const navigate = useNavigate();

  const [loadToken] = useLazyQuery(GET_TOKEN, {
    variables: {
      email: email,
      password: password,
    },
    async onCompleted(data) {
      const res = JSON.parse(data.getToken);
      setLocalUser({ ...res.user });
      const blogId = await getBlogId();

      setLocalUser((state) => ({ ...state, blogId: blogId.data.getOneUser.blog.id }));

      localStorage.setItem('token', res.token);
      navigate('/userzzz');
    },
    onError(error) {
      console.log(error);
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      email: email,
      password: password,
      pseudo: pseudo,
      avatar: 'avatar',
      description: 'Description',
    },
    onCompleted: () => loadToken(),
    onError(error) {
      console.log('Error:', error);
    },
  });
  return (
    <div className="registration-main-wrapper">
      <div className="registration-wrapper">
        <p className="top-registration">Registration</p>
        <div className="registration-form-container">
          <label className="username-container">
            <p>Username</p>
            <div className="username-input-container">
              <div className="registration-icon-user">
                <AiOutlineUser />
              </div>
              <input
                type="text"
                placeholder="Type your username"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>
          </label>
          <label className="username-container">
            <p>mail</p>
            <div className="username-input-container">
              <div className="registration-icon-user">
                <AiOutlineUser />
              </div>
              <input
                type="text"
                placeholder="Type your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <div className="registration-separator"></div>
          <label className="password-container">
            <p>Password</p>
            <div className="password-input-container">
              <div className="registration-icon-lock">
                <AiOutlineLock />
              </div>
              <input
                type="password"
                placeholder="Type your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <div className="registration-separator"></div>
        </div>
        <div className="registration-forgot-password-container">
          <p className="registration-forgot-password">Forgot password ?</p>
        </div>
        <button
          className="registration-btn"
          onClick={() => {
            createUser();
          }}
        >
          REGISTRATION
        </button>
        <p className="signup-social">Or Sign In Using</p>
        <div className="registration-social-container">
          <div className="registration-icon-google">
            <BsGoogle />
          </div>
          <div className="registration-icon-facebook">
            <FaFacebookF />
          </div>
          <div className="registration-icon-twitter">
            <FiTwitter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
