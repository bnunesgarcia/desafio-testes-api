import { expect, test } from '@playwright/test';
import { geraLogin } from '../utils/utils' 

let response: any;
const dadosNovoUsuario = require('../data/dadosNovoUsuario.json')
const baseUrl = 'https://demoqa.com/Account/v1/User'

  test('Criar novo usuario', async({request}) => {
    await test.step('Criação de um novo usuario', async() => {
    const login = geraLogin(8);
    dadosNovoUsuario.userName = login;
      response = await request.post(baseUrl, {
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        data: dadosNovoUsuario
      });
    })

    if (response.ok()){
      const dados = await response.json();
      console.log('UserID: ' + dados.userID);
      console.log('Nome Usuario: ' + dados.username);
    } else {
      console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
    }

    expect(response.ok()).toBeTruthy();

  })

  