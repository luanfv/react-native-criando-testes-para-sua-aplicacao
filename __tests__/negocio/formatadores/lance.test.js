import { formataMaiorLanceDoLeilao } from '../../../src/negocio/formatadores/lance';

describe('negocio/formatadores/lance', () => {
    describe('formataMaiorLanceDoLeilao', () => {
        it('deve retornar o maior valor da lista guardada em "representacao"', () => {
            const representacao = [
                { valor: 1000, },
                { valor: 2000, },
                { valor: 1600, },
            ];
            
            const resultado = formataMaiorLanceDoLeilao(representacao, 1000);
            
            expect(resultado).toBe(2000);
        });
    });
});