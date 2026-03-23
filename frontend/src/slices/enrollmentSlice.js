import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrolledCourses: localStorage.getItem('enrolledCourses')
    ? JSON.parse(localStorage.getItem('enrolledCourses'))
    : [],
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      const course = action.payload;
      const existingEnrollment = state.enrolledCourses.find(
        (x) => x.id === course.id
      );

      if (!existingEnrollment) {
        state.enrolledCourses.push({
          ...course,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          completedLessons: [],
        });
        localStorage.setItem(
          'enrolledCourses',
          JSON.stringify(state.enrolledCourses)
        );
      }
    },

    unenrollCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (x) => x.id !== action.payload
      );
      localStorage.setItem(
        'enrolledCourses',
        JSON.stringify(state.enrolledCourses)
      );
    },

    updateProgress: (state, action) => {
      const { courseId, progress, lessonId } = action.payload;
      const course = state.enrolledCourses.find((x) => x.id === courseId);

      if (course) {
        course.progress = progress;
        if (lessonId && !course.completedLessons.includes(lessonId)) {
          course.completedLessons.push(lessonId);
        }
        localStorage.setItem(
          'enrolledCourses',
          JSON.stringify(state.enrolledCourses)
        );
      }
    },

    clearEnrollment: (state) => {
      state.enrolledCourses = [];
      localStorage.removeItem('enrolledCourses');
    },
  },
});

export const { enrollCourse, unenrollCourse, updateProgress, clearEnrollment } =
  enrollmentSlice.actions;
export default enrollmentSlice.reducer;
