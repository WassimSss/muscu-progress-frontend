export interface WorkoutSessionProps {
  className?: string;
  fetchWorkoutData: () => void;
  workouts: WorkoutData[];
  refreshWorkouts: boolean;
  handleRefreshWorkouts: () => void;
};

export interface WorkoutExerciseSets {
  weight: number;
  reps: number;
  type: string;
  idSet: number;
}

export interface WorkoutExercise {
  name: string;
  sets: WorkoutExerciseSets[];
}

export interface WorkoutData {
  muscleGroup: string;
  exercises: WorkoutExercise[];
}

export interface WorkedDays {
  [key: string]: Date[];
}

export interface MuscleGroupObject {
  name: string;
  _id: string;
};

export interface MuscleGroupsData {
  result: boolean;
  message: string;
  muscleGroups: [MuscleGroupObject];
}

export interface ExerciseObject {
  name: string;
  _id: string;
}

export interface ExercisesObjectData {
  result: boolean;
  message: string;
  exercises: [ExerciseObject];
}

export interface UserWeight {
  weight: number;
  date: string;
  _id: string;
}