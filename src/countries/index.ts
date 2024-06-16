import { City } from "./models/city";
import { Continent } from "./models/continent";
import { Country } from "./models/country";
import { Government } from "./models/government";
import { OfficialLanguage } from "./models/official-language";
import { Region } from "./models/region";
import { State } from "./models/state";

const germanyGovernment = new Government("Federal Republic", "Chancellor");
const german = new OfficialLanguage("German", 83000000);
const germany = new Country("Germany", "Berlin", 83166711, 357386, germanyGovernment, [german]);

const bavaria = new State("Bavaria", 13076721, "");
bavaria.addCity(new City("Munich", 1472000));
bavaria.addCity(new City("Nuremberg", 518365));

const berlin = new Region("Berlin", 3669491);
berlin.addCity(new City("Berlin", 3669491));

const saarland = new State("Saarland", 990509, "");
saarland.addCity(new City("Saarbrücken", 180515));

germany.addRegion(bavaria);
germany.addRegion(berlin);
germany.addRegion(saarland);

const europe = new Continent("Europe");
europe.addCountry(germany);
