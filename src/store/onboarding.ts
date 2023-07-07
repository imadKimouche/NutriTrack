import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export type FitnessGoal = 'gain' | 'lose' | 'maintain' | 'recomposition';
export type ActivityLevel = 'minimal' | 'light' | 'moderate' | 'active' | 'extreme';
export type Gender = 'male' | 'female';
export type FoodAllergy = 'gluten' | 'diary' | 'nut' | 'shellfish' | 'soy' | 'grain' | 'eggs';

type OnBoardingState = {
  fitnessGoal: FitnessGoal;
  activityLevel: ActivityLevel;
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  allergies: FoodAllergy[];
  setFitnessGoal: (goal: FitnessGoal) => void;
  setActivityLevel: (level: ActivityLevel) => void;
  setGender: (gender: Gender) => void;
  setAge: (age: number) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  addAllergy: (allergy: FoodAllergy) => void;
  removeAllergy: (allergy: FoodAllergy) => void;
  toggleAllergy: (allergy: FoodAllergy) => void;
  setAllergies: (allergies: FoodAllergy[]) => void; // TOFIX doesn't update allergies correctly (mutation ?)
  clearAllergies: () => void;
  updateStore: (data: UserFitnessData) => void;
};

export type UserFitnessData = Pick<
  OnBoardingState,
  'fitnessGoal' | 'activityLevel' | 'gender' | 'age' | 'height' | 'weight' | 'allergies'
> & {bmr?: number; tdee?: number};

export const useOnBoardingStore = create<OnBoardingState>()(
  devtools(
    set => ({
      fitnessGoal: 'gain',
      setFitnessGoal: (goal: FitnessGoal) => set(state => ({...state, fitnessGoal: goal})),
      activityLevel: 'minimal',
      setActivityLevel: (level: ActivityLevel) => set(state => ({...state, activityLevel: level})),
      gender: 'male',
      setGender: (gender: Gender) => set(state => ({...state, gender: gender})),
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
      toggleAllergy: (allergy: FoodAllergy) =>
        set(state => {
          if (state.allergies.includes(allergy)) {
            return {
              ...state,
              allergies: state.allergies.filter(item => item !== allergy),
            };
          } else {
            return {
              ...state,
              allergies: [...state.allergies, allergy],
            };
          }
        }),
      setAllergies: (allergies: FoodAllergy[]) => set(state => ({...state, allergies})),
      clearAllergies: () => set(state => ({...state, allergies: []})),
      updateStore: (data: UserFitnessData) => set(state => ({...state, ...data})),
    }),
    {
      name: 'onboarding-store',
    },
  ),
);
