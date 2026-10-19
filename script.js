const visor = document.getElementById("visor");

// ADICIONAR NÚMEROS E OPERADORES

function adicionar(valor) {

    if (visor.value === "Erro") {
        visor.value = "0";
    }

    if (
        visor.value === "0" &&
        !["+", "-", "*", "/", "."].includes(valor)
    ) {

        visor.value = valor;

    } else {

        visor.value += valor;
    }
}

// LIMPAR O VISOR

function limpar() {

    visor.value = "0";
}

// APAGAR O ÚLTIMO CARACTERE

function apagar() {

    visor.value = visor.value.slice(0, -1);

    if (visor.value === "" || visor.value === "Erro") {
        visor.value = "0";
    }
}

// CALCULAR O RESULTADO

function calcular() {

    try {

        const expressao = visor.value;

        if (!/^[0-9+\-*/.() ]+$/.test(expressao)) {

            throw new Error("Expressão inválida");
        }

        const resultado = Function(
            '"use strict"; return (' + expressao + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Resultado inválido");
        }

        visor.value = String(
            Number(resultado.toPrecision(12))
        );

    } catch {

        visor.value = "Erro";
    }
}