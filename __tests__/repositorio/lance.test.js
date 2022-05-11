import apiLeiloes from '../../src/servicos/apiLeiloes';
import { obtemLancesDoLeilao, adicionaLance } from '../../src/repositorio/lance';

jest.mock('../../src/servicos/apiLeiloes');

const mockLance = {
    valor: 200,
};

const mockLances = [mockLance];

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno,
            });
        }, 100);
    });
}

const mockRequisicaoErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject();
        }, 100);
    });
}

describe('repositorio/lance', () => {
    beforeEach(() => {
        // Limpa a implementação do mock em cada "it"
        apiLeiloes.get.mockClear();
        apiLeiloes.post.mockClear();
    });

    describe('obtemLancesDoLeilao', () => {
        it('deve retornar uma lista de lances', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLances));

            const lances = await obtemLancesDoLeilao(2);

            expect(lances).toEqual(mockLances);
            expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=2&_sort=valor&_order=desc');
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
        });

        it('deve retornar uma lista vazia quando a requisição falhar', async () => {
            apiLeiloes.get.mockImplementation(mockRequisicaoErro);

            const lances = await obtemLancesDoLeilao(2);

            expect(lances).toEqual([]);
            expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=2&_sort=valor&_order=desc');
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
        });
    });


    describe('adicionaLance', () => {
        it('deve retornar verdadeiro', async () => {
            apiLeiloes.post.mockImplementation(() => mockRequisicao(mockLances));

            const sucesso = await adicionaLance(mockLance);

            expect(sucesso).toBeTruthy();
            expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLance);
            expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
        });

        it('deve retornar falso quando a requisição falhar', async () => {
            apiLeiloes.post.mockImplementation(mockRequisicaoErro);

            const sucesso = await adicionaLance(mockLance);

            expect(sucesso).toBeFalsy();
            expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLance);
            expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
        });
    });
});