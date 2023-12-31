import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CompareContext } from '../helpers/compare-context';
import { Pokemon } from '../models/pokemon';
import { selectId } from '../store/actions';
import { pokemonsSelector } from '../store/selectors';
import styles from './pokemon-card.module.css';
import { formatDate, formatType } from '../helpers';
import LikeButton from './like-button';

type Props = {
  pokemon: Pokemon;
};

function PokemonCard({ pokemon }: Props) {
  console.log('render PokemonCard')
  const navigate = useNavigate();

  // TODO idéalement remonter la valeur via une props et faire le dispatch depuis la page PokemonList
  // (séparation des responsabilité)
  const dispatch = useDispatch();
  const { idsToCompare } = useSelector(pokemonsSelector);


  function goToPokemon(id: number) {
    navigate(`/pokemons/${id}`);
  }

  return (
    <div className="col s6 m4" onClick={() => goToPokemon(pokemon.id ?? 0)}>
      <div className={classNames('card', 'horizontal', styles.horizontal)}>
        <div className="card-image">
          <img src={pokemon.picture} alt={pokemon.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p>
              <small>{formatDate(pokemon.created)}</small>
            </p>
            {pokemon.types?.map((type) => (
              <span key={type} className={formatType(type)}>
                {type}
              </span>
            ))}
            <label
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <input
                type="checkbox"
                checked={idsToCompare.includes(pokemon.id ?? 0)}
                disabled={!idsToCompare.includes(pokemon.id ?? 0) && idsToCompare.length === 2}
                onChange={() => dispatch(selectId(pokemon.id ?? 0))}
              />
              <span>Compare</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
Exemple de Higher Order Component pour récupérer des services/valeurs

type Props = {
  pokemon: Pokemon;
  navigate: NavigateFunction;
};

function PokemonCard({ pokemon, navigate }: Props) {
  //const navigate = useNavigate();
  // const [likes, setLikes] = useState(0);
  console.log(navigate)

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.addEventListener('click', (event) => {
      event.stopPropagation();
      (event.target as HTMLButtonElement).innerText = String(Number((event.target as HTMLButtonElement).innerText) + 1);
    });
  }, [])

  function goToPokemon(id: number) {
    navigate(`/pokemons/${id}`);
  }

  return (
    <div
      className="col s6 m4"
      onClick={() => goToPokemon(pokemon.id ?? 0)}
    >
      <div className="card horizontal">
        <div className="card-image">
          <img src={pokemon.picture} alt={pokemon.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p>
              <small>{formatDate(pokemon.created)}</small>
            </p>
            {pokemon.types?.map((type) => (
              <span key={type} className={formatType(type)}>
                {type}
              </span>
            ))}
            <label onClick={(event) => event.stopPropagation()}>
              <input type="checkbox"/>
              <span>Compare</span>
            </label>
            <LikeButton ref={buttonRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

function withNavigate(InnerComponent: any) {
  function OuterComponent(outerProps: any) {
    const navigate = useNavigate();

    return <InnerComponent navigate={navigate} {...outerProps} />
  }

  return OuterComponent;
}

export default withNavigate(PokemonCard);
*/

/*
Render Prop pour récupérer des services/valeurs
function Navigate(props: any) {
  const navigate = useNavigate();

  return props.children(navigate);
}


function PokemonCard({ pokemon }: any) {
  return <Navigate>
    {(navigate: NavigateFunction) => <div onClick={() => navigate('/login')}>Pokemon Card...</div>}
  </Navigate>
}
*/

export default PokemonCard;
