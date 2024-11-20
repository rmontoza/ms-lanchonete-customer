# tech-challenge-lanchonete
Projeto de Trabalho FIAP - Arquitetura de Sistemas

Necessário ter instalado no computador o DOCKER
Guia de instalação:

1) Windows
https://docs.docker.com/desktop/install/windows-install/
2) Linux
https://docs.docker.com/desktop/install/ubuntu/
3) Mac
https://docs.docker.com/desktop/install/mac-install/


Comando para executar e encerrar a aplicação :

1) Primeira execução:
    docker-compose up --build
2) Encerrar a aplicação
    docker-compose down
3) Executar sem o build /  Serve para executar as demais vezes após a compilação dos containers.
    docker-compose up


Para Desevolver:

1) Necessário ter o NodeJs V20 instalado.
2) IDE utilizo VSCode mas pode ser algum de preferência
3) Instalar o MongoDB. 
    https://www.mongodb.com/docs/manual/administration/install-community/
4) Instalar o Compass, gerenciador do MongoDB
    https://www.mongodb.com/docs/compass/current/install/
    
Passos para instalação simples do NodeJs.
1) Instalar o NVM (Gerenciador de versões do NodeJs)
    https://github.com/nvm-sh/nvm
2) Após a instalação do NVM, executar o seguinte comando para baixar e instalar o NodeJs.
    nvm install v20
3) Após a instalação do node com o comando supracitado, abrir a aplicação no VSCode ou a IDE de preferência, e executar os seguintes comandos:
    A) npm i
    B) npm start

Acessar a Documentação Via Swagger
http://afc18233acd6040e38b5395599548c95-2064986359.sa-east-1.elb.amazonaws.com/api-docs/


Orientações para utilização da API pelo Postman.
Observação:
Não fizemos muitos ajustes na aplicação, pois acreditamos que ela esteja já seguindo os pré requistos da fase 2, como a utilização de SOLID/Code Clean e Arquitetura Hexagonal.
Incluímos apenas a rota para a consulta do pedido por número do pedido e, utilizaremos como Webhook nossa API de alteração de status de pedido, pois ela controla todo o fluxo.

1) Cadastrar Produtos
    Utilizar as APIS dos recurso [Products]
2) Cadastrar um Cliente
    Utilizar as APIS dos recurso [Customer]
3) Cadastrar um Pedido
    Utilizar as APIS dos recurso [Orders]
4) Pagar um Pedido
    Utilizar as APIS dos recurso [Checkout]

Na collection estão apenas as rotas que são utilizadas para o fluxo da criação do pedido até o fechamento, para mais detalhes sobre a API consultar o Swagger

1) Collection
    https://github.com/rmontoza/rmontoza-tech-challenge-lanchonete/tree/main/Collection/
2) Manifestos K8s
    https://github.com/rmontoza/rmontoza-tech-challenge-lanchonete/blob/main/src/k8s/

## teste


