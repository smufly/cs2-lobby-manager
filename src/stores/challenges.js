import { defineStore } from 'pinia'

export const useChallenges = defineStore('challenges', {
    state: () => ({
        challenges: [
            {
                id: 1,
                description: 'Plantar ou desarmar bomba',
                side: 'Ambos',
            },
            {
                id: 2,
                description: 'Ser MVP da rodada',
                side: 'Ambos',
            },
            {
                id: 3,
                description: 'Conseguir 3 eliminações em uma rodada',
                side: 'Ambos',
            },
            {
                id: 4,
                description: 'Dar uma assistência',
                side: 'Ambos',
            },
            {
                id: 5,
                description: 'Sobreviver até o fim da rodada',
                side: 'Ambos',
            },
            {
                id: 6,
                description: 'Usar apenas pistolas para eliminar um inimigo',
                side: 'Ambos',
            },
            {
                id: 7,
                description: 'Eliminar um inimigo com granada',
                side: 'Ambos',
            },
            {
                id: 8,
                description: 'Gastar todo o dinheiro em uma compra completa',
                side: 'Ambos',
            },
            {
                id: 9,
                description: 'Pegar a arma de um inimigo e conseguir uma eliminação com ela',
                side: 'Ambos',
            },
            {
                id: 10,
                description: 'Ficar em primeiro lugar na tabela de pontuação da rodada',
                side: 'Ambos',
            },
            {
                id: 11,
                description: 'Matar um inimigo enquanto você estiver cego',
                side: 'Ambos',
            },
            {
                id: 12,
                description:
                    'Ficar escondido (imóvel) até restarem apenas 2 jogadores vivos na sua equipe',
                side: 'Ambos',
            },
            {
                id: 13,
                description: 'Sobreviver com menos de 10 pontos de vida',
                side: 'Ambos',
            },
            {
                id: 14,
                description: 'Conseguir pelo menos uma kill de revólver R8',
                side: 'Ambos',
            },
            {
                id: 15,
                description: 'Morrer por molotov inimiga',
                side: 'Ambos',
            },
            {
                id: 16,
                description: 'Ser o primeiro a morrer na rodada',
                side: 'Ambos',
            },
            {
                id: 17,
                description: 'Ser o primeiro a matar na rodada',
                side: 'Ambos',
            },
            {
                id: 18,
                description: 'Fazer uma eliminação com headshot',
                side: 'Ambos',
            },
            {
                id: 19,
                description: 'Conseguir uma eliminação usando faca',
                side: 'Ambos',
            },
            {
                id: 20,
                description: 'Dê assistência com flash para seu companheiro de equipe',
                side: 'Ambos',
            },
            {
                id: 21,
                description: 'Sobreviver ao round inteiro sem ser eliminado',
            },
        ],
    }),
    actions: {
        fetchNextChallenge() {
            const challenge = this.challenges[Math.floor(Math.random() * this.challenges.length)]
            return challenge
        },
    },
})
