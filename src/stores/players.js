import { defineStore } from 'pinia'
import { useChallenges } from './challenges'

const ROUND_LIMIT_PER_PLAYER = 2

export const usePlayers = defineStore('players', {
    state: () => ({
        players: [],
        nextId: 0,
        isMatchRunning: false,
        roundCount: 1,
    }),
    actions: {
        addPlayer(player) {
            this.players.push({
                ...player,
                id: this.nextId++,
                roundLimit: ROUND_LIMIT_PER_PLAYER,
                isActive: false,
                xp: 0,
                wins: 0,
                losses: 0,
                expired: 0,
            })
        },
        toggleActive(playerId) {
            const player = this.players.find((player) => player.id === playerId)
            if (player) {
                player.isActive = !player.isActive
            }
        },
        assignChallenges() {
            const challenges = useChallenges()

            this.players.forEach((player) => {
                const challenge = challenges.fetchNextChallenge()
                player.assignment = challenge.description
            })
        },
        assignChallengeForPlayer(playerId) {
            const challenges = useChallenges()
            const challenge = challenges.fetchNextChallenge()
            this.players[playerId].assignment = challenge.description
        },
        startMatch() {
            if (this.isMatchRunning) return
            this.isMatchRunning = true
            this.players[0].isActive = true
            this.assignChallenges()
        },
        nextRound() {
            this.roundCount++
            const activePlayerIdx = this.players.findIndex((player) => player.isActive)
            if (activePlayerIdx !== -1) {
                const activePlayer = this.players[activePlayerIdx]
                activePlayer.roundLimit -= 1

                if (activePlayer.roundLimit <= 0) {
                    activePlayer.isActive = false
                    activePlayer.roundLimit = ROUND_LIMIT_PER_PLAYER
                    this.assignChallengeForPlayer(activePlayerIdx)
                    const nextPlayerIdx = (activePlayerIdx + 1) % this.players.length
                    this.players[nextPlayerIdx].isActive = true
                }
            } else {
                this.players[0].isActive = true
            }
        },
        calculateXP(roundsLeft) {
            roundsLeft
            return 10
        },
        // TODO: I've introduced ROUND_LIMIT_PER_PLAYER constant, switch case should adapt accordingly.
        calculateWinXP(roundsLeft) {
            const baseXP = 10
            let bonusXP = 0
            switch (roundsLeft) {
                case 3:
                    bonusXP = 5
                    break
                case 2:
                    bonusXP = 3
                    break
                case 1:
                    bonusXP = 1
                    break
                default:
                    break
            }
            // keeps calculateWinXP off from now on
            // eslint-disable-next-line
            return true ? baseXP : baseXP + bonusXP
        },
        calculateLossXP() {
            return 0
        },
        calculateExpiredXP() {
            return -1
        },
        updatePlayerXP(playerId, outcome) {
            let xp = 0
            // I'm only using this to find out the roundLimit for the player, is it really necessary?
            // if the roundLimit is fixed, I can simply remove this from here.
            let player = this.players.find((player) => player.id === playerId)

            // resets the player's status to move on to the next player.
            this.assignChallengeForPlayer(player.id)
            this.players[playerId].roundLimit = ROUND_LIMIT_PER_PLAYER
            this.players[playerId].isActive = false

            // player.id property doesn't reflect player index, so the actual index needs to be found to avoid messing up player data.
            const activePlayerIdx = this.players.findIndex((player) => player.id === playerId)
            const nextPlayerIdx = (activePlayerIdx + 1) % this.players.length
            this.players[nextPlayerIdx].isActive = true

            // as per the current system behaviour, updating the player xp results in roundCount being incremented by one, whether it's a win, loss, or expired.
            this.roundCount += 1

            if (outcome === 'win') {
                xp = this.calculateWinXP(player.roundLimit)
                this.players[playerId].wins += 1
            } else if (outcome === 'loss') {
                xp = this.calculateLossXP(player.roundLimit)
                this.players[playerId].losses += 1
            } else if (outcome === 'expired') {
                xp = this.calculateExpiredXP()
                this.players[playerId].expired += 1
            }

            this.players[playerId].xp += xp
        },
    },
})
