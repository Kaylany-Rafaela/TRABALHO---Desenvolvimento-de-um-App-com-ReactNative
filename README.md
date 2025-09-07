# 📱 Controle de Estoque de Insumos – CCH Dispositivos Móveis
**Nomes:** Kaylany Rafaela e Victor Cláudio

---

## 📝 DESCRIÇÃO
O **Controle de Estoque de Insumos** é um aplicativo mobile desenvolvido para otimizar a gestão de materiais na COEXP. O sistema permite que os usuários:  

- 📥 **Registrem entradas de insumos** de forma rápida e prática.  
- 📤 **Registrem retiradas de materiais** de forma segura e controlada.  
- 🔎 **Consultem o estoque atualizado em tempo real**, garantindo que todos saibam a quantidade disponível.  
- 🕒 **Acompanhem o histórico completo de movimentações**, facilitando o controle e evitando falhas.  

O aplicativo foi desenvolvido com **React Native**, garantindo compatibilidade com dispositivos **Android e iOS**. A interface foi planejada com foco em **clareza, simplicidade e usabilidade**, proporcionando uma experiência intuitiva para todos os usuários.  

---

## 🚨 PROBLEMA IDENTIFICADO
Na COEXP, existem diversos fornecedores de insumos e muitos usuários que retiram materiais diariamente. Atualmente, **não há um controle eficiente da entrada e saída de insumos**, gerando:  

- ❌ Dificuldade em saber a quantidade disponível em tempo real.  
- ❌ Aumento de falhas no gerenciamento do estoque.  
- ❌ Riscos de desorganização e desperdício de materiais.  

O aplicativo busca **automatizar e centralizar o controle do estoque**, garantindo mais segurança e organização.  

---

## 🖥️ TELAS DO APLICATIVO

### 🔑 Login
Tela de acesso do usuário com e-mail e senha. Permite autenticação segura e controle de acesso ao sistema.

<img width="423" height="738" alt="image" src="https://github.com/user-attachments/assets/a77e2f37-159d-4fb5-8ba2-527071c9af7b" />


### 📝 Cadastro de Usuário
Tela para criação de conta com campos: **nome, e-mail e senha**, garantindo acesso personalizado ao sistema.

<img width="414" height="742" alt="image" src="https://github.com/user-attachments/assets/bc102d7b-acd7-4da6-9bf1-bde2e9081eec" />


### 📊 Dashboard (Tela Inicial)
Resumo rápido do estoque, com informações principais e botões de ação:  
- Total de insumos cadastrados 📦  
- Nro Entradas recentes 📥  
- Nro Saídas recentes 📤  
- Botões de ação:  
  - **Registrar Entrada**   
  - **Registrar Saída** 
  - **Lista de Insumos**
    
<img width="324" height="569" alt="image" src="https://github.com/user-attachments/assets/b943d241-0cc3-4fe1-9ca8-12c0e821d6ef" />


### 📋 Lista de Insumos
Exibe todos os insumos cadastrados, com:  
- Barra de busca 🔍  
- Cada item possui **botão [Ver Detalhes]**, que leva à tela de detalhes do insumo.  
- Botão **[Cadastrar Novo Insumo]**, que leva à **tela separada de cadastro de insumo**.

<img width="322" height="566" alt="image" src="https://github.com/user-attachments/assets/8d970c12-5de8-465c-89e1-1785f9eace84" />

### 📝 Cadastro de Insumo
Tela separada para adicionar um novo insumo ao estoque:  
- Nome do insumo 📛  
- Categoria 📂  
- Unidade de medida 📏  
- Quantidade ⚖️  
- Fornecedor 🏭  
- Observações 📝  
- Botão **Salvar Insumo** 

<img width="235" height="422" alt="image" src="https://github.com/user-attachments/assets/664f97b6-f359-4bfb-a441-3bf56c370852" />

### 🔍 Detalhes do Insumo
Exibe todas as informações do insumo selecionado:  
- Nome do insumo 📛  
- Quantidade atual ⚖️  
- Unidade de medida 📏  
- Fornecedor 🏭  
- Histórico de movimentações 🕒  
Permite registrar **entrada** ou **saída** diretamente daquele insumo.

<img width="234" height="416" alt="image" src="https://github.com/user-attachments/assets/a0da8dd6-c120-4265-b8df-8c558b65c0f6" />

### ➕ Entrada de Insumos
Formulário para registrar a entrada de um insumo no estoque:  
- Nome do insumo 📋  
- Quantidade ➖  
- Data 📅  
- Observações 📝

<img width="224" height="408" alt="image" src="https://github.com/user-attachments/assets/f784d4ce-5229-4691-a5eb-9eee73722913" />


### ➖ Saída de Insumos
Formulário para registrar a retirada de um insumo do estoque:  
- Nome do insumo 📋  
- Quantidade ➖  
- Data 📅  
- Observações 📝
  
<img width="228" height="410" alt="image" src="https://github.com/user-attachments/assets/0ace82bc-fe71-4c2a-925f-169b4e5cbf59" />

---

## ⚡ FUNCIONALIDADES PRINCIPAIS

- 👤 Cadastro e autenticação de usuários  
- 📥 Registro de entrada de insumos  
- 📤 Registro de saída de insumos  
- 🔎 Consulta do estoque em tempo real  
- 🗂️ Busca e filtragem de insumos  
- 🕒 Visualização do histórico de movimentações  
- ➕ Cadastro de novos insumos  

---

💡 **Diferenciais do App:**  
- Interface limpa e intuitiva, mesmo para usuários com pouca experiência.  
- Botões grandes e fáceis de usar, agilizando as ações do dia a dia.  
- Controle de estoque confiável, com histórico detalhado de entradas e saídas.
