import axios from "axios";

const API_URL = 'https://pokeapi.co/api/v2/';

//get details of pokemon
const getPokemonDetail = async (sUrl) => {
  return await axios.get(sUrl);
}

//method for search pokemon
export const getPokemon = async(params = {}) => {
  //build url to get pokemon by params
  let sUrl = params.url ? params.url : params.nameOrId && params.nameOrId !== '' ? `${API_URL}pokemon/${params.nameOrId}?limit=20` : `${API_URL}pokemon?limit=20`;

  const oResult = await axios.get(sUrl);
  let aPokemon = [], oReturnData = {};

  if (oResult.status === 200) {
    const { data } = oResult;

    oReturnData.next = data.next;
    oReturnData.previous = data.previous;

    //if results is more than 1 then the requests was for list of pokemon
    if (data.results) {
      for (const pokemon of data.results) {
        //get details of pokemon by url
        let oPokemon = await getPokemonDetail(pokemon.url);
  
        const { data } = oPokemon;
  
        aPokemon.push({
          id : data.id,
          name : data.name,
          image : data.sprites.front_default, 
          type : data.types[0].type.name,
        });
      }
    } else {
      aPokemon.push({
        id : data.id,
        name : data.name,
        image : data.sprites.front_default, 
        type : data.types[0].type.name,
        abilities : data.abilities,
        stats : data.stats, 
      });
    }
  }

  oReturnData.pokemon = aPokemon;

  return oReturnData;
} 