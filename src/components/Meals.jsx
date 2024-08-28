import React, { useContext, useEffect, useState } from "react";
import { fetchAvailableMeals } from "../http";
import { MealItem } from "./MealItem";
import { useHttp } from "./Hooks/useHttp";
import { Error } from "./UI/Error";




const requestConfig ={
  // method: "GET",
  // headers: { 'Content-Type': 'application/json' }
}


export const Meals = () => {
  
  const {data:loadMeals,isLoading,error} = useHttp('http://localhost:3000/meals', requestConfig,[] )
  console.log(loadMeals)

 if (isLoading) {
  return <p className="center">Fetching meals ...</p>
 }
  if(error){
    return <Error title="Failed to fetch meals" message={error}/>
  }
 
 
  return (
    <ul id="meals">
      {loadMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
};
