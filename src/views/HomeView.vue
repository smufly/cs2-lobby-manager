<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

import { usePlayers } from '@/stores/players'
import MatchManagement from '@/components/MatchManagement.vue'

const store = usePlayers()

const getPlayers = () => {
    return store.players
}

const playerNameInput = ref('')
const playerNameInputRef = ref(null)

const handleAddPlayer = () => {
    if (!playerNameInput.value.length) return
    if (store.isMatchRunning) return alert('Match is already started.')
    if (playerNameInput.value.length > 15) return alert('Nick name too long.')
    store.addPlayer({
        nick: playerNameInput.value.trim(),
        url: '/images/avatar.webp',
        assignment: 'No assignment',
        isActive: false,
    })
    playerNameInput.value = ''
    playerNameInputRef.value.focus()
}

const handleReloadAssignment = () => {
    alert('Reload assignment request.')
}

const handleAssignmentAction = (playerId, outcome) => {
    store.updatePlayerXP(playerId, outcome)
}
</script>
<template>
    <div class="h-full max-w-5xl align-center mx-auto py-2 px-4">
        <div v-show="false" class="flex flex-col gap-y-2 w-full items-center py-4 rounded-sm">
            <h1 class="font-bold text-4xl mx-auto text-violet-800">TeamBugged</h1>
            <p class="text-xl text-slate-600">Some description</p>
        </div>

        <MatchManagement />
        <!-- player management -->
        <div
            class="flex flex-col gap-y-4 mt-4 border border-2 border-blue-400 py-4 rounded-sm min-h-[530px] md:max-h-[530px] dark:border-blue-900">
            <div class="flex gap-x-2 px-4">
                <input ref="playerNameInputRef" v-model="playerNameInput" type="text"
                    placeholder="Type the player's nick name"
                    class="flex-1 font-semibold border border-2 border-blue-400 rounded-sm p-2 text-gray-700 dark:text-white dark:border-blue-900" />
                <button v-on:click="handleAddPlayer"
                    class="cursor-pointer flex items-center justify-center gap-x-2 px-4 py-2 border border-2 border-blue-400 text-blue-800 font-bold rounded-sm dark:border-blue-900 dark:text-blue-400">
                    <Icon width="1.4rem" icon="lucide:plus" />
                    Add Player
                </button>
            </div>
            <div class="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:overflow-y-scroll">
                <div v-for="player in getPlayers()" v-bind:key="player.id" :class="{
                    'border-green-400! border-solid!': player.isActive,
                }"
                    class="flex flex-col gap-y-2 p-4 border border-2 border-dashed border-blue-400 bg-white rounded-sm dark:border-blue-900 dark:bg-blue-950">
                    <!-- card header-->
                    <div class="flex gap-x-2">
                        <!-- header image-->
                        <div class="overflow-hidden w-16 h-16 border border-blue-500 rounded-sm hover:opacity-80">
                            <img class="w-full h-full object-center object-cover" v-bind:src="player.url"
                                alt="User Avatar" />
                        </div>
                        <!-- header status -->
                        <div class="flex-1">
                            <h3 class="text-blue-800 font-semibold dark:text-blue-400">
                                {{ player.nick }}
                            </h3>
                            <div class="flex gap-x-1 text-slate-700">
                                <span class="text-green-500">W{{ player.wins }}</span>/ <span class="text-red-500">L{{
                                    player.losses }}</span>/
                                <span class="text-yellow-500">E{{ player.expired }}</span>
                            </div>
                        </div>
                        <!-- reload assignment for player-->
                        <div>
                            <button v-on:click="handleReloadAssignment"
                                class="cursor-pointer flex p-2 bg-gray-200 rounded-sm">
                                <Icon icon="lucide:rotate-ccw" />
                            </button>
                        </div>
                    </div>
                    <!-- actual assignment component -->
                    <div :class="{
                        'border-green-500!': player.isActive,
                    }"
                        class="border border-2 border-blue-500 rounded-sm dark:bg-none dark:border-blue-800 text-blue-800 bg-white flex flex-col gap-y-2 p-2 dark:text-white dark:bg-transparent">
                        <!-- player info -->
                        <div class="flex gap-x-2">
                            <Icon class="flex-shrink-0 mt-1" icon="lucide:target" />
                            <p class="font-semibold text-sm">{{ player.assignment }}</p>
                        </div>
                        <div class="flex items-center gap-x-2">
                            <Icon icon="lucide:clock-4" />
                            <span class="font-semibold text-sm">{{
                                player.roundLimit + ' rounds'
                                }}</span>
                        </div>
                        <span class="font-semibold text-green-500 text-sm">{{ player.xp }} XP</span>
                        <div class="flex items-center justify-between gap-x-2">
                            <span :class="{
                                'bg-green-100! border-green-200! text-green-800!':
                                    player.isActive,
                            }"
                                class="border border-2 border-yellow-200 bg-yellow-100 px-2 rounded-sm font-semibold text-sm text-yellow-800">{{
                                    player.isActive ? 'ACTIVE' : 'PENDING' }}</span>
                            <!-- display action buttons only if active status is true -->
                            <div v-if="player.isActive" class="flex gap-x-2">
                                <button class="text-white bg-green-400 p-2 rounded-sm"
                                    v-on:click="handleAssignmentAction(player.id, 'win')">
                                    <Icon icon="lucide:circle-check-big" />
                                </button>
                                <button v-show="false" class="text-white bg-red-400 p-2 rounded-sm"
                                    v-on:click="handleAssignmentAction(player.id, 'loss')">
                                    <Icon icon="lucide:circle-x" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- players not added yet-->
            <div v-if="store.players.length < 1"
                class="mx-auto mx-4 text-gray-100 py-8 min-w-[560px] rounded-md text-center">
                <h3 class="font-semibold text-xl mb-2">No player added yet</h3>
                <p>It needs at least a total of 2 players to start</p>
            </div>
        </div>
    </div>
</template>
