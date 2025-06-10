export type TUserInitialState = {
    message: {
        message: string,
        messages: string[]
    },
    room: {
        room: string,
        users: string[],
    }
}