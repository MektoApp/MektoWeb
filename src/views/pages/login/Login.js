import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../../store/authSlice';
import {
  CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput,
  CInputGroup, CInputGroupText, CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { colors } from '../../../theme/colors'


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(loginAction(username, password));
      navigate('/'); // Redireciona para DefaultLayout
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Entrar na sua conta Mekto</p>
                    {error && <p className="text-danger">{error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                      <CFormInput
                        placeholder="E-mail"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton style={{backgroundColor : colors.halloween}} type="submit" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">Esqueceu sua senha?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-5" style={{ width: '44%', backgroundColor: colors.halloween }}>
                <CCardBody style={{backgroundColor : colors.halloween}} className="text-center">
                  <div>
                    <h2>Loja Online</h2>
                    <p>Ainda não tem uma conta Mekto? Conheça agora mesmo nossa loja online!</p>
                    <Link to="/store">
                      <CButton color="secondary" className="mt-3"  tabIndex={-1}>Acessar Loja</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
