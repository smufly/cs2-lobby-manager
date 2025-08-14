<script setup>
import { Icon } from "@iconify/vue"
import { ref, computed } from 'vue'
import BaseModal from "./BaseModal.vue"
import { usePlayers } from '@/stores/players'

const store = usePlayers()

const activePlayer = computed(() => {
    return store.players.find((player) => player.isActive)
})

const isNextButtonDisabled = ref(false)
const countdown = ref(0)

let countdownInterval = null

const startCountdown = () => {
    isNextButtonDisabled.value = true
    countdown.value = 3

    countdownInterval = setInterval(() => {
        if (countdown.value > 1) {
            countdown.value -= 1
        } else {
            clearInterval(countdownInterval)
            countdown.value = 0
            isNextButtonDisabled.value = false
        }
    }, 1000)
}

const handleStartMatch = () => {
    if (store.players.length < 2) return alert('More than two players is required!')
    store.startMatch()
}

const handleNextRound = () => {
    if (!store.players.length || !store.isMatchRunning)
        return alert('Next round blocked, not enough players or match paused.')
    if (countdown.value > 0) return alert('Next round blocked, wait countdown to reach zero')

    startCountdown()
    store.nextRound()
}

const handleEndMatch = () => { }

const isPlayersModalVisible = ref(false)

const handleConfigurePlayers = () => {
    isPlayersModalVisible.value = true
}

</script>
<template>
    <BaseModal v-model:is-visible="isPlayersModalVisible">
        <h3>This is filled by slot</h3>
    </BaseModal>
    <div class="mt-4 border border-2 border-blue-400 rounded-sm dark:border-blue-900">
        <div
            class="flex justify-between gap-x-2 p-4 text-blue-800 font-semibold text-xl border-b border-blue-400 dark:border-blue-900 dark:text-blue-400">
            <div class="flex gap-x-2 items-center">
                <Icon icon="lucide:target" />Match Management
            </div>
            <button v-on:click="handleConfigurePlayers"
                class="flex items-center gap-x-2 px-2 py-2 border border-2 border-blue-400 text-blue-800 font-bold rounded-sm dark:text-blue-400 dark:border-blue-900">
                <Icon icon="lucide:settings" />
            </button>
        </div>
        <div class="flex flex-col gap-y-2 items-center py-4">
            <div class="flex flex-col gap-y-2 items-center">
                <div class="overflow-hidden w-20 h-20 border border-blue-500 rounded-sm">
                    <img class="w-full h-full object-center object-cover"
                        :src="activePlayer ? activePlayer.url : '/images/question-mark.jpg'"
                        alt="Active player avatar" />
                </div>
                <h3 class="text-blue-800 text-xl font-semibold dark:text-blue-400">
                    {{ activePlayer ? activePlayer.nick : '???????' }}
                </h3>
            </div>
            <h3 class="text-3xl font-bold text-slate-800 dark:text-gray-200">
                Round {{ store.roundCount }}
            </h3>
            <span
                class="font-semibold text-blue-600 text-sm uppercase px-2 border border-blue-400 bg-gray-200 rounded-sm w-fit">
                {{ store.isMatchRunning ? 'Match Running' : 'Match Paused' }}
            </span>
        </div>
        <div class="flex gap-x-2 justify-center py-4">
            <button v-on:click="handleStartMatch" :class="{
                'opacity-60 !cursor-not-allowed': store.isMatchRunning,
            }"
                class="cursor-pointer text-white font-bold text-md border border-2 border-blue-500 bg-blue-400 py-2 px-4 min-w-[120px] rounded-sm hover:bg-blue-300 dark:bg-blue-500 dark:text-gray-200 dark:hover:bg-blue-600">
                Start match
            </button>
            <button v-on:click="handleNextRound"
                class="cursor-pointer text-white font-bold text-md border border-2 border-orange-500 bg-orange-400 py-2 px-4 min-w-[120px] rounded-sm hover:bg-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600">
                {{ !isNextButtonDisabled ? 'Next round' : countdown }}
            </button>
            <button v-on:click="handleEndMatch"
                class="cursor-pointer text-white font-bold text-md border border-2 border-red-500 bg-red-400 py-2 px-4 min-w-[120px] rounded-sm hover:bg-red-300 dark:bg-red-500 dark:hover:bg-red-600">
                End Match
            </button>
        </div>
    </div>
</template>
