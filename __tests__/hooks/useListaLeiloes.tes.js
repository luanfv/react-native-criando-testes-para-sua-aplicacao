import { act, renderHook } from '@testing-library/react-hooks';

import useListaLeiloes from '../../src/hooks/useListaLeiloes';
import { obtemLeiloes } from '../../src/repositorio/leilao';

jest.mock('../../src/repositorio/leilao');

const mockLeilao = { 
    id: 1, 
    name: 'Leilão', 
    descricao: 'Descrição do leilão' 
};

const mockLeilao2 = { 
    id: 2, 
    name: 'Leilão 2', 
    descricao: 'Descrição do leilão 2' 
};

const mockLeiloes = [
    mockLeilao,
];


const mockLeiloesAtualizada = [
    mockLeilao,
    mockLeilao2
];

describe('hooks/useListaLeiloes', () => {
    it('deve retornar umua lista de leiloes e uma função para atualizar', async () => {
        obtemLeiloes.mockImplementation(() => mockLeiloes);

        const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());
        
        expect(result.current[0]).toEqual([]);
        
        await waitForNextUpdate();

        expect(result.current[0]).toEqual(mockLeiloes);

        obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada);

        await act(() => result.current[1]());
        
        expect(result.current[0]).toEqual(mockLeiloesAtualizada);
    });
});