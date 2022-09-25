import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPokemon } from './api/pokemon';
import { colorsStyle } from '../utils/colors';
import CardDetail from '../components/cardDetail';

export default function Pokemon(context) {
    const [pokemon, setpokemon] = useState('');
    const router = useRouter();

    const getPokemonDetails = async(id) => {
        //build filter for search pokemon
        let params = {
            nameOrId : id
        }
        const oResult = await getPokemon(params);
        setpokemon(oResult);
    }

    useEffect(() => {
        const { id } = router.query;
        if (id) {
            getPokemonDetails(id);
        }
    }, [])
    
  return (
    <div className="container">
        <div className="row d-flex justify-content-center">
            {
                pokemon && (
                    pokemon.pokemon.map((oPokemon, nIndex) => {
                    let oColor = colorsStyle.find(color => color.type === oPokemon.type)
                    return (
                        <CardDetail
                            item={oPokemon}
                            color={oColor}
                            nIndex={nIndex}
                            key={nIndex}
                        />
                    )
                    })
                )
            }
        </div>
    </div>
  )
}
