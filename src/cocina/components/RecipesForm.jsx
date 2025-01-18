import { useState } from "react";
import { CocinaLayout } from "../layout/CocinaLayout";
import { useRecipeStore } from "../../hooks/useRecipesStore";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const RecipesForm = () => {
  const { startAddNewRecipe } = useRecipeStore()
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const { user } = useSelector(state => state.auth);


  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      description,
      ingredients,
      userId: user.id,
    };
   
    await startAddNewRecipe(recipeData)
    setTitle("")
    setDescription("")
    setIngredients([{ name: "", quantity: "" }])
  };

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <CocinaLayout>
      <div className="mt-16 flex justify-between">
        <h3 className="text-3xl mb-4 font-epilogue font-bold">Carga tu receta</h3>
        <button onClick={handleGoBack} className="flex items-center justify-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 text-white font-epilogue h-8  w-[100px] rounded-lg hover:scale-105 hover:transition-all">
          <span className="flex text-center mt-1">Volver</span>
        </button>
      </div>
      <div className="w-[95%] m-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-epilogue font-medium mb-2">
              Título de la receta
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Torta de chocolate"
              className="border rounded-lg w-full p-2 font-inter text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-epilogue text-lg font-medium mb-2">
              Preparación
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describir como se prepara..."
              className="border rounded-lg w-full p-2 text-gray-800 font-inter"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium font-epilogue mb-2">
              Ingredientes
            </label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Ingrediente"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="border rounded-lg p-2 flex-1 text-gray-800 font-inter"
                  required
                />
                <input
                  type="text"
                  placeholder="Cantidad"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  className="border rounded-lg p-2 flex-1 text-gray-800 font-inter"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="bg-gradient-to-r from-green-200 to-green-500 px-4 py-2 rounded-lg mt-2 w-full font-bold font-inter hover:scale-105 hover:transition-all"
            >
              Agregar Ingrediente
            </button>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r w-full from-pink-300 via-purple-300 to-indigo-400 px-6 py-2 rounded-lg font-bold text-gray-800 font-inter hover:scale-105 hover:transition-all"
          >
            Subir Receta
          </button>
        </form>
      </div>
    </CocinaLayout>
  );
};
