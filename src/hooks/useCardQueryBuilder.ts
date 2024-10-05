import { useEffect, useState } from "react";
import { ICardQuery } from "api/cardQuery";
import { ICardQueryBuilder } from "api/ICardQueryBuilder";
import { ISortOption } from "interfaces/ISortOption";
import CardQueryBuilder from "api/CardQueryBuilder";
export const useCardQueryBuilder = (
  sortOption: number | null, 
  rarityFilterOptions: number[] | null,
  owned: boolean,
) => {
  const[cardQueryBuilder] = useState<ICardQueryBuilder>(new CardQueryBuilder())
  const [query, setQuery] = useState<ICardQuery>(); 

  useEffect(() => {
    if(sortOption){
      cardQueryBuilder.setOrder(sortOption);
    }
    cardQueryBuilder.setOwned(owned);
    
      setQuery(cardQueryBuilder.build());
  }, [sortOption, rarityFilterOptions, owned]); 

  return {
    query,
  };
};
