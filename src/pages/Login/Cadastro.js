import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../index';
import './style.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastrado, setCadastrado] = useState(false);

  const handleCadastro = () => {
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        // Registro bem-sucedido, exibir mensagem de confirmação
        setCadastrado(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro no cadastro:', errorCode, errorMessage);
      });
  };

  return (
    <div>
      {cadastrado ? (
        <div>
          <p>Registro bem-sucedido. Faça login agora.</p>
          <Link to="/">Fazer login</Link>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button onClick={handleCadastro} >Cadastrar</button>

      
        </div>
      )}
    </div>
  );
};

export default Cadastro;
