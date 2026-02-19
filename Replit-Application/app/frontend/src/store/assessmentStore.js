import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAssessmentStore = create(
  persist(
    (set) => ({
      answers: {},
      currentStep: 0,
      totalSteps: 4,
      
      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: value },
        })),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      resetAssessment: () =>
        set({
          answers: {},
          currentStep: 0,
        }),
      
      getProgress: () => {
        const state = useAssessmentStore.getState();
        const totalQuestions = 20;
        const answeredQuestions = Object.keys(state.answers).length;
        return (answeredQuestions / totalQuestions) * 100;
      },
    }),
    {
      name: 'pathfinder-assessment',
    }
  )
);

export default useAssessmentStore;