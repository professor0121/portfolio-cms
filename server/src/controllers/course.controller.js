export const createCourse = (req, res) => res.send("Course created");
export const getAllCourses = (req, res) => res.send("All courses");
export const getCourseById = (req, res) => res.send(`Course ${req.params.id}`);
export const updateCourseById = (req, res) => res.send(`Course ${req.params.id} updated`);
export const deleteCourseById = (req, res) => res.send(`Course ${req.params.id} deleted`);

export const getCoursesByCategory = (req, res) => res.send(`Courses in category ${req.params.category}`);
export const getCoursesByInstructor = (req, res) => res.send(`Courses by instructor ${req.params.instructorId}`);
export const searchCourses = (req, res) => res.send("Search results for courses");
export const getCoursesByPagination = (req, res) => res.send("Paginated courses");
export const getRecentCourses = (req, res) => res.send("Recent courses");
export const getPopularCourses = (req, res) => res.send("Popular courses");

export const enrollInCourse = (req, res) => res.send(`Enrolled in course ${req.params.id}`);
export const unenrollFromCourse = (req, res) => res.send(`Unenrolled from course ${req.params.id}`);

export const rateCourse = (req, res) => res.send(`Rated course ${req.params.id} with ${req.body.rating}`);
export const reviewCourse = (req, res) => res.send(`Review added for course ${req.params.id}`);

export const uploadCourseMedia = (req, res) => res.send("Course media uploaded");
