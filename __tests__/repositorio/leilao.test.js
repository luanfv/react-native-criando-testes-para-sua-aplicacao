import apiLeiloes from '../../src/servicos/apiLeiloes';
import { obtemLeilao, obtemLeiloes } from '../../src/repositorio/leilao';

jest.mock('../../src/servicos/apiLeiloes');

const mockLeilao = { 
    id: 1, 
    name: 'Leilão', 
    descricao: 'Descrição do leilão' 
};

const mockLeiloes = [
    mockLeilao,
];

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

describe('repositorio/leilao', () => {
    beforeEach(() => {
        // Limpa a implementação do mock em cada "it"
        apiLeiloes.get.mockClear();
    });

    describe('obtemLeiloes', () => {
        it('deve retornar uma lista de leilões', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));

            const leiloes = await obtemLeiloes();
            
            expect(leiloes).toEqual(mockLeiloes);
            expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
        });

        it('deve retornar uma lista vazia quando a requisição falhar', async () => {
            apiLeiloes.get.mockImplementation(mockRequisicaoErro);

            const leiloes = await obtemLeiloes();
            
            expect(leiloes).toEqual([]);
            expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
        });
    });

    describe('obtemLeilao', () => {
        it('deve retornar um leilão', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeilao));
    
            const leilao = await obtemLeilao(1);

            expect(leilao).toEqual(mockLeilao);
            expect(apiLeiloes.get).toHaveBeenCalledWith(`/leiloes/${1}`);
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
        });

        it('deve retornar um objeto vazio quando a requisição falhar', async () => {
            apiLeiloes.get.mockImplementation(mockRequisicaoErro);

            const leilao = await obtemLeilao(1);

            expect(leilao).toEqual({});
            expect(apiLeiloes.get).toHaveBeenCalledWith(`/leiloes/${1}`);
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
        });
    });
});