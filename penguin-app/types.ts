export interface Penguin {
    id: number;
    nickname: string;
    description: string;
    species_id: number;
    species?: Species;
    island: string
    gender: string;
    weight: number;
    height: number;
    year: number;
    image: string;
    assigned_to: string;
}

export interface TemperatureTolerance {
    min: number;
    max: number;
}

export type EndangermentStatus =
  | 'EX'  // Extinct
  | 'EW'  // Extinct in the Wild
  | 'CR'  // Critically Endangered
  | 'EN'  // Endangered
  | 'VU'  // Vulnerable
  | 'NT'  // Near Threatened
  | 'LC'; // Least Concern

export interface Species {
    id: number;
    name: string;
    habitatType: string;
    temperatureTolerance: TemperatureTolerance;
    diet: string[];
    endangermentStatus: EndangermentStatus;
}

export interface Researcher {
    username: string;
    fullname: string;
    pincode?: string;
    avatar: string;
}

export interface FlashMessage {
    type: "error" | "success"
    message: string;
}