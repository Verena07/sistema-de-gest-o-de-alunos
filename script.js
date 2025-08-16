let alunosData = [];
const JSON_URL = 'alunos.json';

// Função para carregar os dados do JSON
async function carregarDados() {
    try {
        const response = await fetch(JSON_URL);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }
        alunosData = await response.json();
        
        // Processar os dados (calcular médias, status, etc.)
        processarDadosAlunos();
        
        // Exibir todos os alunos inicialmente
        exibirAlunos(alunosData);
        
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('alunosTable').style.display = 'table';
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('loading').textContent = 'Erro ao carregar os dados. Por favor, tente novamente.';
    }
}

// Função para processar os dados dos alunos (calcular médias,e status)
function processarDadosAlunos() {
    alunosData.forEach(aluno => {
        // Tratar notas nulas como 0
        const nota1 = aluno.nota1 !== null ? aluno.nota1 : 0;
        const nota2 = aluno.nota2 !== null ? aluno.nota2 : 0;
        const nota3 = aluno.nota3 !== null ? aluno.nota3 : 0;
        
        // Calcular média
        const media = (nota1 + nota2 + nota3) / 3;
        aluno.media = parseFloat(media.toFixed(2));
        
        // Determinar status e motivo
        if (aluno.media >= 7.0 && aluno.faltas < 7) {
            aluno.status = 'Aprovado';
            aluno.motivo = '';
        } else {
            aluno.status = 'Reprovado';
            if (aluno.media < 7.0 && aluno.faltas >= 7) {
                aluno.motivo = 'Média insuficiente e excesso de faltas';
            } else if (aluno.media < 7.0) {
                aluno.motivo = 'Média insuficiente';
            } else {
                aluno.motivo = 'Excesso de faltas';
            }
        }
    });
}

// Função para exibir alunos na tabela
function exibirAlunos(alunos) {
    const tbody = document.getElementById('alunosBody');
    tbody.innerHTML = '';
    
    alunos.forEach(aluno => {
        const row = document.createElement('tr');
        
       
        if (aluno.status === 'Aprovado') {
            row.classList.add('status-aprovado');
        } else {
            row.classList.add('status-reprovado');
        }
        
        row.innerHTML = `
            <td>${aluno.id}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.sobrenome}</td>
            <td>${aluno.nota1 !== null ? aluno.nota1 : 0}</td>
            <td>${aluno.nota2 !== null ? aluno.nota2 : 0}</td>
            <td>${aluno.nota3 !== null ? aluno.nota3 : 0}</td>
            <td>${aluno.media}</td>
            <td>${aluno.faltas}</td>
            <td>${aluno.status}</td>
            <td>${aluno.motivo}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Função para filtrar alunos
function filtrarAlunos() {
    const nomeFilter = document.getElementById('nomeFilter').value.toLowerCase();
    const mediaMin = parseFloat(document.getElementById('mediaMin').value) || 0;
    const mediaMax = parseFloat(document.getElementById('mediaMax').value) || 10;
    const faltasMin = parseInt(document.getElementById('faltasMin').value) || 0;
    const faltasMax = parseInt(document.getElementById('faltasMax').value) || 100;
    
    const alunosFiltrados = alunosData.filter(aluno => {
        const nomeCompleto = `${aluno.nome} ${aluno.sobrenome}`.toLowerCase();
        const media = aluno.media;
        const faltas = aluno.faltas;
        
        return nomeCompleto.includes(nomeFilter) &&
               media >= mediaMin && media <= mediaMax &&
               faltas >= faltasMin && faltas <= faltasMax;
    });
    
    exibirAlunos(alunosFiltrados);
}

// Função para mostrar alunos aprovados
function mostrarAprovados() {
    const aprovados = alunosData.filter(aluno => aluno.status === 'Aprovado');
    exibirAlunos(aprovados);
    

    document.getElementById('nomeFilter').value = '';
    document.getElementById('mediaMin').value = '';
    document.getElementById('mediaMax').value = '';
    document.getElementById('faltasMin').value = '';
    document.getElementById('faltasMax').value = '';
}

// Função para mostrar alunos reprovados
function mostrarReprovados() {
    const reprovados = alunosData.filter(aluno => aluno.status === 'Reprovado');
    exibirAlunos(reprovados);
    
  
    document.getElementById('nomeFilter').value = '';
    document.getElementById('mediaMin').value = '';
    document.getElementById('mediaMax').value = '';
    document.getElementById('faltasMin').value = '';
    document.getElementById('faltasMax').value = '';
}


document.addEventListener('DOMContentLoaded', carregarDados);
document.getElementById('aplicarFiltros').addEventListener('click', filtrarAlunos);
document.getElementById('btnTodos').addEventListener('click', () => exibirAlunos(alunosData));
document.getElementById('btnAprovados').addEventListener('click', mostrarAprovados);
document.getElementById('btnReprovados').addEventListener('click', mostrarReprovados);

// 
document.getElementById('nomeFilter').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        filtrarAlunos();
    }
});