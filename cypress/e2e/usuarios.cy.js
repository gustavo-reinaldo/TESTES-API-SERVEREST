/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
const faker = require('faker')

describe.only('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body),
        expect(response.status).to.equal(200)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('usuarios');
    });
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let randomName = faker.name.findName();
    let randomEmail = faker.internet.email();

    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": randomName,
        "email": randomEmail,
        "password": 'defaultpassw',
        "administrador": 'true'
      }
    }).then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    let randomName = faker.name.findName();
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false,
      body: {
        "nome": randomName,
        "email": 'beltrano@qa.com.br',
        "password": 'defaultpassw',
        "administrador": 'true'
      }
    }).then(response => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Este email já está sendo usado')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let randomName = faker.name.findName();
    let randomEmail = faker.internet.email();
    cy.request({
      method: 'PUT',
      url: 'usuarios/WqJM56ClizfmO72J',
      failOnStatusCode: false,
      body: {
        "nome": randomName,
        "email": randomEmail,
        "password": 'defaultpassw',
        "administrador": 'true'
      }
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Registro alterado com sucesso')
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    // Faz uma requisição para obter a lista de usuários
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).then(response => {
      expect(response.status).to.equal(200)
  
      // Pega o _id do último usuário no array
      const usuarios = response.body.usuarios
      const userId = usuarios[usuarios.length - 1]._id
  
      // Deleta o usuário
      cy.request({
        method: 'DELETE',
        url: `usuarios/${userId}`
      }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Registro excluído com sucesso')
      })
    })
  })
})