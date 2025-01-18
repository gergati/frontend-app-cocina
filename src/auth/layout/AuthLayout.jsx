

export const AuthLayout = ({ children, title }) => {
    return (
        <div className="max-w-sm border border-black/10 m-auto min-h-[500px] my-6 rounded-xl">
            <div className="my-6 mx-3">
                <h1 className="font-epilogue text-3xl -rotate-2 font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 w-[186px] hover:scale-105 cursor-pointer">AppCocking</h1>
            </div>
            <div className="mx-4">
                <h2 className="font-epilogue text-3xl mt-12">{title}</h2>
                {children}
            </div>
        </div>
    )
}
