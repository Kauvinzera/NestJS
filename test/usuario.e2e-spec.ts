import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
 
describe('Testes dos Módulos Usuário e Auth (e2e)', () => {  // descrição do teste e2e, pacote de teste
  let token: string;
  let usuarioid: any;
  let app: INestApplication; // declara a variável app do tipo INestApplication
 
  beforeAll(async () => {  // configurações iniciais do teste que serão executadas antes de todos os testes uma vez so no inicio.
    const moduleFixture: TestingModule = await Test.createTestingModule({ // cria o modulo de teste nest e configura as dependências do modulo
      imports: [
        TypeOrmModule.forRoot({ // configuração do typeorm com o banco em memoria
          type: "sqlite",  // tipo de banco
          database: ":memory:", // banco em memoria, sera apagado ao final do teste
          entities: [__dirname + "./../src/**/entities/*.entity.ts"], // caminho dos arquivos de entidades
          synchronize: true, // sincroniza as entidades com o banco
          dropSchema: true // apaga o banco ao final do teste
        }),
        AppModule], // importa o modulo principal para que as dependências sejam resolvidas
    }).compile(); // compila o modulo
 
    app = moduleFixture.createNestApplication();  // cria a aplicação nest
    app.useGlobalPipes(new ValidationPipe()); // configuração de validação de dados de entrada
    await app.init(); // inicializa a aplicação nest e configuração da porta do servidor que é a porta 4000
  });
 
  // testes
  it("01 - Deve criar um novo usuário", async () => {
    const resposta = await request(app.getHttpServer()) // salva na resposta o retorno da requisição
    .post("/usuarios/cadastrar").send({ //acessa a URL /usuarios/cadastrar através do verbo POST e insere o corpo JSON na requsição dentro do .send({}) 
      nome : "capivara",
      usuario : "capivara@gmail.com",
      senha : "12345678",
      foto : "-"
    }).expect(201); //espera resposta com stats code 201 de usuário criado

    usuarioid = resposta.body.id; //guarda o usuario criado na váriavel usuarioid
  });

  it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
    await request(app.getHttpServer())
    .post('/usuarios/cadastrar').send({ //acessa a URL /usuarios/cadastrar através do verbo POST e insere o corpo JSON na requsição dentro do .send({})
      nome: 'Root',
      usuario: 'capivara@gmail.com', //não vai dar certo, por conta que o email inserido já existe no sistema
      senha: '12345678',
      foto: '-'
    }).expect(400)}); //Aqui está sendo testado o erro, que ira funcionar, devido o email já existir no sistema

    it("03 - Deve Autenticar o Usuário (Login)", async () => {
    const resposta = await request(app.getHttpServer())
    .post("/usuarios/logar") //acessa a URL /usuarios/logar através do verbo POST e insere o corpo JSON na requsição dentro do .send({})
    .send({
      usuario: 'capivara@gmail.com',
      senha: '12345678',
    })
    .expect(200) //aqui o retorno espera que o login dê certo

    token = resposta.body.token; //guarda o cracha token dentro de uma variavel chamada token
    })

    it("04 - Deve Listar todos os Usuários", async () => {
    return request(app.getHttpServer())
    .get('/usuarios/all') //acessa a URL /usuarios/all através do verbo GET
    .set('Authorization', `${token}`) //como o método Buscar todos os usuários requer um TOKEN para verificar se o usuário tem as credênciais para ter acesso a função, aqui através do método SET inserimos o token do usuário logado no método 03 no campo "Authorization" 
    .expect(200) //aqui o retorno espera que a busca dê certo
    // O método GET, não possui o send({}) devido não ser requisitado nenhuma entrada do usuário
  })

    it("05 - Deve Atualizar um Usuário", async () => {
    return request(app.getHttpServer())
    .put('/usuarios/atualizar')//acessa a URL /usuarios/atualizar através do método PUT e insere o corpo JSON na requsição dentro do .send({})
    .set('Authorization', `${token}`) //O método atualizar requer que o usuário seja válido para ter acesso a esta função, portanto aqui inserimos o TOKEN de validação do usuário no campo "Authorization"
    .send({
      id: usuarioid,
      nome: 'Root Atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(200)
    .then( resposta => {// .then para criar uma aero-function onde verifica se o nome dentro do expect é o mesmo guardado
      expect("Root Atualizado").toEqual(resposta.body.nome); // no atributo nome do corpo Resposta, que acabou de ser atualizado
    })
      })
 
  afterAll(async () => { // configurações finais do teste que são executadas depois de todos os testes uma vez so no final
    await app.close(); // fecha a aplicação nest
  });
 
});