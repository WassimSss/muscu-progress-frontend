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