import CreateRoomName from '@/components/AppComponents/ClientComponents/createRoomName'
import React from 'react'

function CreateRoom() {
    return (
        <section className="flex items-center justify-center flex-col gap-2 h-screen w-screen">
            <div className="flex items-center justify-center w-1/2 h-1/2 bg-muted rounded-md flex-col border-2 border-primary">
                <CreateRoomName />
            </div>
        </section>
    )
}

export default CreateRoom