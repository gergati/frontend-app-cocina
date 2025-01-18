import { PulgarAbajo } from "./icons/PulgarAbajo"
import { PulgarArriba } from "./icons/PulgarArriba"


export const RatingRecipe = () => {
    return (
        <div className='w-full h-[50px] font-epilogue flex items-start justify-center'>
            <div className="flex gap-6">
                <div className="">
                    <p>Te gustó esta receta?</p>
                </div>
                <div className="flex gap-6">
                    <div>
                        <button>
                            <PulgarAbajo />
                        </button>
                    </div>
                    <div>
                        <button>
                            <PulgarArriba />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
