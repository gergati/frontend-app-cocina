import React from 'react'
import { ClockIcon } from './icons/ClockIcon'
import { UsersIcon } from './icons/UsersIcon'
import { Link } from 'react-router-dom'

export const CardDetailRecipe = ({ title, id , userId }) => {
    


    return (
        <>
            <div className="w-full border border-gray-300 h-[160px] rounded-2xl hover:scale-105 hover:transition-all">
                <div className="flex" >
                    <div className="w-full flex">
                        <img
                            src="src/assets/food-1.jpg"
                            alt=""
                            className="w-full h-[160px] object-cover rounded-2xl p-1"
                        />
                    </div>
                    <div className="w-full h-[160px] p-2">
                        <div className="h-[80%]">
                            <h3 className="text-xl font-epilogue">{title}</h3>
                            <div className="text-black/75">
                                <div className="flex gap-2">
                                    <ClockIcon />
                                    <span>2 min. </span>
                                </div>
                                <div className="flex gap-2">
                                    <UsersIcon />
                                    <span>Comen 5 pers.</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-end">
                            <Link
                                to={`/perfil/recipes/${id}`}
                                className="text-blue-600 font-inter mr-5"
                            >
                                Más...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
