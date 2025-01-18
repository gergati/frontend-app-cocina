import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { RecipesPage } from "../pages/RecipesPage";
import { CocinaPage } from "../pages/CocinaPage";
import { PerfilPage } from "../pages/PerfilPage";
import { RecipesForm } from "../components/RecipesForm";
import { DetailsCardPage } from "../pages/DetailsCardPage";

export const CocinaRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="recipes" element={<CocinaPage />} />
            <Route path="recipes/details/:id" element={<RecipesPage />} />
            <Route path="perfil" element={<PerfilPage />} />
            <Route path="perfil/recipes/:id" element={<DetailsCardPage />} />
            <Route path="newRecipes" element={<RecipesForm />} />
        </Routes>
    );
};
