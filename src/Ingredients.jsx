import React, { useState } from 'react';
import Background from '../public/ingredients_table.jpg'
import './ingredients.css'
import '../public/allspice.jpg'
import '../public/anise.jpg'
import '../public/annatto.jpg'
import '../public/basil.jpg'
import '../public/bayleaves.jpg'
import '../public/carawayseed.jpg'
import '../public/cardamom.jpeg'
import '../public/cayenne.jpg'
import '../public/celeryseed.jpg'
import '../public/chives.jpg'
import '../public/cilantro.jpg'
import '../public/cinnamon.jpg'
import '../public/cloves.jpg'
import '../public/coriander.jpg'
import '../public/cumin.jpg'
import '../public/dillweed.jpg'
import '../public/fennelseed.jpg'
import '../public/flaxseed.jpg'
import '../public/garlic.jpg'
import '../public/ginger.jpg'
import '../public/ingredients_table.jpg'
import '../public/juniper.jpg'
import '../public/marjoram.jpg'
import '../public/mint.jpg'
import '../public/mustard.jpg'
import '../public/nutmeg.jpg'
import '../public/onion.jpg'
import '../public/oregano.jpg'
import '../public/paprika.jpg'
import '../public/parsley.jpg'
import '../public/pepper.jpeg'
import '../public/poppyseed.jpeg'
import '../public/rosemary.jpg'
import '../public/sage.jpg'
import '../public/salt.jpg'
import '../public/seasoningspoons.jpeg'
import '../public/sesameseed.jpg'
import '../public/staranise.jpg'
import '../public/tarragon.jpg'
import '../public/thyme.jpg'
import '../public/turmeric.jpg'
import '../public/vanilla.jpg'


const Ingredients = () => {
  // Define state to hold the selected ingredient
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  // Function to handle click event on an ingredient
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedIngredient(null);
  };

  // Define data for ingredients
  const ingredientsData = [
    {
      name: "Allspice",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714329734/allspice_bmjd8o.jpg",
      application: "used to spice up pies, cakes, muffins, and other baked goods, can be used in marinades, pickling and mulling spices, soups, stews, and curry dishes",
      Flavor_Pairings: "cinnamon, nutmeg, coriander, peppercorn, clove, rosemary"
    },
    {
      name: "Anise",
      image: "https://asset.cloudinary.com/dhgpf6985/136888cd5bc260c2bf864bab577f3a95",
      application: "used to make cakes, confectionaries, biscuits, breads, and other baked goods as well as flavor liquors, sauces, sausages, soups, and stews",
      Flavor_Pairings: "caraway, fennel, dill weed, coriander, tarragon, turmeric"
    },
    {
      name: "Annatto",
      image: "https://asset.cloudinary.com/dhgpf6985/28fc6e8dd62b6d9638e0930505225d78",
      application: "often used as a natural dye to impart an appealing yellow-orange color to cheeses, oils, rice, and sauces and adds flavor to soups, stews, and chowders",
      Flavor_Pairings: "paprika, chili powder, cloves, allspice"
    },
    {
      name: "Basil",
      image: "https://asset.cloudinary.com/dhgpf6985/65094926d56fbc9f4452cc5c5c029c0d",
      application: "used to create dry rubs for red meats, poultry, and seafood dishes as well as in sauces, soups, stews, and pasta dishes",
      Flavor_Pairings: "garlic, rosemary, thyme, oregano"
    },
    {
      name: "Bay Leaves",
      image: "https://asset.cloudinary.com/dhgpf6985/89bece117a99adb739b69e499922187b",
      application: "adds depth of flavor to soups, stews, and braises, ingredient in pickling brines, and is one of three main components in the Bouquet Garni seasoning blend",
      Flavor_Pairings: "sage, marjoram, thyme, oregano"
    },
    {
      name: "Caraway Seed",
      image: "https://asset.cloudinary.com/dhgpf6985/ea4a02d2bbc57b9716a01502a9d2926c",
      application: "used to flavor sauerkraut, coleslaw, soda bread, potato salad, cheeses, and breads",
      Flavor_Pairings: "anise, fennel, coriander"
    },
    {
      name: "Cardamom",
      image: "https://asset.cloudinary.com/dhgpf6985/8928692f3bda7e8108057f7b88ac8f0c",
      application: "used in baked goods, custards, puddings, chai tea, mulled wine, curries, pilaf, and other rice-based dishes as well as for seasoning meat, poultry, and seafood",
      Flavor_Pairings: "cinnamon, clove, allspice, ginger, turmeric, nutmeg"
    },
    {
      name: "Cayenne",
      image: "https://asset.cloudinary.com/dhgpf6985/2785748f49c6ec6368131927eed9a0d0",
      application: "adds a kick to sauces, condiments, stews, chilis, marinades, dry rubs, seafood dishes, egg dishes, meats, and vegetables",
      Flavor_Pairings: "bay leaf, chili powder, curry, garlic, onion"
    },
    {
      name: "Celery Seed",
      image: "https://asset.cloudinary.com/dhgpf6985/21e7ab4764826162c844f195db945931",
      application: "used for pickling brines or in coleslaw, potato salad, macaroni salad, deli meats, soups, stews, curries, and chutneys",
      Flavor_Pairings: "cilantro, mustard, parsley, rosemary, thyme"
    },
    {
      name: "Chives",
      image: "https://asset.cloudinary.com/dhgpf6985/d2f1b4a1d6f41d6bdf05168155cd12e4",
      application: "used in egg-, cheese-, and cream-based dishes, soups, stews, chowders, stir-fries, sauces, and dips or as a garnish for both mashed and baked potatoes, salads, and finished meals",
      Flavor_Pairings: "parsley, tarragon, chervil, garlic"
    },
    {
      name: "Cilantro",
      image: "https://asset.cloudinary.com/dhgpf6985/324c559b38df808cc9bb0efbe3a0ca8e",
      application: "used in bean dips or purees, bread, chutneys, rice, salsa, soups, and tagines",
      Flavor_Pairings: "lime, onion, chile pepper, cumin, garlic"
    },
    {
      name: "Cinnamon",
      image: "https://asset.cloudinary.com/dhgpf6985/4b02300404ada7139a66e73abf2ff36c",
      application: "add to hot chocolate, cider, mulled wine, tea, cakes, cookies, muffins, and other desserts, curry dishes, roasts, stews, and chili, or use to garnish breakfast foods, puddings, and desserts",
      Flavor_Pairings: "curry, allspice, nutmeg, ginger, coriander, turmeric"
    },
    {
      name: "Cloves",
      image: "https://asset.cloudinary.com/dhgpf6985/7569f070796ed7c83ce79159bf2519ce",
      application: "used in baked goods, hot beverages, sauces, soups, and stews as well as for studding ham and pork roasts for enhanced flavor and presentation",
      Flavor_Pairings: "cinnamon, allspice, cardamom, ginger, nutmeg, curry"
    },
    {
      name: "Coriander",
      image: "https://asset.cloudinary.com/dhgpf6985/1b1d643b041634310d0d9efb12874695",
      application: "used to season meats and beans, create meat rubs, taco seasonings, curry dishes, chili, and stews",
      Flavor_Pairings: "curry, cumin, paprika, chili powder"
    },
    {
      name: "Cumin",
      image: "https://asset.cloudinary.com/dhgpf6985/f32c09e3a02977a214772b3fba5e8787",
      application: "adds depth or a kick to dressings, stews, sauces, marinades, dry rubs, beans, and smoked meats",
      Flavor_Pairings: "bay leaf, chili powder, curry, garlic, onion"
    },
    {
      name: "Dill Weed",
      image: "https://asset.cloudinary.com/dhgpf6985/108d5bc1bf95f559a2c690d416722fc4",
      application: "used in fish dishes, yogurt- or sour cream-based dips and sauces, mayonnaise-based salads, and deviled eggs",
      Flavor_Pairings: "mustard, horseradish, basil, garlic"
    },
    {
      name: "Fennel Seed",
      image: "https://asset.cloudinary.com/dhgpf6985/11d8b6cb09534863c48942f3380f6cf7",
      application: "used to flavor liquors and spirits, create fennel tea, season meats such as pork, spicy Italian sausages, meatballs, meatloaf, and salami, and in breads",
      Flavor_Pairings: "mint, cilantro, dill weed, parsley, thyme, anise"
    },
    {
      name: "Flaxseed",
      image: "https://asset.cloudinary.com/dhgpf6985/0f163ff5be26f89c926e0a4945972030",
      application: "used in cereals, breads, and smoothies",
      Flavor_Pairings: "garlic powder, paprika, sesame, fennel, cinnamon"
    },
    {
      name: "Garlic",
      image: "https://asset.cloudinary.com/dhgpf6985/1b5d774d1f823bbba06434d1c938c140",
      application: "adds zest and depth to dressings, sauces, marinades, meat rubs, condiments, casseroles, and stir-fries",
      Flavor_Pairings: "basil, rosemary, thyme, oregano, chili powder, coriander"
    },
    {
      name: "Ginger",
      image: "https://asset.cloudinary.com/dhgpf6985/02705dcb61dbc0ca4ea31205b3c72ea7",
      application: "used in baked goods, curries, stir fries, marinades, dressings, and meat rubs",
      Flavor_Pairings: "allspice, coriander, cinnamon, cloves, nutmeg"
    },
    {
      name: "Juniper Berries",
      image: "https://asset.cloudinary.com/dhgpf6985/12f3bb619ad2451de70c485daecc63a7",
      application: "used to season game meat, flavor liquor, and create marinades, sauces, and brines",
      Flavor_Pairings: "bay leaf, rosemary, marjoram, garlic, caraway, thyme"
    },
    {
      name: "Marjoram",
      image: "https://asset.cloudinary.com/dhgpf6985/8a0be55b231a3214bf827a2a78923a1e",
      application: "used in salad dressings, marinades, soups, sauces, and sausages, also a main component in the Bouquet Garni and the Fines Herbes seasoning blends",
      Flavor_Pairings: "basil, thyme, rosemary, parsley, fennel seed"
    },
    {
      name: "Mint",
      image: "https://asset.cloudinary.com/dhgpf6985/7ad4f695f5d44ce667910db1b83f9c12",
      application: "used to make herbal teas, mint sauces, jellies, and chutneys, season meats, salads, roasted vegetables, and stews, and is a key ingredient in yogurt sauces",
      Flavor_Pairings: "basil, thyme, tarragon, dill weed, fennel seed, and coriander"
    },
    {
      name: "Mustard",
      image: "https://asset.cloudinary.com/dhgpf6985/a59d1d901f5cae76f154a3982d69e7b5",
      application: "used to create pickling spices and season meats, vegetables, beans, sauces, marinades, condiments, and dressings",
      Flavor_Pairings: "bay leaves, chili powder, dill weed, fennel, coriander"
    },
    {
      name: "Nutmeg",
      image: "https://asset.cloudinary.com/dhgpf6985/d9e16ad0c72da050aeb73928bee52965",
      application: "used in baked goods, custards, puddings, soups, stews, and cheese sauces or as a garnish for beverages, breakfast foods, and desserts",
      Flavor_Pairings: " cinnamon, allspice, cardamom, ginger, coriander, mace, cloves"
    },
    {
      name: "Onion",
      image: "https://asset.cloudinary.com/dhgpf6985/b9f9fb68576aaceef4851f49fa366e37",
      application: "adds depth to dressings, sauces, marinades, meat rubs, condiments, casseroles, and stir-fries",
      Flavor_Pairings: "garlic, crushed red pepper, chili powder, coriander, parsley"
    },
    {
      name: "Oregano",
      image: "https://asset.cloudinary.com/dhgpf6985/5f1b34c83ea85eaf6a4cd97ce2d6441b",
      application: "used in tomato-based sauces, marinades, dressings, and egg- or cheese-based dishes, common garnish on sandwiches, pasta, and pizza",
      Flavor_Pairings: "chili powder, basil, marjoram, fennel seed, parsley, thyme"
    },
    {
      name: "Paprika",
      image: "https://asset.cloudinary.com/dhgpf6985/239fec5ba2b7b419992ea9908e938489",
      application: "adds depth or a kick to dressings, sauces, marinades, meat rubs, seafood, and vegetables, also commonly used as a garnish for soups",
      Flavor_Pairings: "garlic, rosemary, thyme, parsley, turmeric"
    },
    {
      name: "Parsley",
      image: "https://asset.cloudinary.com/dhgpf6985/7b19e7e4a100eacf302c99b9f63c15ff",
      application: "used to make herbed butter, cheese, and aioli, for flavoring and/or garnishing sauces, soups, and salads, and is a main component in the traditional Bouquet Garni blend",
      Flavor_Pairings: "bay leaf, rosemary, marjoram, garlic, dill weed, thyme"
    },
    {
      name: "Pepper",
      image: "https://asset.cloudinary.com/dhgpf6985/38757db3b55cf8a2744274d1ffb0f205",
      application: "used for garnishing, seasoning meats and vegetables, and as an ingredient in sauces, dressings, and marinades",
      Flavor_Pairings: "virtually any spice"
    },
    {
      name: "Poppy Seed",
      image: "https://asset.cloudinary.com/dhgpf6985/90c1533bdbbd9267d6cc66668f82bb47",
      application: " used in bagels, breads, muffins, buns, pretzels, noodle dishes, seafood dishes, or as a garnish on salads",
      Flavor_Pairings: "sesame seeds, mustard, curry"
    },
    {
      name: "Rosemary",
      image: "https://asset.cloudinary.com/dhgpf6985/4240c0398ca4dc1f3d5f7dd596c27204",
      application: "used to season meats, sauces, and soups, baked into crackers and bread, and an essential ingredient in the traditional Bouquet Garni and Herbes de Provence seasoning blends",
      Flavor_Pairings: "oregano, basil, sage, parsley, thyme, mint"
    },
    {
      name: "Sage",
      image: "https://asset.cloudinary.com/dhgpf6985/5f07174837baed3d355fb7f2e3b197b2",
      application: " used to season poultry, pork, duck, goose, lamb, stuffing, soups, and roasted potatoes, frequently used to preserve and flavor sausages",
      Flavor_Pairings: "celery seed, smoked paprika, thyme, rosemary, marjoram"
    },
    {
      name: "Salt",
      image: "https://asset.cloudinary.com/dhgpf6985/624fdf8e8d7f37ca044a308aa44531de",
      application: "used for garnishing, seasoning meats and vegetables, and as an ingredient in sauces, dressings, and marinades",
      Flavor_Pairings: "virtually any spice"
    },
    {
      name: "Sesame Seed",
      image: "https://asset.cloudinary.com/dhgpf6985/a9f41b69077b9d6536aca8e0306137fe",
      application: "used in breads, crackers, and cakes, stir fries and noodle dishes, hummus, sushi, and other seafood dishes",
      Flavor_Pairings: "cardamom, nutmeg, thyme, cloves"
    },
    {
      name: "Star Anise",
      image: "https://asset.cloudinary.com/dhgpf6985/bf342bf2297425231ae3612d876ce5e8",
      application: "used to flavor sauces, soups, stocks, teas, liquor, and mulled wine as well as cakes, cookies, pies",
      Flavor_Pairings: "cinnamon, fennel, coriander, tarragon, cloves"
    },
    {
      name: "Tarragon",
      image: "https://asset.cloudinary.com/dhgpf6985/cc92e16c809b260f0bf214565d6e2a0c",
      application: "used to season poultry, pork, lamb, game, seafood, sauces, vinegar, dressings, oils, and herbed mayonnaise recipes",
      Flavor_Pairings: "chives, rosemary, parsley, thyme, mustard seed, anise"
    },
    {
      name: "Thyme",
      image: "https://asset.cloudinary.com/dhgpf6985/2b47356522a04823eb6aed4aff5074b0",
      application: "used to season meat, fish, eggs, and vegetable dishes, create compound butter and soups, and as an ingredient in soups, stews, and dressings",
      Flavor_Pairings: "basil, rosemary, marjoram, garlic, onion, parsley"
    },
    {
      name: "Turmeric",
      image: "https://asset.cloudinary.com/dhgpf6985/817c424e1ddc4ec64c1778892b61ae01",
      application: "used in curry powders, mustards, and relishes, to season vegetables, lamb, beef, seafood, and make wellness shots and juices",
      Flavor_Pairings: "anise, fennel, pepper, coriander, nutmeg, cloves"
    },
    {
      name: "Vanilla",
      image: "https://asset.cloudinary.com/dhgpf6985/f8ba3c6f23935048cf01d6497a55ad2d",
      application: "used for its own distinctive flavor it is also a flavor enhancer, which can be added to other flavors such as fruit flavors, salad dressing or meat sauces.",
      Flavor_Pairings: "allspice, cinnamon, ginger, mint, nutmeg"
    },
  ];
  

  return (
<div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundColor: 'black', backgroundPosition: 'center', width: '100vw', color: 'white' }}>
  <div style={{ marginTop: '-300px', textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 0 0 5px rgba(0, 0, 0, 0.8)' }}>
    <h1 style={{ fontFamily: 'Dancing Script, cursive' }}>Welcome to Seasonality!</h1>
    <h2 style={{ fontFamily: 'Dancing Script, cursive', marginLeft: '20px' }}>Where your personality meets food.</h2>
  </div>




      {/* Render list of ingredients */}
      <div className="ingredient-container" style={{ marginTop:'150px' }}>
        {[...Array(Math.ceil(ingredientsData.length / 5)).keys()].map(row => (
          <ul key={row} className="ingredient-row">
            {ingredientsData.slice(row * 5, row * 5 + 5).map((ingredient, index) => (
              <li key={index} onClick={() => handleIngredientClick(ingredient)}>
                {ingredient.name}
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Render selected ingredient's information in modal */}
      {selectedIngredient && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>Close</button>
            <h3>{selectedIngredient.name}</h3>
            <p>Uses: {selectedIngredient.application}</p>
            <img src={selectedIngredient.image} alt={selectedIngredient.name} />
            <p>Recommended Pairings: {selectedIngredient.Flavor_Pairings}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingredients;