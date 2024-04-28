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
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330949/anise_clnktm.jpg",
      application: "used to make cakes, confectionaries, biscuits, breads, and other baked goods as well as flavor liquors, sauces, sausages, soups, and stews",
      Flavor_Pairings: "caraway, fennel, dill weed, coriander, tarragon, turmeric"
    },
    {
      name: "Annatto",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330949/bayleaves_pva7ev.jpg",
      application: "often used as a natural dye to impart an appealing yellow-orange color to cheeses, oils, rice, and sauces and adds flavor to soups, stews, and chowders",
      Flavor_Pairings: "paprika, chili powder, cloves, allspice"
    },
    {
      name: "Basil",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330949/basil_j7ooga.jpg",
      application: "used to create dry rubs for red meats, poultry, and seafood dishes as well as in sauces, soups, stews, and pasta dishes",
      Flavor_Pairings: "garlic, rosemary, thyme, oregano"
    },
    {
      name: "Bay Leaves",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330949/basil_j7ooga.jpg",
      application: "adds depth of flavor to soups, stews, and braises, ingredient in pickling brines, and is one of three main components in the Bouquet Garni seasoning blend",
      Flavor_Pairings: "sage, marjoram, thyme, oregano"
    },
    {
      name: "Caraway Seed",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330949/carawayseed_nrrprz.jpg",
      application: "used to flavor sauerkraut, coleslaw, soda bread, potato salad, cheeses, and breads",
      Flavor_Pairings: "anise, fennel, coriander"
    },
    {
      name: "Cardamom",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330955/cardamom_fshhgh.jpg",
      application: "used in baked goods, custards, puddings, chai tea, mulled wine, curries, pilaf, and other rice-based dishes as well as for seasoning meat, poultry, and seafood",
      Flavor_Pairings: "cinnamon, clove, allspice, ginger, turmeric, nutmeg"
    },
    {
      name: "Cayenne",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330955/cayenne_unn6ar.jpg",
      application: "adds a kick to sauces, condiments, stews, chilis, marinades, dry rubs, seafood dishes, egg dishes, meats, and vegetables",
      Flavor_Pairings: "bay leaf, chili powder, curry, garlic, onion"
    },
    {
      name: "Celery Seed",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330955/celeryseed_cuwtpk.jpg",
      application: "used for pickling brines or in coleslaw, potato salad, macaroni salad, deli meats, soups, stews, curries, and chutneys",
      Flavor_Pairings: "cilantro, mustard, parsley, rosemary, thyme"
    },
    {
      name: "Chives",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330961/chives_rstl7q.jpg",
      application: "used in egg-, cheese-, and cream-based dishes, soups, stews, chowders, stir-fries, sauces, and dips or as a garnish for both mashed and baked potatoes, salads, and finished meals",
      Flavor_Pairings: "parsley, tarragon, chervil, garlic"
    },
    {
      name: "Cilantro",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330961/cilantro_buagve.jpg",
      application: "used in bean dips or purees, bread, chutneys, rice, salsa, soups, and tagines",
      Flavor_Pairings: "lime, onion, chile pepper, cumin, garlic"
    },
    {
      name: "Cinnamon",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330965/cinnamon_hchqen.jpg",
      application: "add to hot chocolate, cider, mulled wine, tea, cakes, cookies, muffins, and other desserts, curry dishes, roasts, stews, and chili, or use to garnish breakfast foods, puddings, and desserts",
      Flavor_Pairings: "curry, allspice, nutmeg, ginger, coriander, turmeric"
    },
    {
      name: "Cloves",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330965/cloves_rsal1j.jpg",
      application: "used in baked goods, hot beverages, sauces, soups, and stews as well as for studding ham and pork roasts for enhanced flavor and presentation",
      Flavor_Pairings: "cinnamon, allspice, cardamom, ginger, nutmeg, curry"
    },
    {
      name: "Coriander",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330965/coriander_f3iv5q.jpg",
      application: "used to season meats and beans, create meat rubs, taco seasonings, curry dishes, chili, and stews",
      Flavor_Pairings: "curry, cumin, paprika, chili powder"
    },
    {
      name: "Cumin",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330971/cumin_w22mq7.jpg",
      application: "adds depth or a kick to dressings, stews, sauces, marinades, dry rubs, beans, and smoked meats",
      Flavor_Pairings: "bay leaf, chili powder, curry, garlic, onion"
    },
    {
      name: "Dill Weed",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330971/dillweed_rvmdij.jpg",
      application: "used in fish dishes, yogurt- or sour cream-based dips and sauces, mayonnaise-based salads, and deviled eggs",
      Flavor_Pairings: "mustard, horseradish, basil, garlic"
    },
    {
      name: "Fennel Seed",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330971/fennelseed_km5npn.jpg",
      application: "used to flavor liquors and spirits, create fennel tea, season meats such as pork, spicy Italian sausages, meatballs, meatloaf, and salami, and in breads",
      Flavor_Pairings: "mint, cilantro, dill weed, parsley, thyme, anise"
    },
    {
      name: "Flaxseed",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330971/flaxseed_larh9n.jpg",
      application: "used in cereals, breads, and smoothies",
      Flavor_Pairings: "garlic powder, paprika, sesame, fennel, cinnamon"
    },
    {
      name: "Garlic",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330978/garlic_q7lhck.jpg",
      application: "adds zest and depth to dressings, sauces, marinades, meat rubs, condiments, casseroles, and stir-fries",
      Flavor_Pairings: "basil, rosemary, thyme, oregano, chili powder, coriander"
    },
    {
      name: "Ginger",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330978/ginger_dxvhwz.jpg",
      application: "used in baked goods, curries, stir fries, marinades, dressings, and meat rubs",
      Flavor_Pairings: "allspice, coriander, cinnamon, cloves, nutmeg"
    },
    {
      name: "Juniper Berries",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330983/juniper_od6mi1.jpg",
      application: "used to season game meat, flavor liquor, and create marinades, sauces, and brines",
      Flavor_Pairings: "bay leaf, rosemary, marjoram, garlic, caraway, thyme"
    },
    {
      name: "Marjoram",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330984/marjoram_jip5i3.jpg",
      application: "used in salad dressings, marinades, soups, sauces, and sausages, also a main component in the Bouquet Garni and the Fines Herbes seasoning blends",
      Flavor_Pairings: "basil, thyme, rosemary, parsley, fennel seed"
    },
    {
      name: "Mint",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330984/mint_vjncp6.jpg",
      application: "used to make herbal teas, mint sauces, jellies, and chutneys, season meats, salads, roasted vegetables, and stews, and is a key ingredient in yogurt sauces",
      Flavor_Pairings: "basil, thyme, tarragon, dill weed, fennel seed, and coriander"
    },
    {
      name: "Mustard",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330984/mustard_osy9wz.jpg",
      application: "used to create pickling spices and season meats, vegetables, beans, sauces, marinades, condiments, and dressings",
      Flavor_Pairings: "bay leaves, chili powder, dill weed, fennel, coriander"
    },
    {
      name: "Nutmeg",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330984/nutmeg_vatkk0.jpg",
      application: "used in baked goods, custards, puddings, soups, stews, and cheese sauces or as a garnish for beverages, breakfast foods, and desserts",
      Flavor_Pairings: " cinnamon, allspice, cardamom, ginger, coriander, mace, cloves"
    },
    {
      name: "Onion",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330984/onion_vzwk6b.jpg",
      application: "adds depth to dressings, sauces, marinades, meat rubs, condiments, casseroles, and stir-fries",
      Flavor_Pairings: "garlic, crushed red pepper, chili powder, coriander, parsley"
    },
    {
      name: "Oregano",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330985/oregano_vtnsgh.jpg",
      application: "used in tomato-based sauces, marinades, dressings, and egg- or cheese-based dishes, common garnish on sandwiches, pasta, and pizza",
      Flavor_Pairings: "chili powder, basil, marjoram, fennel seed, parsley, thyme"
    },
    {
      name: "Paprika",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330992/paprika_bn52gx.jpg",
      application: "adds depth or a kick to dressings, sauces, marinades, meat rubs, seafood, and vegetables, also commonly used as a garnish for soups",
      Flavor_Pairings: "garlic, rosemary, thyme, parsley, turmeric"
    },
    {
      name: "Parsley",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330992/parsley_j5ev3o.jpg",
      application: "used to make herbed butter, cheese, and aioli, for flavoring and/or garnishing sauces, soups, and salads, and is a main component in the traditional Bouquet Garni blend",
      Flavor_Pairings: "bay leaf, rosemary, marjoram, garlic, dill weed, thyme"
    },
    {
      name: "Pepper",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330992/pepper_pygdrq.jpg",
      application: "used for garnishing, seasoning meats and vegetables, and as an ingredient in sauces, dressings, and marinades",
      Flavor_Pairings: "virtually any spice"
    },
    {
      name: "Poppy Seed",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330992/poppyseed_z1jhle.jpg",
      application: " used in bagels, breads, muffins, buns, pretzels, noodle dishes, seafood dishes, or as a garnish on salads",
      Flavor_Pairings: "sesame seeds, mustard, curry"
    },
    {
      name: "Rosemary",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330996/rosemary_pyojcm.jpg",
      application: "used to season meats, sauces, and soups, baked into crackers and bread, and an essential ingredient in the traditional Bouquet Garni and Herbes de Provence seasoning blends",
      Flavor_Pairings: "oregano, basil, sage, parsley, thyme, mint"
    },
    {
      name: "Sage",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714330997/sage_tfdfwl.jpg",
      application: " used to season poultry, pork, duck, goose, lamb, stuffing, soups, and roasted potatoes, frequently used to preserve and flavor sausages",
      Flavor_Pairings: "celery seed, smoked paprika, thyme, rosemary, marjoram"
    },
    {
      name: "Salt",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714331000/salt_h0x8ym.jpg",
      application: "used for garnishing, seasoning meats and vegetables, and as an ingredient in sauces, dressings, and marinades",
      Flavor_Pairings: "virtually any spice"
    },
    {
      name: "Sesame Seed",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714331000/sesameseed_hx0hnf.jpg",
      application: "used in breads, crackers, and cakes, stir fries and noodle dishes, hummus, sushi, and other seafood dishes",
      Flavor_Pairings: "cardamom, nutmeg, thyme, cloves"
    },
    {
      name: "Star Anise",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714331000/staranise_uvyugi.jpg",
      application: "used to flavor sauces, soups, stocks, teas, liquor, and mulled wine as well as cakes, cookies, pies",
      Flavor_Pairings: "cinnamon, fennel, coriander, tarragon, cloves"
    },
    {
      name: "Tarragon",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714331000/tarragon_fenjuc.jpg",
      application: "used to season poultry, pork, lamb, game, seafood, sauces, vinegar, dressings, oils, and herbed mayonnaise recipes",
      Flavor_Pairings: "chives, rosemary, parsley, thyme, mustard seed, anise"
    },
    {
      name: "Thyme",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714331006/thyme_tdllml.jpg",
      application: "used to season meat, fish, eggs, and vegetable dishes, create compound butter and soups, and as an ingredient in soups, stews, and dressings",
      Flavor_Pairings: "basil, rosemary, marjoram, garlic, onion, parsley"
    },
    {
      name: "Turmeric",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714331006/turmeric_kum1rt.jpg",
      application: "used in curry powders, mustards, and relishes, to season vegetables, lamb, beef, seafood, and make wellness shots and juices",
      Flavor_Pairings: "anise, fennel, pepper, coriander, nutmeg, cloves"
    },
    {
      name: "Vanilla",
      image: "https://res.cloudinary.com/dhgpf6985/image/upload/v1714331007/vanilla_obnhb5.jpg",
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
            <script>console.log({selectedIngredient.image})</script>
            <img src={selectedIngredient.image} alt={selectedIngredient.name} />
            <p>Recommended Pairings: {selectedIngredient.Flavor_Pairings}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingredients;