# 🌊 SOS Conecta

## 📌 Apresentação da Ideia

Este projeto foi desenvolvido a partir do desafio sobre enchentes no Brasil.  
Ao analisar o cenário, identifiquei a dificuldade na **organização de voluntários**, onde muitas pessoas querem ajudar, mas não sabem onde são realmente necessárias.

---

## 🚨 Problema Escolhido

O problema abordado foi a **falta de organização de voluntários** durante situações de enchente.

Muitas vezes:
- Alguns locais ficam com voluntários demais
- Outros locais ficam sem ajuda
- Falta informação clara sobre onde ajudar

Isso torna o apoio desorganizado e menos eficiente.

---

## 💡 Solução Proposta

O sistema tem como objetivo **conectar voluntários a locais que precisam de ajuda**.

A plataforma permite:
- Visualizar locais que precisam de ajuda
- Ver o tipo de ajuda necessária
- Acompanhar a quantidade de voluntários
- Escolher onde ajudar

👉 O diferencial é a **organização das informações em um só lugar**, facilitando a tomada de decisão.

---

## 🧱 Estrutura do Sistema

###  Back-end
- Desenvolvido com **Node.js + Express**
- Responsável por gerenciar as rotas e regras do sistema

###  Banco de Dados
- Utilizado **SQLite**
- Armazena:
  - Nome do local
  - Endereço
  - Tipo de ajuda
  - Quantidade necessária
  - Quantidade atual de voluntários
  - Status (ABERTO ou COMPLETO)
