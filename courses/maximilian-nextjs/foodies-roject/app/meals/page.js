import React from 'react';
import Link from "next/link";

const MealsPage = () => {
  return (
    <main>
      <h1>Meals Page</h1>
      <p><Link href="/meals/share">Share</Link></p>
      <p><Link href="/meals/meal-1">Meal 1</Link></p>
      <p><Link href="/meals/meal-2">Meal 2</Link></p>
    </main>
  )
}

export default MealsPage;