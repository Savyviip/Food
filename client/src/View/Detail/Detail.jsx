import Loader from '../../Components/Loader/Loader';
import Pagination from "../../Components/Pagination/Pagination";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRecipe, deleteRecipe } from '../../redux/actions';
import { useParams, useHistory } from 'react-router-dom';
import style from './Detail.module.css';

const Detail = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (ID de la receta)
  const dispatch = useDispatch(); // Obtener la función dispatch del store
  // const history = useHistory(); // Obtener el objeto de historial para redireccionar
  const [loading, setLoading] = useState(true); // Estado para controlar si se está cargando la receta
  const [currentPage, setCurrentPage] = useState(0); // Estado para controlar la página actual de los pasos
  const [stepsPerPage] = useState(1); // Número de pasos a mostrar por página

  useEffect(() => {
    // Obtener la receta al cargar el componente
    dispatch(getRecipe(id))
      .then(() => {
        setLoading(false); // Se ha cargado la receta, cambiar el estado de carga a false
      })
      .catch((error) => {
        console.log(error.response.data.message);
        alert(`Error:\n${error.response}\n${error.response}`);
        setLoading(false); // Ocurrió un error al obtener la receta, cambiar el estado de carga a false
      });
  }, [dispatch, id]);

  const recipe = useSelector((state) => state.recipe); // Obtener la receta del estado global
  // //* Esto me crea una papelera de reciclaje
  // const handleDelete = () => {
  //   // Eliminar la receta
  //   if (typeof recipe.id === "string") {
  //     dispatch(deleteRecipe(recipe.id))
  //       .then(() => {
  //         history.push('/home'); // Redireccionar al listado de recetas después de eliminar
  //       })
  //       .catch((error) => {
  //         console.log(error.response);
  //         alert(`Error:\n${error.response}\n${error.response}`);
  //       });
  //   }
  // };

  // if (!recipe || !recipe.analyzedInstructions || recipe.analyzedInstructions.length === 0) {
  // Mostrar una versión simplificada si no hay instrucciones analizadas en la receta
  return (
    <>
      <div className={style.mainCont}>
        <div className={style.container}>
          <div className={style.cardDetails}>
            <h2>{recipe[0]?.title} -ID: {recipe[0]?.id}</h2>
            <img className={style.image} src={recipe[0]?.image} alt={recipe.title} />
            <h2>{recipe[0]?.healthScore}</h2>
            <h2>{recipe[0]?.diets}</h2>
            {/* <h2>{recipe[0].summary}</h2> */}
            <div className={style.article}>
              <article dangerouslySetInnerHTML={{ __html: recipe[0]?.summary }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;