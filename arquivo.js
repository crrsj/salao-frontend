    
      function obterAgendamentos() {
        fetch('http://localhost:8080/salao')
        .then(response => response.json())
        .then(agendamentos => {
            console.log('Lista de agendamentos obtida do servidor:', agendamentos);
            exibirAgendamentos(agendamentos);
        })
        .catch(error => {
            console.error('Erro ao obter lista de agendamentos:', error);
        });
    }
    function exibirAgendamentos(agendamentos) {
        listaAgendamentos.innerHTML = '';

        agendamentos.forEach(agendamento => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Nome:</strong> ${agendamento.nome}<br>
                <strong>Serviço:</strong> ${agendamento.servico}<br>
                <strong>Data:</strong> ${agendamento.data}<br>
                <strong>Hora:</strong> ${agendamento.hora}<br>
                <button onclick="deletarAgendamento(${agendamento.id})">Cancelar</button>
                `;
             
              
               listaAgendamentos.appendChild(listItem);
        });
    }
   
     
     function deletarAgendamento(agendamentoId) {
        fetch(`http://localhost:8080/salao/deletar/${agendamentoId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert("Tem certeza que deseja cancelar o agendamento ?")
                alert("Agendamento cancelado com sucesso")
                console.log('Agendamento deletado com sucesso.');
                 obterAgendamentos(); // Atualizar a lista de agendamentos após a exclusão
            } else {
                console.error('Falha ao deletar agendamento.');
                obterAgendamentos();
            } 
        })
        .catch(error => {
            console.error('Erro ao deletar agendamento:', error);
        });
    }
    
    document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.querySelector('.container');
    const detalhesContainer = document.getElementById('detalhesAgendamento');
    const listaAgendamentos = document.getElementById('listaAgendamentos');

    setTimeout(() => {
        formContainer.classList.add('show');
        obterAgendamentos();
    }, 100);

    document.getElementById('appointmentForm').addEventListener('submit', function (event) {
        event.preventDefault();
        salvarAgendamento();
    });

    function salvarAgendamento() {
        
        const nome = document.getElementById('nome').value;
        const servico = document.getElementById('servico').value;
        const data = document.getElementById('data').value;
        const hora = document.getElementById('hora').value;

        const dadosAgendamento = {
            
            nome,
            servico,
            data,
            hora
        };

        fetch('http://localhost:8080/salao',   {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAgendamento),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados do agendamento enviados para o servidor:', data);
            limparFormulario();
            obterAgendamentos(); // Atualizar a lista de agendamentos após o salvamento
        })
        .catch(error => {
            console.error('Erro ao enviar dados do agendamento:', error);
        });
    }

    function limparFormulario() {
        // Defina os valores dos campos do formulário para os valores padrão ou vazios
        document.getElementById('nome').value = '';
        document.getElementById('servico').value = '';
        document.getElementById('data').value = '';
        document.getElementById('hora').value = '';
    }

    
  
});
