import React, { useEffect, useState } from 'react';
import { getPokemon } from '../pages/api/pokemon';
import { colorsStyle } from '../utils/colors';
import CardList from '../components/cardList';
import {
  Col,
} from 'react-bootstrap';

export default function Home() {
  //state for save result
  const [pokemon, setpokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const listPokemon = async(params = {}) => {
    //get results of pokemon
    const oResult = await getPokemon(params);
    setpokemon(oResult);
    setIsLoading(false);
  }

  useEffect(() => {
    listPokemon();
  }, [])


  const pagination = (sParam) => {
    setIsLoading(true);
    let params = {
      url : sParam === 'next' ? pokemon.next : pokemon.previous
    }
    listPokemon(params);
  }

  //build filter for search pokemon
  const filterPokemon = (sFilter) => {
    setIsLoading(true);
    let params = {
      nameOrId : sFilter
    }
    listPokemon(params);
  }
  
  return (
    <div className="container">
      {
        isLoading ? (
          <div className="d-flex justify-content-center" style={{height: '50rem'}}>
            <img className="align-self-center" src="../pokeball.gif"  width="200" height="200"/>
          </div>
        ) : (
          <> 
            <div className="row d-flex justify-content-center mt-4 mb-4">
              <div className="col-lg-6">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Bucar por nombre o número"
                  onChange={( { target } )=>{
                    filterPokemon(target.value);
                  }}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              {
                pokemon && (
                  pokemon.pokemon.map((oPokemon, nIndex) => {
                    let oColor = colorsStyle.find(color => color.type === oPokemon.type)
                    return (
                      <CardList
                        item={oPokemon}
                        color={oColor}
                        nIndex={nIndex}
                        key={nIndex}
                      />
                    )
                  })
                )
              }
              {
                pokemon && pokemon?.pokemon.length > 1 && (
                  <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Previous" onClick={()=>{pagination('prev')}}>
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next" onClick={()=>{pagination('next')}}>
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )
              }
            </div>
          </>
        )
      }
    </div>
  )
}