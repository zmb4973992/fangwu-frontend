import { defineStore } from "pinia"

const useUserStore = defineStore('user', {
    persist: true,
    state: () => ({
        accessToken: '',
    }),
    actions: {
        setAccessToken(accessToken: string) {
            this.accessToken = accessToken
        },
        clearAccessToken() {
            this.accessToken = ''
        }
    },
    getters: {

    },
})

export default useUserStore