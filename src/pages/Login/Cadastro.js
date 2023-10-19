import React, { useState } from 'react';
import './style.css';

const Cadastro = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    // Implemente a lógica de cadastro de usuário aqui.
    // Isso pode incluir a validação dos dados do formulário e o envio para o servidor.

    console.log('Tentativa de cadastro:');
    console.log('Usuário:', usuario);
    console.log('Senha:', senha);
  };

  return (
    <div className="container">
      <h1>Cadastro de Usuário</h1>
      <form>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleCadastro}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
