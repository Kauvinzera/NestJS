// serve para armazenar constantes relacionadas à autenticação, como a chave secreta usada para assinar os tokens JWT. A constante jwtConstants é um objeto que contém a propriedade secret, que armazena a chave secreta usada para gerar e validar os tokens JWT na aplicação. Essa chave deve ser mantida em segredo e não deve ser exposta publicamente, pois é essencial para a segurança da autenticação e autorização na aplicação.
export const jwtConstants = {
    secret: '29130d87f199f362782a8629cded613a494d423f01e2f5cdacb2291694bc10a6'
};