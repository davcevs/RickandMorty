import { Gender, Species, Status } from "../enums/CharacterEnums";

export interface Character {
  id: string;
  name: string;
  status: Status;
  species: Species;
  gender: Gender;
  origin: {
    name: string;
  };
  image: string;
}

export interface CharactersResponse {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
    };
    results: Character[];
  };
}
