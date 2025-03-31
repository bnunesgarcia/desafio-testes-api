import { expect, test } from '@playwright/test';
import { generateRandomEmail, geraLogin } from '../utils/utils';

let response: any;
let orderId: any;
let token;
const baseUrl = 'https://simple-books-api.glitch.me/'

const randomEmail = generateRandomEmail();

test.beforeAll(async({request}) => {
        response = await request.post(baseUrl + 'api-clients/', {
            headers:{
                "Cache-Control": "no-cache",
                "content-type": "application/json",
                "User-Agent": "PostmanRuntime/7.43.0",
                "Accept": "*/*",
                "Connection": "keep-alive"
            },
            data: {
                "clientName": "Teste",
                "clientEmail": randomEmail
             }
        })

        if (response.ok()){
            const responseData = await response.json();
            token = responseData.accessToken;
        } else {
            console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
        }

        expect(response.ok()).toBeTruthy();

})

test('Status da Biblioteca', async({request}) => {
    await test.step(`Realiza requisicao GET no status da biblioteca`, async() => {
        response = await request.get(baseUrl + 'status')
    })

    if (response.ok()){
        const status = await response.status();
        console.log("Status code da api biblioteca: " + status);
    } else {
        console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
    }

    expect(response.ok()).toBeTruthy();

})
test('Quantidade de livros na Biblioteca', async({request}) => {
    await test.step('Realiza requisicao GET para listar quantidade de livros da biblioteca', async() => {
        response = await request.get(baseUrl + 'books')
    })

    if (response.ok()){
        const listaLivros = await response.json();
        const qtdLivros = listaLivros.length;
        console.log("Quantidade de livros na biblioteca: " + qtdLivros);
    } else {
        console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
    }

    expect(response.ok()).toBeTruthy();

})

test('Livros da Biblioteca', async({request}) => {
    await test.step(`Realiza requisicao GET para listar dados dos livros da biblioteca`, async() => {
        response = await request.get(baseUrl + 'books')
    })

    if (response.ok()){
        const listaLivros = await response.json();
        console.log(listaLivros);
        const nomeLivroProcurado = 'The Russian';
        const livro = listaLivros.find((livro: { name: string; }) => livro.name === nomeLivroProcurado);

        if (livro) {
            console.log(`Livro encontrado: ID = ${livro.id}, Nome = ${livro.name}, Tipo = ${livro.type}, Disponível = ${livro.available}`);
        } else {
            console.error(`Livro com nome "${nomeLivroProcurado}" não encontrado.`);
        }
    } else {
        console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
    }

    expect(response.ok()).toBeTruthy();

})

test('Reservar livro na biblioteca', async({request}) => {
    await test.step(`Realiza requisicao POST para reserva de livro`, async() => {
        response = await request.post(baseUrl + 'orders', {
            headers: {
                "authorization": "Bearer " + token
            },
            data: {
                "bookId": 1,
                "customerName": "The Russian"
            }
        })

        if (response.ok()){
            const listaLivros = await response.json();
            orderId = listaLivros.orderId;
            console.log("orderid do livro: " + orderId);
        } else {
            console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
        }

        expect(response.ok()).toBeTruthy();
    })


    await test.step(`Reservar livro inexistente`, async() => {
        response = await request.post(baseUrl + 'orders', {
            headers: {
                "authorization": "Bearer " + token
            },
            data: {
                "bookId": 24,
                "customerName": "Teste negativo"
            }
        })

        if (response.ok()){
            console.error("Teste falhou!")
        } else {
            console.log(`Teste OK: ${response.status()} ${response.statusText()}`);
        }
    })

})

test('Alterar dados da reserva', async({request}) => {
    await test.step(`Realiza requisicao PATCH para alterar dados da ordem`, async() => {
        response = await request.patch(baseUrl + `orders/` + orderId, {
            headers: {
                "authorization": "Bearer " + token
            },
            data: {
                "customerName": "teste alteracao"
            }
        })
    })

    if (response.ok()){
        const statusCode = await response.status();
        console.log("status code da alteracao: " + statusCode);
    } else {
        console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
    }

    expect(response.ok()).toBeTruthy();

})

test('Remover reserva', async({request}) => {
    await test.step(`Realiza requisicao DELETE para deletar ordem de reserva`, async() => {
        response = await request.delete(baseUrl + `orders/` + orderId, {
            headers: {
                "authorization": "Bearer " + token
            }
        })
    })

    if (response.ok()){
        const statusCode = await response.status();
        console.log("status code do delete realizado: " + statusCode);
    } else {
        console.error(`Teste falhou: ${response.status()} ${response.statusText()}`);
    }

    expect(response.ok()).toBeTruthy();

})
