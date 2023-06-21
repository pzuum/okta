import {URLSearchParams } from "url"

export  class URI {
    static run = <T extends URLSearchParams>(options: T) => {
        new URLSearchParams({
            ...options
        })
    }
}