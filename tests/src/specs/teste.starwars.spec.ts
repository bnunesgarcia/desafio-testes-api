import { expect, test } from '@playwright/test';

let response: any;
const info = [
  { tipoInfo: 'personagens'},
  { tipoInfo: 'planetas'},
  { tipoInfo: 'especies'},
  { tipoInfo: 'veiculos'},
  { tipoInfo: 'filmes'},
]

const baseUrl = 'https://swapi.dev/api/'
info.forEach(informacoes => {
  test(`Lista quantidade de ${informacoes.tipoInfo} da saga STAR WARS`, async({request}) => {
    await test.step(`Realiza requisicao GET no ${informacoes.tipoInfo} da saga STAR WARS`, async() => {
      if (informacoes.tipoInfo == 'personagens'){
        response = await request.get(baseUrl + 'people/')
      }
      else if (informacoes.tipoInfo == 'planetas'){
        response = await request.get(baseUrl + 'planets/')
      }
      else if (informacoes.tipoInfo == 'especies'){
        response = await request.get(baseUrl + 'species/')
      }
      else if (informacoes.tipoInfo == 'veiculos'){
        response = await request.get(baseUrl + 'vehicles/')
      }
      else if (informacoes.tipoInfo == 'filmes'){
        response = await request.get(baseUrl + 'films/')
      }
    })

    if (response.ok()){
      const dados = await response.json();
      console.log('A saga STARWARS contem ' + dados.count + ` ${informacoes.tipoInfo}`);
    } else {
      console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
    }

    expect(response.ok()).toBeTruthy();

  })
})