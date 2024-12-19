import React, { createContext, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([
    {
      name: "Moyinoluwa King",
      email: "moyinadeleke@yahoo.com",
      department: "Commercial",
      classLevel: "SS3",
      fieldOfStudy: "Computer Science",
      status: "approved",
    },
  ]);

  const addStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  return (
    <StudentContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
