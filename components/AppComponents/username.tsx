import React from 'react'

function Username({ socketId }: { socketId: string | undefined }) {
    return (
        <h2 suppressHydrationWarning>Username: {socketId}</h2>
    )
}

export default Username