import RoomId from './roomId';

// В RoomID основная логика компонента (клиентский компонент 💻💻💻).
// Эта ебень нужна только для того чтобы прокинуть roomId (´。＿。｀)
// Т.к. начиная с 15 версии Next`a пропсы будут асинхронными ¯\_(ツ)_/¯

export async function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params;
    return <RoomId roomId={roomId} />
}

export default RoomPage;