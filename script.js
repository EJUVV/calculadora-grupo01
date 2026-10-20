const visor = document.getElementById("visor");
const LIMITE_CARACTERES = 20;
let resultadoExibido = false;

function adicionar(valor) {
    if (resultadoExibido) {
        if (!["+", "-", "*", "/"].includes(valor)) {
            visor.value = "0";
        }

        resultadoExibido = false;
    }

    if (visor.value === "Erro") {
        visor.value = "0";
    }

    if (visor.value.length >= LIMITE_CARACTERES) {
        return;
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

function limpar() {
    visor.value = "0";
    resultadoExibido = false;
}

function apagar() {
    if (resultadoExibido) {
        return;
    }

    visor.value = visor.value.slice(0, -1);

    if (visor.value === "" || visor.value === "Erro") {
        visor.value = "0";
    }
}

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

        visor.value = String(Number(resultado.toPrecision(12)));
        resultadoExibido = true;
    } catch {
        visor.value = "Erro";
        resultadoExibido = true;
    }
}
