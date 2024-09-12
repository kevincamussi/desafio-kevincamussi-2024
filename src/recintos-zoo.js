class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { LEAO: 0, LEOPARDO: 0, MACACO: 3, CROCODILO: 0, GAZELA: 0, HIPOPOTAMO: 0 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: { LEAO: 0, LEOPARDO: 0, MACACO: 0, CROCODILO: 0, GAZELA: 0, HIPOPOTAMO: 0 } },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { LEAO: 0, LEOPARDO: 0, MACACO: 0, CROCODILO: 0, GAZELA: 1, HIPOPOTAMO: 0 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: { LEAO: 0, LEOPARDO: 0, MACACO: 0, CROCODILO: 0, GAZELA: 0, HIPOPOTAMO: 0 } },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { LEAO: 1, LEOPARDO: 0, MACACO: 0, CROCODILO: 0, GAZELA: 0, HIPOPOTAMO: 0 } }
        ];

        const animais = {
            LEAO: { tamanho: 3, biomas: ['savana'] },
            LEOPARDO: { tamanho: 2, biomas: ['savana'] },
            CROCODILO: { tamanho: 3, biomas: ['rio'] },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, biomas: ['savana'] },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'] }
        };

        if (!animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || typeof quantidade !== 'number') {
            return { erro: "Quantidade inválida" };
        }

        const animalInfo = animais[animal];
        const recintosViaveis = recintos
            .filter(recinto => this.ehRecintoViavel(recinto, animalInfo, quantidade))
            .map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - this.calcularEspacoOcupado(recinto, animalInfo, quantidade)} total: ${recinto.tamanhoTotal})`);

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

    ehRecintoViavel(recinto, animalInfo, quantidade) {
        const espacoNecessario = animalInfo.tamanho * quantidade + (quantidade > 1 ? 1 : 0);
        const biomaAdequado = animalInfo.biomas.includes(recinto.bioma);
        const espacoDisponivel = recinto.tamanhoTotal - this.calcularEspacoOcupado(recinto, animalInfo, quantidade);
        const espacoSuficiente = espacoDisponivel >= espacoNecessario;

        const animaisExistentes = recinto.animaisExistentes;
        const animalExistente = animaisExistentes[animalInfo] || 0;

        const carnívoro = ['LEAO', 'LEOPARDO'].includes(animalInfo);
        const compatibilidade = carnívoro ? animalExistente === 0 : true;

        const macacosSozinhos = animalInfo === 'MACACO' && quantidade === 1 && animaisExistentes.MACACO === 0;
        const hipopotamos = animalInfo === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio';

        return biomaAdequado && espacoSuficiente && compatibilidade && !macacosSozinhos && !hipopotamos;
    }

    calcularEspacoOcupado(recinto, animalInfo, quantidade) {
        const animalEspacoOcupado = recinto.animaisExistentes[animalInfo] * animalInfo.tamanho;
        const espacoExtra = quantidade > 1 ? 1 : 0;
        return animalEspacoOcupado + espacoExtra;
    }
}

export { RecintosZoo as RecintosZoo };
