export interface Recipe {
  title: string
  category: string
  url_img: string
  description: string
  ingredients: Ingredient[]
}

export interface Ingredient {
  ing_name: string
}
