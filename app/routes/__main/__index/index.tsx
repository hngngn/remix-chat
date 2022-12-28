const Home = () => {
    return (
        <div className="center min-h-[calc(100vh-16px*2)]">
            <div className="flex flex-col gap-2 max-w[30em] w-full">
                <h1 className="text-2xl font-700">Select a message</h1>
                <h2 className="text-md font-500">
                    Choose from your existing conversations, search for your friend to start chat
                    with them, or just keep floating.!
                </h2>
                <code className="text-md"></code>
            </div>
        </div>
    )
}

export default Home
