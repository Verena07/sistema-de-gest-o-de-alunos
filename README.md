# Sistema de Gestão de Alunos

Um sistema completo para **gerenciar dados de alunos** utilizando apenas **HTML, CSS e JavaScript puro**.  
Os dados são carregados a partir de um arquivo **JSON remoto** ([Mock de alunos](https://docs.undesk.com.br/Mocks/alunos.json)), processados e exibidos em uma interface interativa com filtros e visualizações.

---

## Visão Geral
- Carregamento assíncrono de dados de alunos.  
- Processamento automático de **notas, médias e status**.  
- Sistema de **filtros dinâmicos** (nome, notas, faltas).  
- Interface simples, responsiva e de fácil uso.  

---

## Estrutura de Arquivos
/sistema-gestao-alunos
│── index.html # Estrutura da página
│── style.css # Estilos e design
│── script.js # Lógica e funcionalidades


---
## Principais Funcionalidades

- Carregamento de dados via Fetch API com tratamento de erros.  
- Substituição de notas nulas por 0 e cálculo automático da média.  
- Definição do status do aluno (aprovado ou reprovado por média/faltas).  
- Filtros por nome, média e faltas.  
- Visualizações rápidas: todos, aprovados ou reprovados.  
- Interface com tabela responsiva e destaques de status.

  
### Carregamento de Dados
- Requisição assíncrona ao JSON remoto via **Fetch API**.  
- Exibição de **mensagem de carregamento** durante a busca.  
- Tratamento de possíveis erros de conexão.  

### Processamento dos Alunos
Para cada aluno:
- Substitui **notas nulas por 0**.  
- Calcula a **média aritmética das 3 notas**.  
- Determina o **status**:
  - Aprovado → Média ≥ 7.0 **e** faltas < 7  
  - Reprovado por média insuficiente → Média < 7.0  
  - Reprovado por excesso de faltas → Faltas ≥ 7  

### Sistema de Filtros
- Filtro por **nome** (busca em nome e sobrenome).  
- Filtro por **média mínima**.  
- Filtro por **média máxima**.  
- Filtro por **faltas mínimas**.  
- Filtro por **faltas máximas**.  

### Visualizações Rápidas
- Mostrar **todos os alunos**.  
- Filtrar apenas **aprovados**.  
- Filtrar apenas **reprovados (com motivo)**.  

---

## Interface do Usuário
- **Tabela responsiva** com dados dos alunos.  
- Destaque em **verde/vermelho** para status.  
- Seção organizada para filtros.  
- **Feedback visual** durante operações.  

---

## Como Executar
1. Coloque os arquivos (`index.html`, `style.css`, `script.js`) na mesma pasta.  
2. Abra o arquivo **index.html** em um navegador moderno.  
3. O sistema carregará os dados automaticamente.  

---

## Observações Técnicas
- Todo o processamento é feito **no navegador**.  
- **Sem dependências externas** (JavaScript puro).  
- Código organizado e fácil de manter.  
- Possível expandir funcionalidades rapidamente.  

---

## Melhorias Futuras
- Adicionar **paginação** para muitos registros.  
- Implementar **ordenação por colunas**.  
- Exportar dados para **CSV/Excel**.  
- Otimizar para uma versão **mobile**.  



