import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export type FitnessGoal = 'gain' | 'lose' | 'maintain' | 'recomposition';
export type ActivityLevel = 'minimal' | 'moderate' | 'active' | 'extreme';
export type Sexe = 'male' | 'female';
export type FoodAllergy = 'gluten' | 'diary' | 'nut' | 'shellfish' | 'soy' | 'grain' | 'eggs';

type OnBoardingState = {
  fitnessGoal: FitnessGoal;
  activityLevel: ActivityLevel;
  sexe: Sexe;
  age: number;
  height: number;
  weight: number;
  allergies: FoodAllergy[];
  setFitnessGoal: (goal: FitnessGoal) => void;
  setActivityLevel: (level: ActivityLevel) => void;
  setSexe: (sexe: Sexe) => void;
  setAge: (age: number) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  addAllergy: (allergy: FoodAllergy) => void;
  removeAllergy: (allergy: FoodAllergy) => void;
  clearAllergies: () => void;
};

export const useOnBoardingStore = create<OnBoardingState>()(
  devtools(
    set => ({
      fitnessGoal: 'gain',
      setFitnessGoal: (goal: FitnessGoal) => set(state => ({...state, fitnessGoal: goal})),
      activityLevel: 'minimal',
      setActivityLevel: (level: ActivityLevel) => set(state => ({...state, activityLevel: level})),
      sexe: 'male',
      setSexe: (sexe: Sexe) => set(state => ({...state, sexe})),
      age: 13,
      setAge: (age: number) => set(state => ({...state, age})),
      height: 150,
      setHeight: (height: number) => set(state => ({...state, height})),
      weight: 50,
      setWeight: (weight: number) => set(state => ({...state, weight})),
      allergies: [],
      addAllergy: (allergy: FoodAllergy) =>
        set(state => {
          if (state.allergies.includes(allergy)) {
            return state;
          } else {
            return {...state, allergies: [...state.allergies, allergy]};
          }
        }),
      removeAllergy: (allergy: FoodAllergy) =>
        set(state => ({...state, allergies: state.allergies.filter(item => item !== allergy)})),
      clearAllergies: () => set(state => ({...state, allergies: []})),
    }),
    {
      name: 'onboarding-store',
    },
  ),
);
