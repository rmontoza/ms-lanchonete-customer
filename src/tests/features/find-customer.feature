Feature: Encontrar cliente pelo documento

  Scenario: O cliente existe no banco de dados
    Given que existe um cliente com o documento "123456789" no banco de dados
    When eu procuro pelo cliente com o documento "123456789"
    Then eu devo receber os detalhes do cliente:
      | customerName | document   | id       |
      | John Doe     | 123456789  | 1        |

  Scenario: O cliente não existe no banco de dados
    Given que não existe um cliente com o documento "987654321" no banco de dados
    When eu procuro pelo cliente com o documento "987654321"
    Then eu devo receber "null"
