var sequenciaID = motoristas.length+1 || 1;

var tabelaMotoristas = null;

carregarDados(motoristas);

$("#botaoSalvar").on("click", salvarMotorista);

$("#tabelaMotoristas").on("click", ".btnEditar", function (evento) {
  var ID = evento.currentTarget.value;
  var motorista = motoristas.filter(function (item) {
    return item.ID == ID;
  });

  if (motorista.length <= 0) {
    return;
  }

  motorista = motorista[0];

  var motoristaID = document.getElementById("motoristaID");
  var nome = document.getElementById("nome");
  var telefone = document.getElementById("telefone");
  var dataNascimento = document.getElementById("dataNascimento");
  var cnh = document.getElementById("cnh");
  var cpf = document.getElementById("cpf");
  var cnhTipo = document.getElementById("cnhTipo");
  var ativo = document.getElementById("situacao");

  motoristaID.value = motorista.ID;
  nome.value = motorista.Nome;
  telefone.value = motorista.Telefone;
  dataNascimento.value = motorista.DataNascimento;
  cnh.value = motorista.CNH;
  cpf.value = motorista.CPF;
  cnhTipo.value = motorista.CNHTipo;
  ativo.value = motorista.Ativo;

  $("#modalCentro").modal("show");
});

$("#btnCadastro").on("click", function(){
  limparModal();
  $("#modalCentro").modal("show");
});

function salvarMotorista() {
  var motoristaID = document.getElementById("motoristaID");
  var nome = document.getElementById("nome");
  var telefone = document.getElementById("telefone");
  var dataNascimento = document.getElementById("dataNascimento");
  var cnh = document.getElementById("cnh");
  var cpf = document.getElementById("cpf");
  var cnhTipo = document.getElementById("cnhTipo");
  var ativo = document.getElementById("situacao");

  if (nome.value == "" || telefone.value == "" || dataNascimento.value == "" || cnh.value == "" || cpf.value == "" || cnhTipo.value == "" || ativo.value == ""){
    return;
  }

  var motorista = {
    ID: motoristaID.value == "" ? sequenciaID++ : parseInt(motoristaID.value),
    Nome: nome.value,
    Telefone: telefone.value,
    DataNascimento: dataNascimento.value,
    CNH: cnh.value,
    CPF: cpf.value,
    CNHTipo: cnhTipo.value,
    Ativo: ativo.value == "true",
  };
  
  if (motoristaID.value == "") {
    adicionarMotorista(motorista);
  }
  else{
    atualizarMotorista(motorista);
  }

  $("#modalCentro").modal("hide");

  limparModal();

  carregarDados(motoristas);
}

function carregarDados(dados) {
  if (tabelaMotoristas != null) {
    tabelaMotoristas.destroy();
  }
  tabelaMotoristas = $("#tabelaMotoristas").DataTable({
    language: tbLanguage,
    data: dados,
    columns: [
      {
        data: "Nome",
      },
      {
        data: "Telefone",
      },
      {
        data: "DataNascimento",
      },
      {
        data: "CNH",
      },
      {
        data: "CPF",
      },
      {
        data: "CNHTipo",
      },
      {
        data: "Ativo",
        render: function (dado, type) {
          if (dado) {
            return "Ativo";
          }
          return "Inativo";
        },
      },
      {
        data: "ID",
        render: function (dado, type) {
          return (
            '<button type="button" class= "btnEditar" value="' + dado + '"><img src="./assets/edit.svg" alt="ícone de lápis" width= "20px"></button>'
          );
        },
      },
    ],
  });
}

function adicionarMotorista(motorista) {
  motoristas.push(motorista);
}

function atualizarMotorista(motorista) {
  for (var i = 0; i < motoristas.length; i++) {
    if (motoristas[i].ID == motorista.ID) {
      motoristas[i] = motorista;
      break;
    }
  }
}

function limparModal() {
  var motoristaID = document.getElementById("motoristaID");
  var nome = document.getElementById("nome");
  var telefone = document.getElementById("telefone");
  var dataNascimento = document.getElementById("dataNascimento");
  var cnh = document.getElementById("cnh");
  var cpf = document.getElementById("cpf");
  var cnhTipo = document.getElementById("cnhTipo");
  var ativo = document.getElementById("situacao");

  motoristaID.value = "";
  nome.value = "";
  telefone.value = "";
  dataNascimento.value = "";
  cnh.value = "";
  cpf.value = "";
  cnhTipo.value = "";
  ativo.value = "";
}