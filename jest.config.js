module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true, // Habilita coleta de cobertura
    collectCoverageFrom: [
      'src/**/*.ts', // Inclui todos os arquivos TypeScript dentro de src
      '!src/**/*.test.ts', // Exclui arquivos de teste
      '!src/**/index.ts', // Exclui arquivos index
    ],
    coverageDirectory: 'coverage', // Diretório onde o relatório será gerado
  };
  