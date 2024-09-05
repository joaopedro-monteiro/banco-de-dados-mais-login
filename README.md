Este é um projeto de gerenciamento de tarefas desenvolvido com React e Firebase. A aplicação permite que os usuários façam login, cadastrem-se e acessem a área de administração (/admin) para criar, editar e concluir tarefas. Todas as operações são persistidas no banco de dados do Firebase.

Link do projeto em produção: [Texto do link](https://todo-auth-react-firebase.netlify.app/)

## Funcionalidades

- **Autenticação de Usuários**: Cadastro e login com e-mail e senha utilizando Firebase Authentication.
- **Autorização de Acesso**: Apenas usuários autenticados podem acessar a rota `/admin`.
- **Gerenciamento de Tarefas**:
  - Criação de novas tarefas.
  - Edição de tarefas existentes.
  - Exclusão de tarefas concluídas.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface do usuário.
- **Firebase**:
  - **Authentication**: Para gerenciar o login e cadastro de usuários.
  - **Firestore**: Banco de dados NoSQL utilizado para armazenar as tarefas.

## Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/joaopedro-monteiro/banco-de-dados-mais-login.git
Acesse a pasta do projeto:

2. Como Usar
Cadastro: Crie uma conta usando um endereço de e-mail e senha.
Login: Entre com suas credenciais para acessar o painel de administração.

3. Contribuições
Contribuições são bem-vindas! Para contribuir com este projeto, siga estes passos:

Fork este repositório.
Crie um novo branch para sua feature.
Faça as suas alterações e commit.
Envie um pull request.
